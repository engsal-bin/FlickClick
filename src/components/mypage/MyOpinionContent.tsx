export default function MyOpinionContent({
  argument_id,
  topic,
  ip_name,
  ip_type,
  ip_id,
  comment,
  comment_created_at,
  comment_author_id,
}: ArgumentComment) {
  return (
    <>
      <div className="border-b-[1px] border-gray01  flex flex-col gap-[15px] mt-[30px]">
        <div className="font-bold text-white03 tablet:text-[16px] mobile:text-[14px] flex gap-[5px]">
          <p>{ip_name}</p>
          <p>|</p>
          <p>{topic}</p>
        </div>
        <p className="tablet:text-[20px] mobile:text-[16px] text-white01">
          {comment}
        </p>
        <p className="font-light tablet:text-[14px] mobile:text-[12px] text-gray03 mb-[30px]">
          {comment_created_at}
        </p>
      </div>
    </>
  );
}
