import React from "react";
import { Button } from "./ui/button";

type ErrorRefetchProps = {
  error: Error;
  refetch: () => void;
  buttonText: string;
};
const ErrorRefetch = ({ error, refetch, buttonText }: ErrorRefetchProps) => {
  return (
    <div className="flex items-center justify-center min-h-[600px] text-red-500">
      Error: {error.message}
      <Button onClick={() => refetch()}>{buttonText}</Button>
    </div>
  );
};

export default ErrorRefetch;
