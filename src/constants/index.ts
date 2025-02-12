import { Facebook, Twitter, Instagram, Github, Youtube } from "lucide-react";
export const APP_NAME = "MOVIESFLIX";
export const TOP_LOADER_COLOR = "#DC143C";
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const APP_LOGO = "/movie-icon.png";
export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  MOVIE: "/movies",
  TV: "/tv",
  TV_DETAILS_BY_ID: "/tv/:id",
  PERSON: "/person",
  SEARCH: "/search",
  WATCHLIST: "/watchlist",
  MOVIE_DETAILS_BY_ID: "/movies/:id",
};

export const NAVBAR_DETAILS = {
  LOGO: APP_LOGO,
  TITLE: "IMDB Clone",
  NAVLINKS_LEFT_SIDE: [
    {
      label: "Home",
      href: ROUTES.HOME,
    },
    {
      label: "TV Series",
      href: ROUTES.TV,
    },
    {
      label: "Movies",
      href: ROUTES.MOVIE,
    },
    {
      label: "Watchlist",
      href: ROUTES.WATCHLIST,
    },
  ],

  NAVLINKS_RIGHT_SIDE: [
    {
      label: "Sign In",
      href: ROUTES.SIGN_IN,
    },
  ],
};

export enum APPLICATION_TYPES {
  MOVIE = "movie",
  SERIES = "series",
  EPISODE = "episode",
}
export enum YEARS {
  YEAR_2025 = "2025",
  YEAR_2024 = "2024",
  YEAR_2023 = "2023",
  YEAR_2022 = "2022",
  YEAR_2021 = "2021",
}

export const API_FOLDER_DETAILS = {
  TYPE: {
    MOVIE: APPLICATION_TYPES.MOVIE,
    SERIES: APPLICATION_TYPES.SERIES,
    EPISODE: APPLICATION_TYPES.EPISODE,
  },
  YEAR: {
    YEAR_2025: YEARS.YEAR_2025,
    YEAR_2024: YEARS.YEAR_2024,
    YEAR_2023: YEARS.YEAR_2023,
    YEAR_2022: YEARS.YEAR_2022,
    YEAR_2021: YEARS.YEAR_2021,
  },
  PLOT: {
    SHORT: "short",
    FULL: "full",
  },
  POPULAR_SEARCHES: [
    "love",
    "hero",
    "star",
    "war",
    "life",
    "world",
    "game",
    "dark",
    "night",
    "day",
    "love",
    "hero",
    "star",
    "war",
    "life",
    "world",
    "game",
  ],
} as const;

export const CAROUSEL_DETAILS = {
  CAROUSEL_ITEMS: 3,
  WATCH_NOW_BUTTON_TEXT: "Watch Now",
  RETRY_BUTTON_TEXT: "Retry",
  N_A_IMAGE_SOURCE: "N/A",
} as const;

export const LATEST_MOVIES_CAROUSEL_DETAILS = {
  TITLE: "Latest Movies",
  DESCRIPTION: "Discover the newest releases in cinema",
  RETRY_BUTTON_TEXT: "Retry",
  N_A_IMAGE_SOURCE: "N/A",
  EXPLORE_MORE_BUTTON_TEXT: "Explore More",
  EXPLORE_MORE_BUTTON_LINK: ROUTES.MOVIE,
} as const;

export const LATEST_SERIES_CAROUSEL_DETAILS = {
  TITLE: "Latest Series",
  DESCRIPTION: "Discover the newest releases in television",
  RETRY_BUTTON_TEXT: "Retry",
  N_A_IMAGE_SOURCE: "N/A",
  EXPLORE_MORE_BUTTON_TEXT: "Explore More",
  EXPLORE_MORE_BUTTON_LINK: ROUTES.TV,
} as const;

export const FOOTER_DETAILS = {
  LOGO: "/movie-icon.png",
  DESCRIPTION:
    "Your trusted source for movie information and reviews. Discover, track, and explore the world of cinema.",
  COPYRIGHT: "Moviesflix™",

  SECTIONS: [
    {
      title: "Resources",
      links: [
        { label: "Movies", href: ROUTES.MOVIE },
        { label: "TV Shows", href: ROUTES.TV },
        { label: "Top Rated", href: ROUTES.HOME },
        { label: "Coming Soon", href: ROUTES.HOME },
      ],
    },
    {
      title: "Help Center",
      links: [
        { label: "FAQ", href: ROUTES.HOME },
        { label: "Guidelines", href: ROUTES.HOME },
        { label: "Contact Us", href: ROUTES.HOME },
        { label: "Support", href: ROUTES.HOME },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: ROUTES.HOME },
        { label: "Terms of Service", href: ROUTES.HOME },
        { label: "Cookie Policy", href: ROUTES.HOME },
        { label: "Licensing", href: ROUTES.HOME },
      ],
    },
  ],
  SOCIAL_LINKS: [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: Facebook,
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: Twitter,
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: Instagram,
    },
    {
      name: "GitHub",
      href: "https://github.com",
      icon: Github,
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: Youtube,
    },
  ],
} as const;
