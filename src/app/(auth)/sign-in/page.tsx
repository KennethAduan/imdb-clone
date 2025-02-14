import React from "react";
import { LoginForm } from "@/components/forms/login.form";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/jwt";
import { ROUTES } from "@/constants";

const SignInPage = async () => {
  const auth = await getSession();
  if (auth) {
    redirect(ROUTES.HOME);
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default SignInPage;
