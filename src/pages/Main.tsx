import { useEffect, useState } from "react";

import { commonAPI } from "../api/common.ts";
import Banner from "../components/common/Banner";
import Contents from "../components/common/Contents";
import MainThumbnail from "../components/common/MainThumbnail";
import { tvAPI } from "../api/tv.ts";
import { movieAPI } from "../api/movie.ts";

export default function Main() {
  const [trendImgSrc, setTrendImgSrc] = useState<BasicType[]>([]);
  const [newUpdateImgSrc, setNewUpateImgSrc] = useState<BasicType[]>([]);
  const [upcomingImgSrc, setUpcomingImgSrc] = useState<BasicType[]>([]);

  useEffect(() => {
    // 인기 급상승
    const fetchTrendAll = async () => {
      try {
        const trend = await commonAPI.getTrendingAll(1);
        console.log(trend);
        setTrendImgSrc(
          trend.results
            .map((item: TrendingAllResultsType) => ({
              poster_path:
                "https://image.tmdb.org/t/p/w220_and_h330_face" +
                item.poster_path,
              id: item.id,
              title: item.title,
              media_type: item.media_type,
            }))
            .slice(0, 20)
        );
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    // 신규 업데이트
    const fetchNewUpdate = async () => {
      try {
        const onTheAirTvSeriese = await tvAPI.getOnTheAirTvSeriese();
        const nowPlayingMovie = await movieAPI.getNowPlayingMovie();

        const combinedArr = [
          ...onTheAirTvSeriese.results.map(
            (item: OnTheAirTvSerieseResultsType) => ({
              poster_path:
                "https://image.tmdb.org/t/p/w220_and_h330_face" +
                item.poster_path,
              id: item.id,
              media_type: "tv",
              title: item.name,
              popularity: item.popularity,
            })
          ),
          ...nowPlayingMovie.results.map(
            (item: NowPlayingMovieResultsType) => ({
              poster_path:
                "https://image.tmdb.org/t/p/w220_and_h330_face" +
                item.poster_path,
              id: item.id,
              media_type: "movie",
              title: item.title,
              popularity: item.popularity,
            })
          ),
        ];

        const sortedSrc = combinedArr
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 20);

        setNewUpateImgSrc(
          sortedSrc.map((item) => ({
            poster_path: item.poster_path,
            id: item.id,
            title: item.title,
            media_type: item.media_type,
          }))
        );
      } catch (error) {
        console.error("Error fetching new updates:", error);
      }
    };

    // 공개 예정
    const fetchUpcomingMovies = async () => {
      try {
        const upcoming = await movieAPI.getUpComingMovie();

        setUpcomingImgSrc(
          upcoming.results.map((item: UpComingMovieResultsType) => ({
            poster_path:
              "https://image.tmdb.org/t/p/w220_and_h330_face" +
              item.poster_path,
            id: item.id,
            title: item.title,
            media_type: "movie",
          }))
        );
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    fetchTrendAll();
    fetchNewUpdate();
    fetchUpcomingMovies();
  }, []);
  return (
    <div className="flex flex-col justify-between items-center mb-[100px] desktop:gap-[50px] tablet:gap-[40px] mobile:gap-[30px] text-white bg-black">
      <MainThumbnail />
      <Banner />
      <Contents
        to="/popular"
        showMore
        imgSrc={trendImgSrc.map((item) => item.poster_path)}
      >
        인기 급상승
      </Contents>
      <Contents
        to="/newupdate"
        showMore
        imgSrc={newUpdateImgSrc.map((item) => item.poster_path)}
      >
        신규 업데이트
      </Contents>
      <Contents
        to="/upcoming"
        showMore
        imgSrc={upcomingImgSrc.map((item) => item.poster_path)}
      >
        공개 예정
      </Contents>
      <Contents
        to=""
        showMore={false}
        imgSrc={trendImgSrc.map((item) => item.poster_path)}
      >
        새해에 봐야하는 ☀️
      </Contents>
    </div>
  );
}
