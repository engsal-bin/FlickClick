import { useEffect, useState } from "react";

import { commonAPI } from "../api/common.ts";
import { movieAPI } from "../api/movie.ts";
import { tvAPI } from "../api/tv.ts";
import Banner from "../components/common/Banner";
import Contents from "../components/common/Contents.tsx";
import MainThumbnail from "../components/common/MainThumbnail";

export default function Main() {
  const [trendingData, setTrendingData] = useState<BasicType[]>([]);
  const [newUpdateData, setNewUpdateData] = useState<BasicType[]>([]);
  const [upComingData, setUpcomingData] = useState<BasicType[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [trend, onTheAirTvSeriese, nowPlayingMovie, upcoming] =
          await Promise.all([
            commonAPI.getTrendingAll(1),
            tvAPI.getOnTheAirTvSeriese(),
            movieAPI.getNowPlayingMovie(),
            movieAPI.getUpComingMovie(),
          ]);

        setTrendingData(
          trend.results
            .map((item: TrendingAllResultsType) => ({
              poster_path:
                "https://image.tmdb.org/t/p/w220_and_h330_face" +
                item.poster_path,
              id: item.id,
              title: item.title,
              media_type: item.media_type,
            }))
            .slice(0, 20),
        );

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
            }),
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
            }),
          ),
        ];

        const sortedSrc = combinedArr
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 20);

        setNewUpdateData(
          sortedSrc.map((item) => ({
            poster_path: item.poster_path,
            id: item.id,
            title: item.title,
            media_type: item.media_type,
          })) as BasicType[],
        );

        setUpcomingData(
          upcoming.results.map((item: UpComingMovieResultsType) => ({
            poster_path:
              "https://image.tmdb.org/t/p/w220_and_h330_face" +
              item.poster_path,
            id: item.id,
            title: item.title,
            media_type: "movie",
          })),
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="flex flex-col justify-between items-center mb-[100px] desktop:gap-[50px] tablet:gap-[40px] mobile:gap-[30px] text-white bg-black">
      <MainThumbnail />
      <Banner />
      <Contents to="/popular" showMore trendingData={trendingData}>
        인기 급상승
      </Contents>
      <Contents to="/newupdate" showMore trendingData={upComingData}>
        신규 업데이트
      </Contents>
      <Contents to="/upcomings" showMore trendingData={newUpdateData}>
        공개 예정
      </Contents>
      <Contents to="" showMore={false}>
        새해에 봐야하는 ☀️
      </Contents>
    </div>
  );
}
