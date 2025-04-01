import { Link } from "react-router-dom";
import { formatDate } from "./../../utils/formattingDate";

export default function MyOpinionContent({
  argument_id,
  topic,
  ip_name,
  ip_id,
  comment,
  comment_created_at,
}: ArgumentComment) {
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
        <div className="font-bold text-white03 tablet:text-[16px] mobile:text-[14px] flex gap-[5px]">
          <p>{ip_name}</p>
          <p>|</p>
          <p>{topic}</p>
        </div>
        <p className="tablet:text-[20px] mobile:text-[16px] text-white01">
          {comment}
        </p>
        <p className="font-light tablet:text-[14px] mobile:text-[12px] text-gray03 mb-[30px]">
          {formatDate(comment_created_at)}
        </p>
      </Link>
    </>
  );
}
