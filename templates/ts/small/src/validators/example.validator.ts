import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS, MESSAGES } from '../lib/constants';

// --- Schemas ---

export const createExampleSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  description: z.string().max(500, 'Description too long').optional(),
});

export const updateExampleSchema = createExampleSchema.partial();

export const idParamSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
});

// --- Types derived from schemas ---

export type CreateExampleDto = z.infer<typeof createExampleSchema>;
export type UpdateExampleDto = z.infer<typeof updateExampleSchema>;

// --- Middleware factory ---

export const validate =
  (schema: z.ZodSchema, source: 'body' | 'params' | 'query' = 'body') =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: MESSAGES.VALIDATION_ERROR,
        errors: result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
      });
      return;
    }
    // Attach parsed & typed data back to request
    (req as Request & { parsed: unknown }).parsed = result.data;
    next();
  };
