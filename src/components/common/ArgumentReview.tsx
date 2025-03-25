import { useAuth } from "../../api/Auth";
import { formatDate } from "../../utils/formattingDate";

export default function ArgumentReview({ opinion }: { opinion: OpinionType }) {
  const { user } = useAuth();
  return (
    <div>
      <div
        className={`min-h-[77px] w-full flex ${
          opinion.author_id === user?.id ? "justify-end" : ""
        }`}
      >
        <div
          className={`desktop:max-w-[894px] tablet:max-w-[558px] rounded-[10px] w-auto h-full flex justify-between items-center px-[20px] py-[15px] ${
            opinion.author_id === user?.id
              ? "bg-main30 text-black01"
              : "bg-gray01"
          }`}
        >
          <img
            src={opinion.author_img_url}
            className="bg-white h-[45px] aspect-square rounded-full"
          />
          <div className="ml-[15px]">
            <p
              className={`tablet:text-[18px] mobile:text-[14px] font-bold ${
                opinion.author_id === user?.id ? "" : "text-white01"
              }`}
            >
              {opinion.content}
            </p>
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
