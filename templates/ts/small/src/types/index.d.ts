import { Request } from 'express';

// Extend Express Request to include authenticated user
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Generic API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

// Pagination params
export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

// Example entity type — replace with your domain models
export interface ExampleItem {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
