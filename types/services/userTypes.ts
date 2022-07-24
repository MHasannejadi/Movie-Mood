export interface LoginRequest {
  key: string;
  username: string;
  password: string;
  request_token: string;
}
export interface LoginResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface GetSessionRequest {
  key: string;
  request_token: string;
}
export interface GetSessionResponse {
  success: boolean;
  session_id: string;
}

export interface AddToWatchListRequest {
  account_id: string;
  session_id: string;
  key: string;
  media_type: string;
  media_id: number;
  watchlist: boolean;
  movie_data: any;
}
export interface AddToWatchListResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface GetWatchListRequest {
  account_id: string;
  session_id: string | null | undefined;
  key: string;
}
