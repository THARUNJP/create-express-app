// Generic API response envelope
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

// Health check payload shapes
export interface HealthBasic {
  status: 'ok' | 'degraded' | 'down';
  environment: string;
  timestamp: string;
  uptimeSeconds: number;
}

export interface HealthDetailed extends HealthBasic {
  memory: {
    heapUsed: string;
    heapTotal: string;
    rss: string;
  };
  checks: Record<string, string>;
}

// Parsed query for the health endpoint
export interface HealthQuery {
  verbose?: boolean;
}
