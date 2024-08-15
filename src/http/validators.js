import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const validators = {
  idParamSchema: (id) => {
    const schema = z.object({
      id: z.string().refine((value) => objectIdRegex.test(value))
    });

    return schema.parse(id);
  },
  createUserSchema: (user) => {
    const schema = z.object({
      username: z.string(),
      email: z.string().email()
    });

    return schema.parse(user);
  },
  updateUserSchema: (user) => {
    const schema = z.object({
      username: z.string().optional(),
      email: z.string().email().optional()
    });

    return schema.parse(user);
  }
};
