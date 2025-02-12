"use client";
import React from "react";
import { useLatestOMDBDataByType } from "@/services/react.query";
import { APPLICATION_TYPES } from "@/constants";

const Movies = ({ page }: { page: string }) => {
  const { data, isLoading, error } = useLatestOMDBDataByType({
    type: APPLICATION_TYPES.MOVIE,
    page: 1,
    year: "",
    plot: "",
  });
  return <div>Movies</div>;
};

export default Movies;
