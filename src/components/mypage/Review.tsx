export default function Review({
  content,
  review,
  date,
}: {
  content: string;
  review: string;
  date: string;
}) {
  return (
    <>
      <div className="border-b-[1px] border-gray01  flex flex-col gap-[15px] mt-[30px]">
        <p className="font-bold text-white03 tablet:text-[16px] mobile:text-[14px]">
          {content}
        </p>
        <p className="tablet:text-[20px] mobile:text-[16px] text-white01">
          {review}
        </p>
        <p className="font-light tablet:text-[14px] mobile:text-[12px] text-gray03 mb-[30px]">
          {date}
        </p>
      </div>
    </>
  );
}
