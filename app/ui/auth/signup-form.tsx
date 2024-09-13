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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signup } from "@/app/actions/auth/actions";
import { Loader2 } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import {
  ProviderLogo,
  ProviderLogoContainer,
} from "@/app/ui/auth/provider-logo";
import { registerFormSchema } from "@/lib/auth/definitions";
import { useDispatch, useStore } from "react-redux";
import { set as setAuth } from "@/lib/redux/features/authSlice";
import { set as setUser } from "@/lib/redux/features/userSlice";
import { RootState } from "@/lib/redux/store";
import { getUser } from "@/app/actions/user/actions";
import { googleAuthWindow } from "@/lib/auth/functions/google-auth-window";
import { githubAuthWindow } from "@/lib/auth/functions/github-auth-window";

export function SignupForm() {
  const { toast } = useToast();
  const store = useStore<RootState>();
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      subscription: "FREE",
    },
  });

  async function onSubmit(data: z.infer<typeof registerFormSchema>) {
    const response = await signup(data);

    if (!response)
      toast({
        variant: "destructive",
        title: "Registration has failed!",
        description: "Something went wrong, please try again later",
      });
    else if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Registration has failed!",
        description: "User with this email already exists",
      });
    } else {
      dispatch(setAuth(response));
      const user = await getUser();
      dispatch(setUser(user));
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 w-full min-w-[370px] h-full flex flex-col justify-center items-center bg-white p-5"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input type="text" placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subscription"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Subscription</FormLabel>
              <Select onValueChange={field.onChange} defaultValue="FREE">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subscripton" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="FREE">FREE</SelectItem>
                  <SelectItem value="PRO">PRO</SelectItem>
                  <SelectItem value="GOLD">GOLD</SelectItem>
                </SelectContent>
              </Select>
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
