import React from "react";
import SearchResults from "@/components/sections/search.results";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants";

const TitleSearchPage = async ({
  searchParams,
}: {
  searchParams: { title?: string; page?: string };
}) => {
  const title = (await searchParams).title?.trim();
  const page = (await searchParams).page?.trim();

  if (!title) {
    redirect(ROUTES.HOME);
  }

  return <SearchResults search={title} page={page} />;
};

export default TitleSearchPage;
