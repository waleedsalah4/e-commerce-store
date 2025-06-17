import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  // terms: z.boolean().default(false).refine(value => value, 'You must agree to the terms and conditions'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  email: z.string().email("Invalid email address"),
  address: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export { loginSchema, registerSchema };
export type { LoginFormData, RegisterFormData };
