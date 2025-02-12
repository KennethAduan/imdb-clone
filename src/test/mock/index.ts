import {
  EpisodeResponse,
  OMDBResponse,
  SearchResponse,
  SeriesResponse,
} from "@/types/omdb.types";

export const mockEpisodeData: EpisodeResponse = {
  success: true,
  data: {
    Title: "Pilot",
    Type: "episode",
    imdbID: "tt0959621",
    Response: "True",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "8.1/10",
      },
    ],
    Plot: "The pilot episode of the series.",
    Language: "English",
    Country: "United States",
    Awards: "Nominated for 1 Emmy.",
    Poster: "https://example.com/poster.jpg",
    Year: "2010",
    Rated: "TV-14",
    Released: "2010-01-25",
    Runtime: "42 min",
    Genre: "Action, Adventure, Drama",
    Director:
      "J.J. Abrams, Bryan Burk, Jeff Pinkner, André Nemec, Greg Plageman",
    Writer: "J.J. Abrams, Bryan Burk, Jeff Pinkner, André Nemec, Greg Plageman",
    Actors: "J.J. Abrams, Bryan Burk, Jeff Pinkner, André Nemec, Greg Plageman",
    Metascore: "89",
    imdbRating: "8.1",
    imdbVotes: "1,234,567",
    totalSeasons: "1",
  },
  error: undefined,
};

export const mockSearchData: SearchResponse = {
  success: true,
  data: {
    Search: [
      {
        Title: "A Hero Who Happens to Be Legendary",
        Year: "2025",
        imdbID: "tt31579490",
        Type: "movie",
        Poster: "N/A",
      },
    ],
    Response: "True",
    Error: "No results found",
  },
};

export const mockSeriesData: SeriesResponse = {
  success: true,
  data: {
    Title: "Breaking Bad",
    Year: "2008–2013",
    Rated: "TV-MA",
    Released: "20 Jan 2008",
    Runtime: "49 min",
    Genre: "Crime, Drama, Thriller",
    Director: "N/A",
    Writer: "Vince Gilligan",
    Actors: "Bryan Cranston, Aaron Paul, Anna Gunn",
    Plot: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student to secure his family's future.",
    Language: "English, Spanish",
    Country: "United States",
    Awards: "Won 16 Primetime Emmys. 169 wins & 269 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "9.5/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "96%",
      },
    ],
    Metascore: "N/A",
    imdbRating: "9.5",
    imdbVotes: "2,261,726",
    imdbID: "tt0903747",
    Type: "series",
    totalSeasons: "5",
    Response: "True",
  },
  error: undefined,
};

export const omdbMockSuccessResponse: OMDBResponse = {
  Search: [
    {
      Title: "Civil War",
      Year: "2024",
      imdbID: "tt17279496",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYTkzMjc0YzgtY2E0Yi00NDBlLWI0MWUtODY1ZjExMDAyOWZiXkEyXkFqcGc@._V1_SX300.jpg",
    },
  ],
  totalResults: "1",
  Response: "True",
};

export const omdbMockEmptyResponse: OMDBResponse = {
  Search: [],
  totalResults: "0",
  Response: "False",
  error: {
    success: false,
    message: "No results found",
  },
};

export const mockMovieData = {
  Search: [
    {
      Title: "The Wild Robot Animation Movies",
      Year: "2025",
      imdbID: "tt1234567",
      Type: "movie",
      Poster: "https://example.com/poster1.jpg",
      Plot: "After a shipwreck, an intelligent robot called Rod is stranded on an uninhabited island.",
    },
    {
      Title: "Another Movie",
      Year: "2025",
      imdbID: "tt7654321",
      Type: "movie",
      Poster: "https://example.com/poster2.jpg",
      Plot: "Another interesting plot.",
    },
  ],
  totalResults: "2",
  Response: "True",
};
