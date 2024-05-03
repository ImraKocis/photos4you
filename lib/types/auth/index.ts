export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  subscription: Subscription;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  email: string;
  token: string;
  refreshToken: string;
  id: number;
  ok: boolean;
}

type Subscription = "FREE" | "PRO" | "GOLD";
