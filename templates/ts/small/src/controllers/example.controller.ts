import { Request, Response, NextFunction } from 'express';
import { exampleService } from '../services/example.service';
import { CreateExampleDto, UpdateExampleDto } from '../validators/example.validator';
import { HTTP_STATUS, MESSAGES } from '../lib/constants';

type ParsedRequest<T> = Request & { parsed: T };

export class ExampleController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const items = await exampleService.findAll();
      res.status(HTTP_STATUS.OK).json({ success: true, data: items });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const item = await exampleService.findById(req.params.id);
      res.status(HTTP_STATUS.OK).json({ success: true, data: item });
    } catch (err) {
      next(err);
    }
  }

  async create(req: ParsedRequest<CreateExampleDto>, res: Response, next: NextFunction): Promise<void> {
    try {
      const item = await exampleService.create(req.parsed);
      res.status(HTTP_STATUS.CREATED).json({ success: true, data: item, message: MESSAGES.CREATED });
    } catch (err) {
      next(err);
    }
  }

  async update(req: ParsedRequest<UpdateExampleDto>, res: Response, next: NextFunction): Promise<void> {
    try {
      const item = await exampleService.update(req.params.id, req.parsed);
      res.status(HTTP_STATUS.OK).json({ success: true, data: item, message: MESSAGES.UPDATED });
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await exampleService.delete(req.params.id);
      res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}

export const exampleController = new ExampleController();
