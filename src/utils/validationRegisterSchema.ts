import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(5, 'Username must be at least 5 characters')
      .max(25, 'Username cannot exceed 25 characters')
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Username can only contain letters, numbers, and underscores',
      })
      .transform((username) => username.trim().toLowerCase()),
    password: z
      .string()
      .min(5, 'Username must be at least 5 characters')
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[0-9]/, {
        message: 'Password must contain at least one number',
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one symbol',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'passwords must match',
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
