export interface AuthResponse {
  token: string;
  username: string;
  role: 'admin' | 'guest';
  _id: string;
}
