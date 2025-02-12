import { XCircle } from "lucide-react";
import React from "react";
type ErrorDataProps = {
  error: Error;
  "data-testid"?: string;
};
const ErrorData = ({ error, "data-testid": dataTestId }: ErrorDataProps) => {
  return (
    <section
      data-testid={dataTestId}
      className="w-full lg:max-w-[95%] sm:max-w-[90%] 2xl:max-w-[45%] mx-auto mb-4 mt-24"
    >
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 p-8">
        <XCircle className="w-16 h-16 text-red-500 animate-pulse" />
        <div className="text-center">
          <p className="text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ErrorData;
