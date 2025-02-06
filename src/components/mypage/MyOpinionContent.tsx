export default function MyOpinionContent({
  content,
  subject,
  opinion,
  date,
}: {
  content: string;
  subject: string;
  opinion: string;
  date: string;
}) {
  return (
    <>
      <div className="border-b-[1px] border-gray01  flex flex-col gap-[15px] mt-[30px]">
        <div className="font-bold text-white03 tablet:text-[16px] mobile:text-[14px] flex gap-[5px]">
          <p>{content}</p>
          <p>|</p>
          <p>{subject}</p>
        </div>
        <p className="tablet:text-[20px] mobile:text-[16px] text-white01">
          {opinion}
        </p>
        <p className="font-light tablet:text-[14px] mobile:text-[12px] text-gray03 mb-[30px]">
          {date}
        </p>
      </div>
    </>
  );
}
