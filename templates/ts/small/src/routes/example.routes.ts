import { Router } from 'express';
import { exampleController } from '../controllers/example.controller';


const router = Router();

// GET  /api/examples
// router.get('/', exampleController.getAll.bind(exampleController));

export default router;
