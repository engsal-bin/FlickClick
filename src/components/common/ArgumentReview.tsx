export default function ArgumentReview({ review }: { review: ReviewType }) {
  return (
    <div>
      <div
        className={`min-h-[77px] w-full flex ${
          review.isMine ? "justify-end" : ""
        }`}
      >
        <div
          className={`desktop:max-w-[894px] tablet:max-w-[558px] rounded-[10px] w-auto h-full flex justify-between items-center px-[20px] py-[15px] ${
            review.isMine ? "bg-main30 text-black01" : "bg-gray01"
          }`}
        >
          <img
            src=""
            className="bg-white h-[45px] aspect-square rounded-full"
          />
          <div className="ml-[15px]">
            <p
              className={`tablet:text-[18px] mobile:text-[14px] font-bold ${
                review.isMine ? "" : "text-white01"
              }`}
            >
              {review.content}
            </p>
            <p className="tablet:text-[14px] mobile:text-[12px]">
              <span className={review.isMine ? "" : "text-white02 mr-[10px]"}>
                {review.author}
              </span>
              <span className={review.isMine ? "" : "text-white03"}>
                {review.date}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
