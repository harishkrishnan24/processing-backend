export interface ProcessingRequest {
  data: any;
  options?: {
    format?: string;
    async?: boolean;
    priority?: 'low' | 'normal' | 'high';
  };
}

export interface ProcessingResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  input: any;
  output?: any;
  error?: string;
  createdAt: string;
  completedAt?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    message: string;
    stack?: string;
  };
}
