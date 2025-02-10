import { API_FOLDER_DETAILS } from "@/constants";
import { NextResponse } from "next/server";
import { config } from "@/config/environment";
import { ParamsRequest } from "../../shared/types";
import { isEmptyObject } from "@/utils";

const getSeriesById = async ({ id }: ParamsRequest) => {
  try {
    const response = await fetch(
      `${config.api.omdb.baseUrl}?apikey=${config.api.omdb.key}&type=${API_FOLDER_DETAILS.TYPE.SERIES}&i=${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: ParamsRequest }
) => {
  const id = (await params).id;
  try {
    const series = await getSeriesById({ id });
    if (isEmptyObject(series)) {
      return NextResponse.json({
        success: false,
        message: "Series not found",
      });
    }
    return NextResponse.json({
      success: true,
      data: series,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
};
