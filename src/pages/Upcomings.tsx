import { useEffect, useState } from "react";
import { movieAPI } from "../api/movie";
import Upcoming from "../components/upcoming/Upcoming";

export default function Upcomings() {
  const [upcomings, setUpcomings] = useState<UpComingMovieResultsType[]>([]);
  const [allGenre, setAllgenre] = useState<GenreType[]>([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const upcoming = await movieAPI.getUpComingMovie();

        setUpcomings(upcoming.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    const fetchGenre = async () => {
      const genres = await movieAPI.getGenres();
      setAllgenre(genres["genres"]);
    };

    fetchUpcomingMovies();
    fetchGenre();
  }, []);

  return (
    <div className="flex flex-col items-center justify-between w-full h-full max-desktop:px-10">
      {upcomings.map((upcoming: UpComingMovieResultsType, index: number) => (
        <Upcoming upcomingInfo={upcoming} key={index} allGenre={allGenre} />
      ))}
    </div>
  );
}
