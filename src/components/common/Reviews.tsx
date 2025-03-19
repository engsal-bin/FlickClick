import InputTextarea from "./InputTextarea";
import Review from "./Review";

export default function Reviews() {
  // 더미 댓글 데이터 예시
  const reviews = [
    {
      id: "1",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit hic deleniti necessitatibus quam maxime eveniet nemo, ea natus tempora aspernatur impedit in consectetur voluptas, commodi eum dolore. Voluptate, ad repellendus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit hic deleniti necessitatibus quam maxime eveniet nemo, ea natus tempora aspernatur impedit in consectetur voluptas, commodi eum dolore. Voluptate, ad repellendus.",
      author: "김예빈",
      date: "2024.10.22",
    },
    {
      id: "2",
      content:
        "이 영화 정말 재미있습니다! 다른 사람들도 꼭 봐야 할 영화인 것 같아요. 특별히 연출이 좋았어요.",
      author: "이철수",
      date: "2024.10.23",
    },
    // 추가적인 리뷰를 넣을 수 있음
  ];

  return (
    <>
      <div>
        <InputTextarea reviewOrArgumentOrOpinion={"review"} />
        {/* 리뷰리스트 */}
        <div className="flex flex-col gap-[20px]">
          {reviews.map((review, index) => (
            <Review review={review} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
