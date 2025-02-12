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
  PERSON: "/person",
  SEARCH: "/search",
  WATCHLIST: "/watchlist",
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
      label: "TV Shows",
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

export const API_FOLDER_DETAILS = {
  TYPE: {
    MOVIE: "movie",
    SERIES: "series",
    EPISODE: "episode",
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
