import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
import { TOP_LOADER_COLOR } from "@/constants";
import { getSession } from "@/lib/jwt";
import NextTopLoader from "nextjs-toploader";
import React from "react";

const ClientLayout = async ({ children }: { children: React.ReactNode }) => {
  const auth = await getSession();

  return (
    <>
      <NextTopLoader showSpinner={false} color={TOP_LOADER_COLOR} />
      <div className="flex min-h-screen flex-col">
        <Navbar isAuthenticated={!!auth} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default ClientLayout;
