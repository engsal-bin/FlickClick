import DeleteIcon from "../../assets/icon/deleteIcon.svg";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formattingDate";

export default function CreatedDiscussContent({
  argument_id,
  topic,
  ip_name,
  ip_id,
  created_at,
  profile_image,
}: Argument) {
  return (
    <Link
      to={`/${ip_id}`}
      className="flex items-center justify-between border border-gray01 rounded-[10px] py-[30px] px-[20px]"
    >
      <div className="flex mobile:items-start tablet:items-center gap-[10px]">
        <img
          src={profile_image}
          className="w-[45px] h-[45px] rounded-full bg-gray03"
        ></img>
        <div>
          <p className="text-[18px] text-white01 font-bold">{topic}</p>
          <div className="text-white03 mobile:flex gap-[50px] desktop:hidden">
            <p>{ip_name}</p>
            <p>3</p>
          </div>
          <div className="mobile:flex flex-col gap-[5px] tablet:hidden">
            <p className="text-gray03">{formatDate(created_at)}</p>
            <div className="flex gap-[5px]">
              <img src={DeleteIcon} alt="삭제" />
              <p className="text-warn">삭제</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[100px] items-center">
        <div className="text-white03 desktop:flex gap-[50px] hidden">
          <p>{ip_name}</p>
          <p>3</p>
        </div>
        <div className="tablet:flex flex-col gap-[5px] mobile:hidden">
          <p className="text-gray03">{formatDate(created_at)}</p>
          <div className="flex gap-[5px]">
            <img src={DeleteIcon} alt="삭제" />
            <p className="text-warn">삭제</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
