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
  LOGO: "/movie-icon.png",
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
