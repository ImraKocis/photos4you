"use client";
import { ReactElement, useState } from "react";
import { User } from "@/lib/types/user";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAdminDataUpdateSchema } from "@/lib/admin/definitions";
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
import { updateAdminUser } from "@/app/actions/admin/users";

export function AdminUserEditForm({
  user,
}: Readonly<{ user: User }>): ReactElement {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const form = useForm<z.infer<typeof userAdminDataUpdateSchema>>({
    resolver: zodResolver(userAdminDataUpdateSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  async function onSubmit(data: z.infer<typeof userAdminDataUpdateSchema>) {
    setUploading(true);
    const newData = {
      id: user.id,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    const response = await updateAdminUser(newData);
    if (!response) {
      toast({
        variant: "destructive",
        title: "Update failed",
      });
      setUploading(false);
      return null;
    }
    setUploading(false);
    toast({
      title: "User personal data updated",
    });
  }

  return (
    <div className="w-full min-w-[350px] p-8 bg-background">
      <Form {...form}>
        <form className="space-y-6 " onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Edit your post</h2>
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full gap-12">
            <Button className="w-full" type="submit" disabled={uploading}>
              Publish
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
