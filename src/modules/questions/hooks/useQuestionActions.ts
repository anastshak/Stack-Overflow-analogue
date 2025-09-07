import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';

import { queryClient } from '@app/providers/queryClient';

import { deleteQuestion, editQuestion } from '../api';
import { QuestionFormData } from '../helpers/validationQuestionSchema';

export const useQuestionActions = (questionId: string, onClose: () => void) => {
  const navigate = useNavigate();

  const editMutation = useMutation({
    mutationFn: (values: QuestionFormData) => editQuestion(questionId, values),
    onSuccess: () => {
      message.success('Question updated successfully');
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      queryClient.invalidateQueries({ queryKey: ['question', questionId] });
      onClose();
    },
    onError: () => {
      message.error('Failed to update question');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteQuestion(questionId),
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

  return {
    editMutation,
    deleteMutation,
  };
};
