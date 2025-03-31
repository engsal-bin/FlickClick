import { useEffect, useState } from "react";
import { commonAPI } from "../../api/common";
import Argument from "./Argument";
import InputTextarea from "./InputTextarea";
import { supabase } from "../../api";
export default function Arguments({
  movieOrSeasonOrEpisode,
  contentId,
}: {
  movieOrSeasonOrEpisode: movieOrSeasonOrEpisodeType;
  contentId: string;
}) {
  const [argumentlists, setArgumentLists] = useState([]);

  const fetchArgument = async () => {
    if (movieOrSeasonOrEpisode === "movie") {
      const { data } = await commonAPI.getMovieArgument(contentId);
      setArgumentLists(data);
    }
    if (movieOrSeasonOrEpisode === "season") {
      const { data } = await commonAPI.getSeasonArgument(contentId);
      setArgumentLists(data);
    }
    if (movieOrSeasonOrEpisode === "episode") {
      const { data } = await commonAPI.getEpisodeArgument(contentId);
      setArgumentLists(data);
    }
  };

  useEffect(() => {
    fetchArgument();
    const movieArgumentSubscription = supabase
      .channel("movie_argument")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "movie_argument" },
        (payload) => {
          console.log("🔄 댓글 변경 감지:", payload);
          fetchArgument();
        }
      )
      .subscribe();
    const episodeArgumentSubscription = supabase
      .channel("episode_argument")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "episode_argument" },
        (payload) => {
          console.log("🔄 댓글 변경 감지:", payload);
          fetchArgument();
        }
      )
      .subscribe();
    const seasonArgumentSubscription = supabase
      .channel("season_argument")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "season_argument" },
        (payload) => {
          console.log("🔄 댓글 변경 감지:", payload);
          fetchArgument();
        }
      )
      .subscribe();
    return () => {
      movieArgumentSubscription.unsubscribe();
      episodeArgumentSubscription.unsubscribe();
      seasonArgumentSubscription.unsubscribe();
    };
  }, []);
  return (
    <div>
      <InputTextarea
        stateLifting={() => {}}
        contentId={contentId}
        reviewOrArgumentOrOpinion={"argument"}
        movieOrSeasonOrEpisode={movieOrSeasonOrEpisode}
      />
      {/* 토론리스트 */}

      {argumentlists.length > 0 ? (
        argumentlists.map((argumentlist, index) => (
          <Argument
            stateLifting={fetchArgument}
            argumentContent={argumentlist}
            key={index}
            movieOrSeasonOrEpisode={movieOrSeasonOrEpisode}
          />
        ))
      ) : (
        <p className="text-white">토론이 없습니다.</p>
      )}
    </div>
  );
}
