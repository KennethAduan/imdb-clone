export interface SeriesResponse {
  success: boolean;
  data: Data;
  error?: ErrorResponse;
}

export interface MovieResponse {
  success: boolean;
  data: Data;
  error?: ErrorResponse;
}

export interface EpisodeResponse {
  success: boolean;
  data: Data;
  error?: ErrorResponse;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}
export interface OMDBResponse {
  Search: Search[];
  totalResults: string;
  Response: string;
  error?: ErrorResponse;
}

export interface SearchResponse {
  success: boolean;
  data: {
    Response: string;
    Search: Array<{
      Title: string;
      Year: string;
      imdbID: string;
      Type: string;
      Poster: string;
    }>;
    Error?: string;
  };
}

export interface Search {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
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
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  totalSeasons: string;
  Response: string;
}
export interface Rating {
  Source: string;
  Value: string;
}
