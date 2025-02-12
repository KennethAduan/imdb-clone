import HeroCarousel from "@/components/sections/hero.carousel";
import LatestMoviesCarousel from "@/components/sections/latest.movies.carousel";
import LatestSeriesCarousel from "@/components/sections/latest.series.carousel";
export default function Page() {
  return (
    <>
      <HeroCarousel />
      <LatestMoviesCarousel />
      <LatestSeriesCarousel />
    </>
  );
}
