import { z } from "zod";

export const validators = {
  idParamSchema: (id) => {
    const schema = z.object({
      id: z.string()
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
