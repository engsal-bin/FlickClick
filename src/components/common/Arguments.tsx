import { useEffect, useState } from "react";
import { commonAPI } from "../../api/common";
import Argument from "./Argument";
import InputTextarea from "./InputTextarea";
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
  const stateLifting = async () => {
    await fetchArgument();
  };
  useEffect(() => {
    fetchArgument();
  }, []);
  return (
    <div>
      <InputTextarea
        stateLifting={stateLifting}
        contentId={contentId}
        reviewOrArgumentOrOpinion={"argument"}
        movieOrSeasonOrEpisode={movieOrSeasonOrEpisode}
      />
      {/* 토론리스트 */}

      {argumentlists.length > 0 ? (
        argumentlists.map((argumentlist, index) => (
          <Argument
            argumentConten={argumentlist}
            key={index}
            movieOrSeasonOrEpisode={movieOrSeasonOrEpisode}
          />
        ))
      ) : (
        <div>토론이 없습니다.</div>
      )}
    </div>
  );
}
