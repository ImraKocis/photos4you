"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { login } from "@/app/actions/auth/actions";
import { Loader2 } from "lucide-react";
import {
  ProviderLogo,
  ProviderLogoContainer,
} from "@/app/ui/auth/provider-logo";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { loginFormSchema } from "@/lib/auth/definitions";
import { useDispatch, useStore } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { set as setAuth } from "@/lib/redux/features/authSlice";
import { set as setUser } from "@/lib/redux/features/userSlice";
import { getUser } from "@/app/actions/user/actions";
import { googleAuthWindow } from "@/lib/auth/functions/google-auth-window";
import { githubAuthWindow } from "@/lib/auth/functions/github-auth-window";

export function LoginForm() {
  const { toast } = useToast();
  const store = useStore<RootState>();
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    const response = await login(data);
    dispatch(setAuth(response));
    const user = await getUser();
    dispatch(setUser(user));
    if (response) {
      if (response.ok) {
        dispatch(setAuth(response));
        const user = await getUser();
        dispatch(setUser(user));
      }
    } else {
      toast({
        variant: "destructive",
        title: "Authorization failed!",
        description: "Email or password are wrong",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 min-w-[370px] h-full flex flex-col justify-center items-center bg-white p-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full flex"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {form.formState.isSubmitting ? "Please wait" : "Submit"}
        </Button>
        <ProviderLogoContainer>
          <ProviderLogo>
            <FaGoogle
              className="w-12 text-black"
              onClick={async (event) => {
                event.preventDefault();
                await googleAuthWindow(store);
              }}
            />
          </ProviderLogo>
          <ProviderLogo>
            <FaGithub
              className="w-12 text-black"
              onClick={async (event) => {
                event.preventDefault();
                await githubAuthWindow(store);
              }}
            />
          </ProviderLogo>
        </ProviderLogoContainer>
      </form>
    </Form>
  );
}
