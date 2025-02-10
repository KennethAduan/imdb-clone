import React from "react";

import { redirect } from "next/navigation";
import { ROUTES } from "@/constants";

const TitleSearchPage = async ({
  searchParams,
}: {
  searchParams: { title?: string };
}) => {
  const title = (await searchParams).title;
  if (!title) {
    redirect(ROUTES.HOME);
  }
  return <div>TitleSearchPage {title}</div>;
};

export default TitleSearchPage;
