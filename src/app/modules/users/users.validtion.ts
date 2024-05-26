import { z } from 'zod';

// method 1
export const usersValidationSchema = z.object({
  // id will generate autometically from admin
  password: z
    .string({invalid_type_error: "Name must be a string"})
    .max(20, { message: 'Password cant be more than 20 characters!' })
    .optional(),
    status: z.enum(['in-progress', 'block']).default('in-progress'),
  isDeleted: z.boolean().optional().default(false),
});





// method-2

// export const usersValidationSchema = z.object({
//     // id will generate autometically from admin
//     id: z.string(),
//     password: z.string().max(20, {message: "Password cant be more than 20 characters!"}),
//   needsPasswordChange: z.boolean().optional().default(true),
//   role: z.enum(['student', 'faculty','admin']),
//   status: z.enum(['in-progress', 'block']).default('in-progress'),
//   isDeleted: z.boolean().optional().default(false)
// });
