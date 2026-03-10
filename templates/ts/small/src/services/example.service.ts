import { randomUUID } from 'crypto';
import { ExampleItem } from '../types/index.d';
import { CreateExampleDto, UpdateExampleDto } from '../validators/example.validator';
import { AppError } from '../middleware/errorHandler';
import { HTTP_STATUS, MESSAGES } from '../lib/constants';

// In-memory store — swap out for your DB layer (Prisma, Drizzle, etc.)
const store = new Map<string, ExampleItem>();

export class ExampleService {
  async findAll(): Promise<ExampleItem[]> {
    return Array.from(store.values());
  }

  async findById(id: string): Promise<ExampleItem> {
    const item = store.get(id);
    if (!item) throw new AppError(MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    return item;
  }

  async create(dto: CreateExampleDto): Promise<ExampleItem> {
    const item: ExampleItem = {
      id: randomUUID(),
      name: dto.name,
      description: dto.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.set(item.id, item);
    return item;
  }

  async update(id: string, dto: UpdateExampleDto): Promise<ExampleItem> {
    const existing = await this.findById(id);
    const updated: ExampleItem = { ...existing, ...dto, updatedAt: new Date() };
    store.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id); // throws 404 if not found
    store.delete(id);
  }
}

export const exampleService = new ExampleService();
