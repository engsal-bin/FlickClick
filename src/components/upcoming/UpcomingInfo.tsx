import { useEffect, useState } from "react";
import UpcomingGenres from "./UpcomingGenres";
import UpcomingOtt from "./UpcomingOtt";

export default function UpcomingInfo({
  movie_id,
  genre_ids,
  allGenre,
}: {
  movie_id: number;
  genre_ids: [number];
  allGenre: GenreType[];
}) {
  const [genres, setGenres] = useState<string[]>([]);
  const genreNames: string[] = [];
  useEffect(() => {
    genre_ids.forEach((genre_id) => {
      allGenre.forEach((genre) => {
        if (genre_id === genre.id) {
          genreNames.push(genre.name);
        }
      });
    });
    setGenres(genreNames);
  }, [genre_ids, allGenre]);

  return (
    <div className=" w-[801px]  flex justify-between items-center max-desktop:w-full">
      <UpcomingOtt movie_id={movie_id} />
      <UpcomingGenres genres={genres} />
    </div>
  );
}
