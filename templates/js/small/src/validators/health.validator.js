import { z } from 'zod';
import { HTTP_STATUS, MESSAGES } from '../lib/constants.js';

// Schema for the optional ?verbose=true query param
export const healthQuerySchema = z.object({
  verbose: z
    .enum(['true', 'false'])
    .optional()
    .transform((v) => v === 'true'),
});

/**
 * Middleware factory — validates req.body | req.params | req.query against a Zod schema.
 * Attaches the parsed result to req.parsed.
 *
 * @param {z.ZodSchema} schema
 * @param {'body'|'params'|'query'} [source='body']
 * @returns {import('express').RequestHandler}
 */
export const validate =
  (schema, source = 'body') =>
  (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: MESSAGES.VALIDATION_ERROR,
        errors: result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
      });
    }
    req.parsed = result.data;
    next();
  };
