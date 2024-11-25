"use client";
import { ReactElement, useEffect, useState } from "react";
import { useUser } from "@/lib/redux/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userDataSchema } from "@/lib/auth/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserPersonalData } from "@/app/actions/user/actions";
import { set as setUser } from "@/lib/redux/features/userSlice";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function UserPersonalInformationForm(): ReactElement | null {
  const user = useUser();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof userDataSchema>>({
    resolver: zodResolver(userDataSchema),
    defaultValues: {
      firstName: user?.firstName ? user.firstName : "",
      lastName: user?.lastName ? user.lastName : "",
    },
  });

  async function onSubmit(data: z.infer<typeof userDataSchema>) {
    const response = await updateUserPersonalData({ ...data, id: user?.id });
    if (response) {
      dispatch(setUser(response));
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later",
      });
    }
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold">Personal Information</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <section className="flex gap-6 w-full mb-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <Button
            className="w-fit px-6 flex"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {form.formState.isSubmitting ? "Please wait" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
