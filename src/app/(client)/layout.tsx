import FooterSection from "@/components/layouts/footer";
import NavbarSection from "@/components/layouts/navbar";
import React from "react";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarSection />
      {children}
      <FooterSection />
    </>
  );
};

export default ClientLayout;
