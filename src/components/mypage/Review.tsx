import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formattingDate";

export default function Review({
  ip_name,
  ip_id,
  content,
  created_at,
}: Review) {
  const getRoutePath = () => {
    const slashCount = (ip_id.match(/\//g) || []).length;

    switch (slashCount) {
      case 1:
        return `/detailseason/${ip_id}`;
      case 2:
        return `/detailepisode/${ip_id}`;
      default:
        return `/detailmovie/${ip_id}`;
    }
  };

  return (
    <>
      <Link
        to={getRoutePath()}
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
