import { API_FOLDER_DETAILS } from "@/constants";
import { NextResponse } from "next/server";
import { config } from "@/config/environment";
import { ParamsRequest } from "../../shared/types";

const getSeriesById = async (id: string) => {
  const response = await fetch(
    `${config.api.omdb.baseUrl}?apikey=${config.api.omdb.key}&type=${API_FOLDER_DETAILS.TYPE.SERIES}&i=${id}`
  );
  const data = await response.json();
  return data;
};

export const GET = async (
  req: Request,
  { params }: { params: ParamsRequest }
) => {
  const id = (await params).id;
  try {
    const series = await getSeriesById(id);
    return NextResponse.json({
      data: series,
    });
  } catch (error) {
    return NextResponse.json({
      message: error,
    });
  }
};
