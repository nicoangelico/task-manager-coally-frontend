export interface ApiError {
  data: {
    error: string;
    message: string;
  };
  status: number;
}