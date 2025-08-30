import { z } from 'zod';

export const changeUsernameSchema = z.object({
  username: z
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(25, 'Username cannot exceed 25 characters')
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    })
    .transform((username) => username.trim().toLowerCase()),
});

export type ChangeUsernameFormData = z.infer<typeof changeUsernameSchema>;
