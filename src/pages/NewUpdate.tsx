import { useEffect, useState } from "react";
import Contents from "../components/common/Contents";
import { tvAPI } from "../api/tv";
import { movieAPI } from "../api/movie";
export default function NewUpdate() {
  const [newUpdateImgSrc, setNewUpateImgSrc] = useState<NewUpdateType[]>([]);

  useEffect(() => {
    const fetchNewUpdate = async () => {
      try {
        const onTheAirTvSeriese = await tvAPI.getOnTheAirTvSeriese();
        const nowPlayingMovie = await movieAPI.getNowPlayingMovie();

        const combinedSrc = [
          ...onTheAirTvSeriese.results.map(
            (item: OnTheAirTvSerieseResultsType) => ({
              poster_path:
                "https://image.tmdb.org/t/p/w220_and_h330_face" +
                item.poster_path,
              popularity: item.popularity,
              id: item.id,
              title: item.name,
              media_type: "tv",
            })
          ),
          ...nowPlayingMovie.results.map(
            (item: NowPlayingMovieResultsType) => ({
              poster_path:
                "https://image.tmdb.org/t/p/w220_and_h330_face" +
                item.poster_path,
              popularity: item.popularity,
              id: item.id,
              title: item.title,
              media_type: "movie",
            })
          ),
        ];

        const sortedSrc = combinedSrc
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 20);

        setNewUpateImgSrc(sortedSrc);
      } catch (error) {
        console.error("Error fetching new updates:", error);
      }
    };
    fetchNewUpdate();
  }, []);
  return (
    <div>
      <Contents
        showMore
        to=""
        imgSrc={newUpdateImgSrc.map((item) => item.poster_path)}
      />
    </div>
  );
}
