import { Router } from 'express';
import { exampleController } from '../controllers/example.controller';
import {
  validate,
  createExampleSchema,
  updateExampleSchema,
  idParamSchema,
} from '../validators/example.validator';

const router = Router();

// GET  /api/examples
router.get('/', exampleController.getAll.bind(exampleController));

// GET  /api/examples/:id
router.get(
  '/:id',
  validate(idParamSchema, 'params'),
  exampleController.getById.bind(exampleController)
);

// POST /api/examples
router.post(
  '/',
  validate(createExampleSchema),
  exampleController.create.bind(exampleController)
);

// PATCH /api/examples/:id
router.patch(
  '/:id',
  validate(idParamSchema, 'params'),
  validate(updateExampleSchema),
  exampleController.update.bind(exampleController)
);

// DELETE /api/examples/:id
router.delete(
  '/:id',
  validate(idParamSchema, 'params'),
  exampleController.remove.bind(exampleController)
);

export default router;
