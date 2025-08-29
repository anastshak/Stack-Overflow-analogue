import { Modal } from 'antd';
import { QuestionForm } from './QuestionForm';

interface AskQuestionModalProps {
  open: boolean;
  onClose: () => void;
}

export const AskQuestionModal = ({ open, onClose }: AskQuestionModalProps) => {
  return (
    <Modal title="Ask a question" open={open} onCancel={onClose} footer={null} destroyOnHidden width={700}>
      <QuestionForm onSuccess={onClose} />
    </Modal>
  );
};
