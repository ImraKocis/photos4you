"use server";
import { AuthResponse, LoginData, SignupData } from "@/lib/types/auth";

export async function signup(data: SignupData): Promise<AuthResponse | null> {
  const response = await fetch(`${process.env.API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      subscription: data.subscription,
    }),
  });
  if (response.ok) return await response.json();
  return null;
}

export async function login(data: LoginData): Promise<AuthResponse | null> {
  const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });
  if (response.ok) return await response.json();
  return null;
}
