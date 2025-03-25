import InputTextarea from "./InputTextarea";
import arrowRight from "../../assets/icon/arrow/arrowRight.svg";
import arrowBottom from "../../assets/icon/arrow/arrowBottom.svg";
import { useEffect, useState } from "react";
import ArgumentReview from "./ArgumentReview";
import { commonAPI } from "../../api/common";
import { formatDate } from "../../utils/formattingDate";

export default function Argument({
  argumentContent,
  stateLifting,
  movieOrSeasonOrEpisode,
}: {
  argumentContent: ArgumentType;
  stateLifting: () => void;
  movieOrSeasonOrEpisode: movieOrSeasonOrEpisodeType;
}) {
  const [isArgumentToggleOpen, setIsArgumentToggleOpen] = useState(false);
  const [argumentOpinions, setArgumentOpinions] = useState([]);
  const [editContent, setEditContent] = useState(argumentContent.topic);
  const [editStatus, setEditStatus] = useState(false);

  const fetchArgumentOpinion = async () => {
    if (movieOrSeasonOrEpisode === "movie") {
      const { data } = await commonAPI.getMovieArgumentOpinion(
        argumentContent.id
      );
      setArgumentOpinions(data);
    }
    if (movieOrSeasonOrEpisode === "season") {
      const { data } = await commonAPI.getSeasonArgumentOpinion(
        argumentContent.id
      );
      setArgumentOpinions(data);
    }
    if (movieOrSeasonOrEpisode === "episode") {
      const { data } = await commonAPI.getEpisodeArgumentOpinion(
        argumentContent.id
      );
      setArgumentOpinions(data);
    }
  };

  const argumentEdit = async () => {
    if (movieOrSeasonOrEpisode === "movie") {
      await commonAPI.patchMovieArgument(argumentContent.id, editContent);
    }
    if (movieOrSeasonOrEpisode === "episode") {
      await commonAPI.patchEpisodeArgument(argumentContent.id, editContent);
    }
    if (movieOrSeasonOrEpisode === "season") {
      await commonAPI.patchSeasonArgument(argumentContent.id, editContent);
    }
  };

  const argumentDelete = async () => {
    if (movieOrSeasonOrEpisode === "movie") {
      const deleteCheck = confirm("정말 삭제하시겠습니까?");
      if (deleteCheck) {
        await commonAPI.deleteMovieArgument(argumentContent.id);
      }
      return;
    }
    if (movieOrSeasonOrEpisode === "season") {
      const deleteCheck = confirm("정말 삭제하시겠습니까?");
      if (deleteCheck) {
        await commonAPI.deleteSeasonArgument(argumentContent.id);
      }
      return;
    }
    if (movieOrSeasonOrEpisode === "episode") {
      const deleteCheck = confirm("정말 삭제하시겠습니까?");
      if (deleteCheck) {
        await commonAPI.deleteEpisodeArgument(argumentContent.id);
      }
      return;
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
            src={argumentContent.author_img_url}
            className="bg-white h-[45px] aspect-square rounded-full"
          />
          {editStatus ? (
            <textarea
              className="resize-none"
              onChange={(e) => {
                setEditContent(e.target.value);
              }}
              value={argumentContent.topic}
            ></textarea>
          ) : (
            <p className="text-white01 text-bold text-[18px] ml-[13px]">
              {argumentContent.topic}
            </p>
          )}
        </div>
        <div className="flex justify-between w-60">
          <p className="flex items-center h-12 text-white">
            {argumentOpinions.length > 0 && argumentOpinions.length}
          </p>
          <div className="flex-none text-gray03 flex items-center gap-[30px] w-[207px] mobile:justify-between">
            <>
              <div>
                <p>{formatDate(argumentContent.updated_at)}</p>
                <div className="flex justify-between">
                  <p>
                    작성자: <span>{argumentContent.author_name}</span>
                  </p>
                  {argumentOpinions.length == 0 && (
                    <div>
                      <button
                        className="mr-[5px]"
                        onClick={async () => {
                          if (editStatus) {
                            if (editContent !== argumentContent.topic) {
                              await argumentEdit();
                              await stateLifting();
                            }
                            setEditStatus(false);
                          } else {
                            setEditStatus(true);
                          }
                        }}
                      >
                        <span>편집</span>
                      </button>
                      |
                      <button
                        className="ml-[5px]"
                        onClick={async () => {
                          await argumentDelete();
                          await stateLifting();
                        }}
                      >
                        <span>삭제</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>

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
      </div>
      {/* 토론의 댓글 */}
      {isArgumentToggleOpen && (
        <div>
          <hr className="border border-gray03 mb-[30px]" />
          <div className="tablet:px-[20px] mobile:px-[5px] flex flex-col tablet:gap-[30px] mobile:gap-[20px]">
            <div className="h-auto flex flex-col tablet:gap-[20px] mobile:gap-[10px]">
              {argumentOpinions.length > 0 ? (
                argumentOpinions.map((argumentOpinion, index) => (
                  <ArgumentReview opinion={argumentOpinion} key={index} />
                ))
              ) : (
                <p className="text-white">의견이 없습니다.</p>
              )}
            </div>

            <InputTextarea
              stateLifting={fetchArgumentOpinion}
              contentId={argumentContent.id}
              reviewOrArgumentOrOpinion="opinion"
              movieOrSeasonOrEpisode={movieOrSeasonOrEpisode}
            />
          </div>
        </div>
      )}
    </div>
  );
}
