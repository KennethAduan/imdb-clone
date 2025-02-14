import React from "react";
import SignUpForm from "@/components/forms/sign.up.form";
import { getSession } from "@/lib/jwt";
import { ROUTES } from "@/constants";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const auth = await getSession();
  if (auth) {
    redirect(ROUTES.HOME);
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
