import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
import { TOP_LOADER_COLOR } from "@/constants";
import NextTopLoader from "nextjs-toploader";
import React from "react";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextTopLoader showSpinner={false} color={TOP_LOADER_COLOR} />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default ClientLayout;
