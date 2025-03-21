import { twMerge } from "tailwind-merge";

export default function Review({ review }: { review: ReviewType }) {
  return (
    <div key={review.id} className="h-auto flex flex-col gap-[15px]">
      <p
        className={twMerge(
          `text-white01 tablet:text-[18px] mobile:text-[14px] ${
            // !viewMoreStates[review.id] &&
            "line-clamp-5"
          }`,
        )}
      >
        {review.content}
        <button className="inline text-gray03"></button>
      </p>

      <div className="flex justify-between tablet:text-[14px] mobile:text-[12px]">
        <p className="flex gap-[10px]">
          <span className="text-white01">{review.author}</span>
          <span className="text-gray03">{review.date}</span>
        </p>
        <div className="text-white03 flex gap-[20px]">
          <p>
            <span className="pr-[5px]">편집</span>|
            <span className="pl-[5px]">삭제</span>
          </p>
        </div>
      </div>

      <hr className="h-[1px] border-gray02" />
    </div>
  );
}
