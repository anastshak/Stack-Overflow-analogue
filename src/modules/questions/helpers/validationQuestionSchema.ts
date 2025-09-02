import { z } from 'zod';

export const questionSchema = z.object({
  title: z.string().min(3, 'Title is too short'),
  description: z.string().min(5, 'Description is too short'),
  attachedCode: z.string().min(1, 'Code is required'),
});

export type QuestionFormData = z.infer<typeof questionSchema>;
