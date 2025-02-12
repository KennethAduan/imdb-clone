import React from "react";
import SearchResults from "@/components/sections/search.results";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants";

const TitleSearchPage = async ({
  searchParams,
}: {
  searchParams: { title?: string };
}) => {
  const title = (await searchParams).title?.trim();

  if (!title) {
    redirect(ROUTES.HOME);
  }

  return <SearchResults search={title} />;
};

export default TitleSearchPage;
