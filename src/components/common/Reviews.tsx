import { twMerge } from "tailwind-merge";
import sendIcon from "../../assets/icon/send.svg";
import { useState } from "react";

export default function Reviews() {
  // 더미 댓글 데이터 예시
  const reviews = [
    {
      id: "1",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit hic deleniti necessitatibus quam maxime eveniet nemo, ea natus tempora aspernatur impedit in consectetur voluptas, commodi eum dolore. Voluptate, ad repellendus.",
      author: "김예빈",
      date: "2024.10.22",
    },
    {
      id: "2",
      content: "이 영화 정말 재미있습니다! 다른 사람들도 꼭 봐야 할 영화인 것 같아요. 특별히 연출이 좋았어요.",
      author: "이철수",
      date: "2024.10.23",
    },
    // 추가적인 리뷰를 넣을 수 있음
  ];

  // 각 댓글에 대해 '더보기' 상태
  const [viewMoreStates, setViewMoreStates] = useState(
    reviews.reduce((acc, review) => {
      acc[review.id] = false; // 모든 댓글의 기본 상태
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleViewMore = (id: string) => {
    setViewMoreStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <div>
        <div className="flex justify-between mb-[30px] tablet:px-[30px] mobile:px-[10px] items-center tablet:h-[86px] mobile:h-[59px] border border-gray02 rounded-[10px]">
          <input
            type="text"
            placeholder="리뷰를 입력하세요"
            className="bg-black tablet:text-[20px] mobile:text-[16px] placeholder:text-gray03"
          />
          <button>
            <img
              src={sendIcon}
              alt="입력 전송 버튼"
              className="tablet:w-[26px] mobile:w-[16px]"
            />
          </button>
        </div>

        {/* 리뷰리스트 */}
        <div className="flex flex-col gap-[20px]">
          {reviews.map((review) => (
            <div key={review.id} className="h-auto flex flex-col gap-[15px]">
              <p
                className={twMerge(
                  `text-white01 tablet:text-[18px] mobile:text-[14px] ${
                    !viewMoreStates[review.id] && "line-clamp-5"
                  }`)
                }
              >
                {review.content}
                <button className="inline text-gray03">
                  <span onClick={() => toggleViewMore(review.id)}>
                    {viewMoreStates[review.id] ? "접기" : "더보기"}
                  </span>
                </button>
              </p>

              <div className="flex justify-between tablet:text-[14px] mobile:text-[12px]">
                <p className="flex gap-[10px]">
                  <span className="text-white01">{review.author}</span>
                  <span className="text-gray03">{review.date}</span>
                </p>
                <div className="text-white03 flex gap-[20px]">
                  <p className="underline">답글달기</p>
                  <p>
                    <span className="pr-[5px]">편집</span>|
                    <span className="pl-[5px]">삭제</span>
                  </p>
                </div>
              </div>

              <hr className="h-[1px] border-gray02" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
