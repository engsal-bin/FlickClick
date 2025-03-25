import { useState } from "react";
import { useAuth } from "../../api/Auth";
import { formatDate } from "../../utils/formattingDate";

export default function ArgumentReview({ opinion }: { opinion: OpinionType }) {
  const { user } = useAuth();
  const [view, setView] = useState(false);
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
          {opinion.author_id === user?.id && (
            <button className="absolute top-[1px] bg-white text-main30 right-[2px] w-6 rounded-full">
              ✕
            </button>
          )}

          <div className="flex items-start">
            <img
              src={opinion.author_img_url}
              className="bg-white h-[45px] aspect-square rounded-full"
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
                  opinion.author_id === user?.id ? "" : "text-white02 mr-[10px]"
                }
              >
                {opinion.author_name}
              </span>
              <span
                className={opinion.author_id === user?.id ? "" : "text-white03"}
              >
                {formatDate(opinion.created_at)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
