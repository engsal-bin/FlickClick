import { twMerge } from "tailwind-merge";
import { useAuth } from "../../api/Auth";
import { commonAPI } from "../../api/common";
import { useState } from "react";

export default function Review({
  review,
  stateLifting,
}: {
  review: MovieReviewType;
  stateLifting: () => void;
}) {
  const { user } = useAuth();

  const [editContent, setEditContent] = useState("");

  const [editStatus, setEditStatus] = useState(false);

  const reviewEdit = async (id: number) => {
    await commonAPI.patchMovieReview(id, editContent);
  };
  const reviewDelete = async (id: number) => {
    await commonAPI.deleteMovieReview(id);
  };

  return (
    <div key={review.id} className="h-auto flex flex-col gap-[15px]">
      {editStatus ? (
        <textarea
          onChange={(e) => {
            setEditContent(e.target.value);
          }}
        >
          {review.content}
        </textarea>
      ) : (
        <p
          className={twMerge(
            `text-white01 tablet:text-[18px] mobile:text-[14px] ${
              // !viewMoreStates[review.id] &&
              "line-clamp-5"
            }`
          )}
        >
          {review.content}
          <button className="inline text-gray03">더 보기</button>
        </p>
      )}

      <div className="flex justify-between tablet:text-[14px] mobile:text-[12px]">
        <p className="flex gap-[10px]">
          <span className="text-white01">{review.author_name}</span>
          <span className="text-gray03">{review.created_at}</span>
        </p>
        {user?.id === review.author_id && (
          <div className="text-white03 flex gap-[20px]">
            <p>
              <button
                className="mr-[5px]"
                onClick={async () => {
                  if (editStatus) {
                    await reviewEdit(review.id);
                    await stateLifting();
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
                  await stateLifting();
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
