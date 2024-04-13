export interface LoginRequest {
  username: string;
  password: string;
  token: string;
  request_token: string;
}
export interface LoginResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface GetSessionRequest {
  token: string;
  request_token: string;
}
export interface GetSessionResponse {
  success: boolean;
  session_id: string;
}

export interface AddToWatchListRequest {
  token: string;
  account_id: string;
  session_id: string;
  media_type: string;
  media_id: number;
  watchlist: boolean;
  movie_data: any;
}
export interface AddToWatchListResponse {
  token: string;
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface GetWatchListRequest {
  token: string;
  account_id: string;
  session_id: string | null | undefined;
}
