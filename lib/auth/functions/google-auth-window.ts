import { AppStore } from "@/lib/redux/store";
import { AuthResponse } from "@/lib/types/auth";
import { getGoogleLoginProps } from "@/app/actions/auth/actions";
import { validate } from "uuid";
import { loginProvider } from "@/lib/auth/functions/login-provider";

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
