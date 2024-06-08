import { z } from "zod";

export const userAdminDataUpdateSchema = z.object({
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
