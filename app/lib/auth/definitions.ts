import { z } from "zod";

const SubscriptionRoles = ["FREE", "PRO", "GOLD"] as const;

export const registerFormSchema = z
  .object({
    firstName: z
      .string()
      .regex(
        new RegExp("^[a-zA-Z0-9]+$"),
        "Please use only letters and numbers",
      )
      .min(2)
      .max(50),
    lastName: z
      .string()
      .regex(
        new RegExp("^[a-zA-Z0-9]+$"),
        "Please use only letters and numbers",
      )
      .min(2)
      .max(50),
    email: z.string().email("Please input valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(24, "Password can be 24 characters long")
      .regex(
        new RegExp(`^(?=.*[A-Za-z])(?=.*\\d).*$`),
        "Please use at least one number and one letter",
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(24, "Password can be 24 characters long")
      .regex(
        new RegExp(`^(?=.*[A-Za-z])(?=.*\\d).*$`),
        "Please use at least one number letter",
      ),
    subscription: z.enum(SubscriptionRoles),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Password must match",
      path: ["confirmPassword"],
    },
  );

export const loginFormSchema = z.object({
  email: z.string().email("Please input valid email address"),
  password: z.string(),
});

export const userDataSchema = z.object({
  firstName: z
    .string()
    .regex(new RegExp("^[a-zA-Z0-9]+$"), "Please use only letters and numbers")
    .min(2)
    .max(50),
  lastName: z
    .string()
    .regex(new RegExp("^[a-zA-Z0-9]+$"), "Please use only letters and numbers")
    .min(2)
    .max(50),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(24, "Password can be 24 characters long")
      .regex(
        new RegExp(`^(?=.*[A-Za-z])(?=.*\\d).*$`),
        "Please use at least one number and one letter",
      ),
    confirmNewPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(24, "Password can be 24 characters long")
      .regex(
        new RegExp(`^(?=.*[A-Za-z])(?=.*\\d).*$`),
        "Please use at least one number letter",
      ),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmNewPassword;
    },
    {
      message: "Password must match",
      path: ["confirmPassword"],
    },
  );
