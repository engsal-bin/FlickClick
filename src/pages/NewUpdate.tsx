import { useEffect, useState } from "react";
import arrowLeft from "../assets/icon/arrow/arrowLeft.svg";
import { tvAPI } from "../api/tv";
import { movieAPI } from "../api/movie";
import ContentsWithoutViewMore from "../components/common/ContentsWithoutViewMore";
import GenreTag from "../components/common/GenreTag";

export default function NewUpdate() {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [newUpdateImgSrc, setNewUpateImgSrc] = useState<NewUpdateType[]>([]);
  const [genres, setGenres] = useState<GenreBasicType[]>([]);
  const [genreNames, setGenreNames] = useState<GenreBasicType[]>([]);
  const [allGenre, setAllgenre] = useState<GenreType[]>([]);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGenreSelect = (id: number) => {
    setSelectedGenres((prev) => [...prev, id]);
  };

  const handleGenreDeselect = (id: number) => {
    setSelectedGenres((prev) => prev.filter((genreId) => genreId !== id));
  };

  const fetchGenre = async () => {
    const genres = await movieAPI.getGenres();
    console.log("Fetched genres:", genres["genres"]);
    setAllgenre(genres["genres"]);
  };

  const fetchNewUpdate = async () => {
    try {
      const onTheAirTvSeriese = await tvAPI.getOnTheAirTvSeriese();
      const nowPlayingMovie = await movieAPI.getNowPlayingMovie();

      const combinedSrc: NewUpdateType[] = [
        ...onTheAirTvSeriese.results.map(
          (item: OnTheAirTvSerieseResultsType) => ({
            poster_path:
              "https://image.tmdb.org/t/p/w220_and_h330_face" +
              item.poster_path,
            popularity: item.popularity,
            id: item.id,
            title: item.name,
            media_type: "tv",
            name: item.name,
            genre_ids: item.genre_ids,
          })
        ),
        ...nowPlayingMovie.results.map((item: NowPlayingMovieResultsType) => ({
          poster_path:
            "https://image.tmdb.org/t/p/w220_and_h330_face" + item.poster_path,
          popularity: item.popularity,
          id: item.id,
          title: item.title,
          media_type: "movie",
          name: item.name,
          genre_ids: item.genre_ids,
        })),
      ];

      const sortedSrc = combinedSrc
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 20);

      const newGenreNames: GenreBasicType[] = [];
      sortedSrc.forEach((item) => {
        item.genre_ids.forEach((genre_id) => {
          allGenre.forEach((genre) => {
            if (genre_id === genre.id) {
              newGenreNames.push(genre);
            }
          });
        });
      });

      setGenreNames(newGenreNames);

      const uniqueGenres = Array.from(
        new Set(newGenreNames.map((genre) => genre.name))
      )
        .map((name) => newGenreNames.find((genre) => genre.name === name))
        .filter((genre): genre is GenreBasicType => genre !== undefined);

      console.log("Unique genres:", uniqueGenres);
      setGenres(uniqueGenres);
      setNewUpateImgSrc(sortedSrc);
    } catch (error) {
      console.error("Error fetching new updates:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchGenre();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (allGenre.length > 0) {
      fetchNewUpdate();
    }
  }, [allGenre]);

  const filteredContents =
    selectedGenres.length > 0
      ? newUpdateImgSrc.filter((info) =>
          selectedGenres.every((selectedGenre) =>
            info.genre_ids.includes(selectedGenre)
          )
        )
      : newUpdateImgSrc;

  return (
    <div className="w-full h-full bg-black flex flex-col tablet:gap-[50px] tablet:p-[50px] tablet:px-[40px] mobile:gap-[20px] mobile:px-[20px]">
      <img
        src={arrowLeft}
        className="w-[10px] cursor-pointer"
        onClick={handleGoBack}
      />
      <div className="flex flex-col gap-[20px]">
        <div className="text-xl font-bold text-white01">신규 업데이트</div>
        <div className="flex gap-[10px] text-white03 font-light flex-wrap justify-start">
          {genres.map((genre) => (
            <GenreTag
              key={genre.id}
              genre={genre}
              isSelected={selectedGenres.includes(genre.id)}
              onSelect={handleGenreSelect}
              onDeselect={handleGenreDeselect}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-start gap-4">
        {filteredContents.map((info) => (
          <ContentsWithoutViewMore info={info} key={info.id} />
        ))}
      </div>
    </div>
  );
}
