import InputTextarea from "./InputTextarea";
import arrowRight from "../../assets/icon/arrow/arrowRight.svg";
import arrowBottom from "../../assets/icon/arrow/arrowBottom.svg";
import { useEffect, useState } from "react";
import ArgumentReview from "./ArgumentReview";
import { commonAPI } from "../../api/common";
import { formatDate } from "../../utils/formattingDate";

export default function Argument({
  argumentConten,
  movieOrSeasonOrEpisode,
}: {
  argumentConten: ArgumentType;
  movieOrSeasonOrEpisode: movieOrSeasonOrEpisodeType;
}) {
  const [isArgumentToggleOpen, setIsArgumentToggleOpen] = useState(false);
  const [argumentOpinions, setArgumentOpinions] = useState([]);

  const fetchArgumentOpinion = async () => {
    if (movieOrSeasonOrEpisode === "movie") {
      const { data } = await commonAPI.getMovieArgumentOpinion(
        argumentConten.id
      );
      setArgumentOpinions(data);
    }
    if (movieOrSeasonOrEpisode === "season") {
      const { data } = await commonAPI.getSeasonArgumentOpinion(
        argumentConten.id
      );
      setArgumentOpinions(data);
    }
    if (movieOrSeasonOrEpisode === "episode") {
      const { data } = await commonAPI.getEpisodeArgumentOpinion(
        argumentConten.id
      );
      setArgumentOpinions(data);
    }
  };
  useEffect(() => {
    fetchArgumentOpinion();
  }, []);
  return (
    <div className="flex flex-col gap-[20px] tablet:px-[20px] tablet:py-[30px] mobile:px-[10px] mobile:py-[20px] rounded-[10px] border border-gray03 mb-5">
      {/* 토론 */}
      <div className="h-auto flex justify-between tablet:flex-row mobile:flex-col tablet:gap-[20px] mobile:gap-[10px]">
        <div className="flex items-center h-auto">
          <img
            src={argumentConten.author_img_url}
            className="bg-white h-[45px] aspect-square rounded-full"
          />
          <p className="text-white01 text-bold text-[18px] ml-[13px]">
            {argumentConten.topic}
          </p>
        </div>
        <div className="text-gray03 flex items-center gap-[30px] mobile:justify-between">
          {!isArgumentToggleOpen && (
            <>
              <p className="mobile:hidden">3</p>
              <div>
                <p>{formatDate(argumentConten.updated_at)}</p>
                <p>
                  작성자: <span>{argumentConten.author_name}</span>
                </p>
              </div>
            </>
          )}
          <button
            onClick={() => setIsArgumentToggleOpen(!isArgumentToggleOpen)}
          >
            <img
              src={isArgumentToggleOpen ? arrowBottom : arrowRight}
              alt="토론 펼치기 버튼"
            />
          </button>
        </div>
      </div>
      {/* 토론의 댓글 */}
      {isArgumentToggleOpen && (
        <div>
          <hr className="border border-gray03 mb-[30px]" />
          <div className="tablet:px-[20px] mobile:px-[5px] flex flex-col tablet:gap-[30px] mobile:gap-[20px]">
            <div className="h-auto flex flex-col tablet:gap-[20px] mobile:gap-[10px]">
              {argumentOpinions.map((argumentOpinion, index) => (
                <ArgumentReview opinion={argumentOpinion} key={index} />
              ))}
            </div>

            <InputTextarea
              stateLifting={fetchArgumentOpinion}
              contentId={argumentConten.id}
              reviewOrArgumentOrOpinion="opinion"
              movieOrSeasonOrEpisode={movieOrSeasonOrEpisode}
            />
          </div>
        </div>
      )}
    </div>
  );
}
