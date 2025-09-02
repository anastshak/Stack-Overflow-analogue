import { message, Modal } from 'antd';
import { QuestionForm } from './QuestionForm';
import { useMutation } from '@tanstack/react-query';
import { QuestionFormData } from '../helpers/validationQuestionSchema';
import { deleteQuestion, editQuestion } from '../api';
import { queryClient } from '@app/providers/queryClient';
import { Question } from '../types';
import { useNavigate } from 'react-router-dom';

interface EditQuestionModalProps {
  open: boolean;
  onClose: () => void;
  question: Question;
}

export const EditQuestionModal = ({ open, onClose, question }: EditQuestionModalProps) => {
  const navigate = useNavigate();

  const editMutation = useMutation({
    mutationFn: (values: QuestionFormData) => editQuestion(question.id, values),
    onSuccess: () => {
      message.success('Question updated successfully');
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      queryClient.invalidateQueries({ queryKey: ['question', question.id] });
      onClose();
    },
    onError: () => {
      message.error('Failed to update question');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteQuestion(question.id),
    onSuccess: () => {
      message.success('Question deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      onClose();
      navigate('/questions');
    },
    onError: () => {
      message.error('Failed to delete question');
    },
  });

  return (
    <Modal
      title="Edit question"
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
      <QuestionForm
        mode="edit"
        initialValues={{
          title: question.title,
          description: question.description,
          attachedCode: question.attachedCode,
        }}
        onSubmit={editMutation.mutate}
        loading={editMutation.isPending}
        deleteLoading={deleteMutation.isPending}
        handleDeleteQuestion={deleteMutation.mutate}
      />
    </Modal>
  );
};
