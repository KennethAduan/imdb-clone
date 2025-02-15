import React from "react";
import SearchResults from "@/components/sections/search.results";
import { PageProps } from "@/types/page.type";

const TitleSearchPage = async ({ searchParams }: PageProps) => {
  const title = (await searchParams)?.title;

  return <SearchResults search={title as string} />;
};

export default TitleSearchPage;
