import { Modal } from 'antd';

import { useQuestionActions } from '../hooks/useQuestionActions';
import { Question } from '../types';
import { QuestionForm } from './QuestionForm';

interface EditQuestionModalProps {
  open: boolean;
  onClose: () => void;
  question: Question;
}

export const EditQuestionModal = ({ open, onClose, question }: EditQuestionModalProps) => {
  const { editMutation, deleteMutation } = useQuestionActions(question.id, onClose);

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
