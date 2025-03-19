import InputTextarea from "./InputTextarea";
import arrowRight from "../../assets/icon/arrow/arrowRight.svg";
import arrowBottom from "../../assets/icon/arrow/arrowBottom.svg";
import { useState } from "react";
import ArgumentReview from "./ArgumentReview";

export default function Argument({
  argumentConten,
}: {
  argumentConten: ReviewType;
}) {
  const [isArgumentToggleOpen, setIsArgumentToggleOpen] = useState(false);
  // 더미 토론 데이터 예시
  const reviews = [
    {
      id: "1",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit hic deleniti necessitatibus quam maxime eveniet nemo, ea natus tempora aspernatur impedit in consectetur voluptas, commodi eum dolore. Voluptate, ad repellendus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit hic deleniti necessitatibus quam maxime eveniet nemo, ea natus tempora aspernatur impedit in consectetur voluptas, commodi eum dolore. Voluptate, ad repellendus.",
      author: "김예빈",
      date: "2024.10.22",
      isMine: true,
    },
    {
      id: "2",
      content:
        "이 영화 정말 재미있습니다! 다른 사람들도 꼭 봐야 할 영화인 것 같아요. 특별히 연출이 좋았어요.",
      author: "이철수",
      date: "2024.10.23",
      isMine: false,
    },
  ];
  return (
    <div className="flex flex-col gap-[20px] tablet:px-[20px] tablet:py-[30px] mobile:px-[10px] mobile:py-[20px] rounded-[10px] border border-gray03 mb-5">
      {/* 토론 */}
      <div className="h-auto flex justify-between tablet:flex-row mobile:flex-col tablet:gap-[20px] mobile:gap-[10px]">
        <div className="flex items-center h-auto">
          <img
            src=""
            className="bg-white h-[45px] aspect-square rounded-full"
          />
          <p className="text-white01 text-bold text-[18px] ml-[13px]">
            {argumentConten.content}
          </p>
        </div>
        <div className="text-gray03 flex items-center gap-[30px] mobile:justify-between">
          {!isArgumentToggleOpen && (
            <>
              <p className="mobile:hidden">3</p>
              <div>
                <p>{argumentConten.date}</p>
                <p>
                  작성자: <span>{argumentConten.author}</span>
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
              {reviews.map((review) => (
                <ArgumentReview review={review} />
              ))}
            </div>

            <InputTextarea reviewOrArgumentOrOpinion="opinion" />
          </div>
        </div>
      )}
    </div>
  );
}
