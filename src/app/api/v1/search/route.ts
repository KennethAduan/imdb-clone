import { config } from "@/config/environment";
import { isEmptyObject } from "@/lib/utils";
import { NextResponse } from "next/server";

const getSearchResults = async ({ searchTerm }: { searchTerm: string }) => {
  const response = await fetch(
    `${config.api.omdb.baseUrl}?apikey=${config.api.omdb.key}&s=${searchTerm}`
  );
  const data = await response.json();
  return data;
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get("s");

    if (!searchTerm || searchTerm.length < 2) {
      return NextResponse.json(
        {
          error: "Search term must be at least 2 characters long",
        },
        { status: 400 }
      );
    }

    const response = await getSearchResults({ searchTerm });
    if (isEmptyObject(response)) {
      return NextResponse.json({
        message: "No results found",
      });
    }
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from OMDB", message: error },
      { status: 500 }
    );
  }
};
