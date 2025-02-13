import React from "react";
import SearchResults from "@/components/sections/search.results";

const TitleSearchPage = async ({
  searchParams,
}: {
  searchParams: { title?: string };
}) => {
  const title = (await searchParams).title?.trim();

  return <SearchResults search={title ?? ""} />;
};

export default TitleSearchPage;
