"use server";
import {
  AuthProvider,
  AuthResponse,
  GetLoginProps,
  LoginData,
  SignupData,
} from "@/lib/types/auth";
import { v4 as uuidv4 } from "uuid";
import { registerFormSchema } from "@/app/lib/auth/definitions";
import { createSession, deleteSession } from "@/app/lib/auth/session";

export async function signup(data: SignupData): Promise<AuthResponse | null> {
  const validatedFields = registerFormSchema.safeParse({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    confirmPassword: data.password,
    subscription: data.subscription,
  });
  if (!validatedFields.success) return null;
  const response = await fetch(
    `${process.env.API_BASE_URL}/api/auth/register`,
    {
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
    },
  );
  if (response.ok) {
    const data = await response.json();
    if (data.ok)
      await createSession({
        token: data.token,
        refreshToken: data.refreshToken,
        id: data.id,
      });
    return data;
  }
  return null;
}

export async function login(data: LoginData): Promise<AuthResponse | null> {
  const response = await fetch(`${process.env.API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.ok)
      await createSession({
        token: data.token,
        refreshToken: data.refreshToken,
        id: data.id,
      });
    return data;
  }
  return null;
}

export async function loginWithProvider(
  id: string,
  provider: AuthProvider,
): Promise<AuthResponse | null> {
  const response = await fetch(
    `${process.env.API_BASE_URL}/api/auth/${provider}/login`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${id}`,
      },
    },
  );

  if (response.ok) {
    const data = await response.json();
    if (data.ok)
      await createSession({
        token: data.token,
        refreshToken: data.refreshToken,
        id: data.id,
      });
    return data;
  }

  return null;
}

export async function getGoogleLoginProps(): Promise<GetLoginProps> {
  const state = uuidv4();
  const googleAuthEndpoint = process.env.AUTH_GOOGLE_URL;
  const loginRequestsParams: { [key: string]: string } = {
    client_id: process.env.GOOGLE_CLIENT_ID!!,
    redirect_uri: `${process.env.API_BASE_URL}/api/auth/callback/google`,
    response_type: "code",
    scope: "email profile",
    include_granted_scopes: "true",
    state,
  };
  const paramsString = Object.keys(loginRequestsParams)
    .map((key) => `${key}=${encodeURIComponent(loginRequestsParams[key])}`)
    .join("&");
  return { url: `${googleAuthEndpoint}?${paramsString}`, state };
}

export async function getGithubLoginProps(): Promise<GetLoginProps> {
  const state = uuidv4();
  const githubAuthEndpoint = process.env.AUTH_GITHUB_URL;
  const loginRequestsParams: { [key: string]: string } = {
    client_id: process.env.GITHUB_CLIENT_ID!!,
    redirect_uri: `${process.env.API_BASE_URL}/api/auth/callback/github`,
    scope: "user",
    state,
  };
  const paramsString = Object.keys(loginRequestsParams)
    .map((key) => `${key}=${encodeURIComponent(loginRequestsParams[key])}`)
    .join("&");
  return { url: `${githubAuthEndpoint}?${paramsString}`, state };
}

export async function deleteAuthSession(): Promise<void> {
  await deleteSession();
}
