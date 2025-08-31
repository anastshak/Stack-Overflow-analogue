import { z } from 'zod';

export const snippetSchema = z.object({
  language: z.string().min(1, 'Please select a programming language'),
  code: z.string().min(5, 'Code must be at least 5 characters'),
});

export type SnippetFormData = z.infer<typeof snippetSchema>;
