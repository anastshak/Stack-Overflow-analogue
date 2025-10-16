import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { message, Modal } from 'antd';

import { queryClient } from '@app/providers/queryClient';

import { deleteSnippet, editSnippet } from '../api/snippets';
import { SnippetFormData } from '../helpers/validationSnippetSchema';
import { SnippetModel } from '../types';
import { PostSnippetForm } from './PostSnippetForm';

interface EditSnippetModalProps {
  open: boolean;
  onClose: () => void;
  snippet: SnippetModel;
}

export const EditSnippetModal = ({ open, onClose, snippet }: EditSnippetModalProps) => {
  const navigate = useNavigate();

  const editMutation = useMutation({
    mutationFn: (values: SnippetFormData) => editSnippet(snippet.id, values),
    onSuccess: () => {
      message.success('Snippet updated successfully');
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
      queryClient.invalidateQueries({ queryKey: ['snippet', snippet.id] });
      onClose();
    },
    onError: () => {
      message.error('Failed to update snippet');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteSnippet(snippet.id),
    onSuccess: () => {
      message.success('Snippet deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
      onClose();
      navigate('/');
    },
    onError: () => {
      message.error('Failed to delete snippet');
    },
  });

  return (
    <Modal
      title="Edit snippet"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      width={{
        xs: '90%',
        sm: '80%',
        md: '70%',
        lg: '60%',
        xl: '45%',
        xxl: '30%',
      }}
    >
      <PostSnippetForm
        mode="edit"
        initialValues={{
          language: snippet.language,
          code: snippet.code,
        }}
        onSubmit={editMutation.mutate}
        loading={editMutation.isPending}
        deleteLoading={deleteMutation.isPending}
        handleDeleteQuestion={deleteMutation.mutate}
      />
    </Modal>
  );
};
