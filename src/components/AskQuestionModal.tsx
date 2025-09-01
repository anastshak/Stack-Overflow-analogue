import { message, Modal } from 'antd';
import { QuestionForm } from './QuestionForm';
import { useMutation } from '@tanstack/react-query';
import { QuestionFormData } from '../utils/validationQuestionSchema';
import { createQuestion } from '../api/questions';
import { queryClient } from '../utils/queryClient';

interface AskQuestionModalProps {
  open: boolean;
  onClose: () => void;
}

export const AskQuestionModal = ({ open, onClose }: AskQuestionModalProps) => {
  const mutation = useMutation({
    mutationFn: (values: QuestionFormData) => createQuestion(values),
    onSuccess: () => {
      message.success('Question posted successfully');
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      onClose();
    },
    onError: () => {
      message.error('Failed to post question');
    },
  });

  return (
    <Modal
      title="Ask a question"
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
      <QuestionForm mode="create" onSubmit={mutation.mutate} loading={mutation.isPending} />
    </Modal>
  );
};
