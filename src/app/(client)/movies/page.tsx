import Movies from "@/components/sections/movies";
import React from "react";

const MoviesPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const page = (await searchParams).page?.trim();
  return <Movies page={page ?? ""} />;
};

export default MoviesPage;
