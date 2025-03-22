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
  const argumentContens = [
    {
      id: "1",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit hic deleniti necessitatibus quam maxime eveniet nemo, ea natus tempora aspernatur impedit in consectetur voluptas, .",
      author: "김예빈",
      date: "2024.10.23,오전 03:26",
    },
    {
      id: "2",
      content:
        "이 영화 정말 재미있습니다! 다른 사람들도 꼭 봐야 할 영화인 것 같아요. 특별히 연출이 좋았어요.",
      author: "이철수",
      date: "2024.10.23,오전 03:26",
    },
  ];

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
