export interface SeriesResponse {
  success: boolean;
  data: Data;
  error?: ErrorResponse;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}

export interface Data {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  totalSeasons: string;
  Response: string;
}
export interface Rating {
  Source: string;
  Value: string;
}
