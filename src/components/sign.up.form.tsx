"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "../schema/auth.schema";
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
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { cn } from "@/lib/utils";
import { signUpAction } from "@/server-actions/auth";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
type FormData = z.infer<typeof authSchema>;

const SignUpForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { execute, isExecuting } = useAction(signUpAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        router.replace(ROUTES.PROFILE);
      } else if (data?.message) {
        form.setError("root", { message: data.message });
      }
    },
  });

  const handleSubmit = async (data: FormData) => {
    execute(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Show root error message if it exists */}
              {form.formState.errors.root && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {form.formState.errors.root.message}
                </div>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="m@example.com"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="johndoe"
                        autoComplete="username"
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
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        autoComplete="new-password"
                        placeholder="********"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        autoComplete="new-password"
                        placeholder="********"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isExecuting}>
                {isExecuting ? "Signing up..." : "Sign up"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              href={ROUTES.SIGN_IN}
              className="underline underline-offset-4"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
