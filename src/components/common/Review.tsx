import { twMerge } from "tailwind-merge";
import { useAuth } from "../../api/Auth";
import { commonAPI } from "../../api/common";
import { useState } from "react";
import { formatDate } from "../../utils/formattingDate";

export default function Review({
  review,
  movieOrSeasonOrEpisode,
}: {
  review: MovieReviewType;
  movieOrSeasonOrEpisode: movieOrSeasonOrEpisodeType;
}) {
  const { user } = useAuth();

  const [editContent, setEditContent] = useState(review.content);

  const [editStatus, setEditStatus] = useState(false);

  const [view, setView] = useState(false);

  const reviewEdit = async (id: number) => {
    if (movieOrSeasonOrEpisode === "movie") {
      await commonAPI.patchMovieReview(id, editContent);
    }
    if (movieOrSeasonOrEpisode === "season") {
      await commonAPI.patchSeasonReview(id, editContent);
    }
    if (movieOrSeasonOrEpisode === "episode") {
      await commonAPI.patchEpisodeReview(id, editContent);
    }
  };
  const reviewDelete = async (id: number) => {
    if (movieOrSeasonOrEpisode === "movie") {
      const deleteCheck = confirm("정말 삭제하시겠습니까?");
      if (deleteCheck) {
        await commonAPI.deleteMovieReview(id);
      }
      return;
    }
    if (movieOrSeasonOrEpisode === "season") {
      const deleteCheck = confirm("정말 삭제하시겠습니까?");
      if (deleteCheck) {
        await commonAPI.deleteSeasonReview(id);
      }
      return;
    }
    if (movieOrSeasonOrEpisode === "episode") {
      const deleteCheck = confirm("정말 삭제하시겠습니까?");
      if (deleteCheck) {
        await commonAPI.deleteEpisodeReview(id);
      }
      return;
    }
  };
  console.log(review);

  return (
    <div key={review.id} className="h-auto flex flex-col gap-[15px]">
      {editStatus ? (
        <textarea
          className="resize-none"
          onChange={(e) => {
            setEditContent(e.target.value);
          }}
          defaultValue={review.content}
        ></textarea>
      ) : (
        <div className="">
          <p
            className={twMerge(
              `text-white01 tablet:text-[18px] mobile:text-[14px] break-words ${
                !view && "line-clamp-5"
              }`
            )}
          >
            {review.content}
          </p>
          {review.content.length > 500 && (
            <button className=" text-gray03" onClick={() => setView(!view)}>
              {view ? "간략히" : "더보기"}
            </button>
          )}
        </div>
      )}

      <div className="flex justify-between tablet:text-[14px] mobile:text-[12px]">
        <p className="flex gap-[10px]">
          <span className="text-white01">{review.author_name}</span>
          <span className="text-gray03">
            {formatDate(
              review.updated_at ? review.updated_at : review.created_at
            )}
          </span>
        </p>
        {user?.id === review.author_id && (
          <div className="text-white03 flex gap-[20px]">
            <p>
              <button
                className="mr-[5px]"
                onClick={async () => {
                  if (editStatus) {
                    if (editContent !== review.content) {
                      await reviewEdit(review.id);
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
                  await reviewDelete(review.id);
                }}
              >
                <span>삭제</span>
              </button>
            </p>
          </div>
        )}
      </div>

      <hr className="h-[1px] border-gray02" />
    </div>
  );
}
