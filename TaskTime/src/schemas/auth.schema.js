import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string(
        {
            required_error: 'Username is required'
        }
    ),
    email: z.string(
        {
            required_error: 'Email is required'
        }
    ).email(
        {
            required_error: 'Invalid email'
        }
    ),
    password: z.string(
        {
            required_error: 'Password is required'
        }
    ).min(8, "The password must be at least 8 characters") 
    .regex(new RegExp(".*[A-Z].*"), "The password must have one uppercase character")
    .regex(new RegExp(".*[a-z].*"), "The password must have one lowercase character")
    .regex(new RegExp(".*\\d.*"), "The password must have one number")
    .regex(
      new RegExp(".*[!@#$?%'&+,].*"),
      "The password must have one special character (!@#$?%'&+,)"
    )
});

export const loginSchema = z.object({
    email: z.string(
        {
            required_error: 'Email is required'
        }
    ).email(
        {
            required_error: 'Invalid email'
        }
    ),
    password: z.string(
        {
            required_error: 'Password is required'
        }
    ) .min(8, "The password must be at least 8 characters") 
    .regex(new RegExp(".*[A-Z].*"), "The password must have one uppercase character")
    .regex(new RegExp(".*[a-z].*"), "The password must have one lowercase character")
    .regex(new RegExp(".*\\d.*"), "The password must have one number")
    .regex(
      new RegExp(".*[!@#$?%'&+,].*"),
      "The password must have one special character (!@#$?%'&+,)"
    )
});