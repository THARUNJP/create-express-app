import z from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z
    .string()
    .default("8000")
    .transform((val) => Number(val)),
});

const env = envSchema.parse(process.env);

export const appEnv = {
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
};
