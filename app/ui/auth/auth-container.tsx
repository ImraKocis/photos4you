"use client";
import { ReactElement, useState } from "react";
import { SignupForm } from "@/app/ui/auth/signup-form";
import { LoginForm } from "@/app/ui/auth/login-form";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import "./auth-container.css";
import { X } from "lucide-react";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import {
  getGithubLoginProps,
  getGoogleLoginProps,
  loginWithProvider,
} from "@/app/actions/auth/actions";
import { validate } from "uuid";
import { AuthProvider, AuthResponse } from "@/lib/types/auth";
import { toast } from "@/components/ui/use-toast";
import { AppStore } from "@/lib/redux/store";
import { set as setAuth } from "@/lib/redux/features/authSlice";
import { set as setUser } from "@/lib/redux/features/userSlice";
import { getUser } from "@/app/actions/user/actions";

export const googleAuthWindow = async (
  store: AppStore,
): Promise<AuthResponse | null> => {
  const { url, state } = await getGoogleLoginProps();
  const authWindow = window.open(url, "", "popup=true");
  if (authWindow) {
    const checkWindow = setInterval(async () => {
      if (authWindow.closed) {
        clearInterval(checkWindow);
        if (state && validate(state))
          return await loginProvider(state, "google", store);
      }
    }, 100);
  }
  return null;
};

export const githubAuthWindow = async (
  store: AppStore,
): Promise<AuthResponse | null> => {
  const { url, state } = await getGithubLoginProps();
  const authWindow = window.open(url, "", "popup=true");
  if (authWindow) {
    const checkWindow = setInterval(async () => {
      if (authWindow.closed) {
        clearInterval(checkWindow);
        if (state && validate(state)) {
          return await loginProvider(state, "github", store);
        }
      }
    }, 100);
  }
  return null;
};

const loginProvider = async (
  id: string,
  provider: AuthProvider,
  store?: AppStore,
) => {
  const response = await loginWithProvider(id, provider);
  store?.dispatch(setAuth(response));
  const user = await getUser();
  store?.dispatch(setUser(user));
  return response;
};

export function AuthContainer(): ReactElement {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={twMerge(
        "custom-container",
        isActive ? "right-panel-active" : "",
      )}
    >
      <div className="form-container sign-up-container">
        <SignupForm />
      </div>
      <div className="form-container sign-in-container">
        <LoginForm />
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="text-left overlay-panel overlay-left">
            <div className="p-3 absolute left-5 top-5 z-[100]">
              <AlertDialogCancel className="bg-transparent border-0 hover:bg-transparent">
                <X className="text-gray-300" />
              </AlertDialogCancel>
            </div>
            <h1>Welcome Back!</h1>
            <p className="mb-4">
              To keep connected with us please login with your personal info
            </p>
            <Button
              className="text-white border bg-transparent"
              onClick={() => setIsActive(false)}
            >
              Sign In
            </Button>
          </div>
          <div className="overlay-panel overlay-right">
            <div className="p-3 absolute right-5 top-5 z-[100]">
              <AlertDialogCancel className="bg-transparent border-0 hover:bg-transparent">
                <X className="text-gray-300" />
              </AlertDialogCancel>
            </div>
            <h1>Hello, Friend!</h1>
            <p className="mb-4">
              Enter your personal details and start journey with us
            </p>
            <Button
              className="text-white border bg-transparent"
              onClick={() => setIsActive(true)}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
