"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="text-center px-4 lg:px-0">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
          Oops! Page Not Found
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-[500px] mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved
          to another URL.
        </p>

        <Button
          onClick={handleBackHome}
          size="lg"
          className="font-semibold"
          aria-label="Go back to homepage"
        >
          Back to Homepage
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
