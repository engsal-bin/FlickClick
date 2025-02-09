import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formattingDate";

export default function Review({
  review_id,
  ip_name,
  ip_id,
  content,
  created_at,
}: Review) {
  return (
    <>
      <Link
        to={`/${ip_id}`}
        className="border-b-[1px] border-gray01  flex flex-col gap-[15px] mt-[30px]"
      >
        <p className="font-bold text-white03 tablet:text-[16px] mobile:text-[14px]">
          {ip_name}
        </p>
        <p className="tablet:text-[20px] mobile:text-[16px] text-white01">
          {content}
        </p>
        <p className="font-light tablet:text-[14px] mobile:text-[12px] text-gray03 mb-[30px]">
          {formatDate(created_at)}
        </p>
      </Link>
    </>
  );
}
