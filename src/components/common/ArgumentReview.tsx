import { useState } from "react";
import { useAuth } from "../../api/Auth";
import { formatDate } from "../../utils/formattingDate";
import { commonAPI } from "../../api/common";

export default function ArgumentReview({
  opinion,
  movieOrSeasonOrEpisode,
}: {
  opinion: OpinionType;
  movieOrSeasonOrEpisode: movieOrSeasonOrEpisodeType;
}) {
  const { user } = useAuth();
  const [view, setView] = useState(false);

  const opinionDelete = async () => {
    const deleteCheck = confirm("정말 삭제하시겠습니까?");
    if (!deleteCheck) return;

    if (movieOrSeasonOrEpisode === "movie") {
      await commonAPI.patchMovieArgumentOpinion(opinion.id);
    } else if (movieOrSeasonOrEpisode === "season") {
      await commonAPI.patchSeasonArgumentOpinion(opinion.id);
    } else if (movieOrSeasonOrEpisode === "episode") {
      await commonAPI.patchEpisodeArgumentOpinion(opinion.id);
    }
  };

  return (
    <div>
      <div
        className={`min-h-[77px] w-full flex ${
          opinion.author_id === user?.id ? "justify-end" : ""
        }`}
      >
        <div
          className={`relative desktop:max-w-[894px] tablet:max-w-[558px] rounded-[10px] w-auto h-full flex justify-between items-start px-[20px] py-[15px] ${
            opinion.author_id === user?.id
              ? "bg-main30 text-black01"
              : "bg-gray01"
          }`}
        >
          {opinion.content ? (
            <>
              {opinion.author_id === user?.id && (
                <button
                  className="absolute top-[1px] bg-white text-main30 right-[2px] w-6 rounded-full"
                  onClick={opinionDelete}
                >
                  ✕
                </button>
              )}
              <div className="flex items-start">
                <img
                  src={opinion.author_img_url}
                  className="bg-white h-[45px] aspect-square rounded-full"
                  alt="author"
                />
              </div>
              <div className="ml-[15px]">
                <p
                  className={`tablet:text-[18px] mobile:text-[14px] font-bold w-[182px] break-words ${
                    !view && "line-clamp-[10]"
                  } ${opinion.author_id === user?.id ? "" : "text-white01"}`}
                >
                  {opinion.content}
                </p>
                {opinion.content.length > 168 && (
                  <button onClick={() => setView(!view)}>
                    {view ? "간략히" : "더보기"}
                  </button>
                )}

                <p className="tablet:text-[14px] mobile:text-[12px]">
                  <span
                    className={
                      opinion.author_id === user?.id
                        ? ""
                        : "text-white02 mr-[10px]"
                    }
                  >
                    {opinion.author_name}
                  </span>
                  <span
                    className={
                      opinion.author_id === user?.id ? "" : "text-white03"
                    }
                  >
                    {formatDate(opinion.created_at)}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <p>삭제된 의견입니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
