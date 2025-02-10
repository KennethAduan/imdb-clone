import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
import React from "react";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
