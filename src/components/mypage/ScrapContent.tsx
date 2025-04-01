import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../api/axios";
import imagenone from "../../assets/icon/imagenone.svg";

export default function ScrapContent({
  ip_id,
  ip_name,
  poster_path,
}: SavedClips) {
  return (
    <Link to={`/${ip_id}`} className="flex flex-col gap-[10px]">
      <div
        className={`tablet:w-[212px] tablet:h-[306px] 
          mobile:w-[93px] mobile:h-[134px] bg-gray03 rounded-[10px]
          `}
      >
        <div
          style={{
            backgroundImage: poster_path
              ? `url(${IMAGE_BASE_URL}original${poster_path})`
              : `url(${imagenone})`,
          }}
          className="w-full h-full bg-cover bg-center rounded-[10px]"
        />
      </div>
      <div className="tablet:text-[18px] tablet:w-[212px] mobile:text-[16px] mobile:w-[93px] truncate text-white02">
        {ip_name}
      </div>
    </Link>
  );
}
