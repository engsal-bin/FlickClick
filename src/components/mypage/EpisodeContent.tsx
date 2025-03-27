import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../api/axios";
import imagenone2 from "../../assets/icon/imagenone2.svg";

export default function EpisodeContent({
  ip_id,
  ip_name,
  poster_path,
  summary,
  upstream_ip_name,
}: SavedClips) {
  return (
    <Link to={`/${ip_id}`} className="flex">
      <div className="tablet:flex justify-between items-center gap-[30px]">
        <div className="min-w-[323px] h-[180px] mb-[30px] tablet:mb-0 object-cover rounded-[10px]">
          <div
            style={{
              backgroundImage: poster_path
                ? `url(${IMAGE_BASE_URL}original${poster_path})`
                : `url(${imagenone2})`,
            }}
            className="w-full h-full bg-cover bg-center rounded-[10px] "
          />
        </div>
        <div className="flex flex-col tablet:gap-5 gap-[10px]">
          <p className="text-[14px] tablet:text-[22px] text-white02 font-semibold">
            {upstream_ip_name}
          </p>
          <p className="text-[16px] tablet:text-[22px] text-white02 font-semibold">
            {ip_name}
          </p>
          <p className="text-[14px] tablet:text-[18px] text-white03 tablet:h-[58px] overflow-hidden tablet:line-clamp-2">
            {summary}
          </p>
        </div>
      </div>
    </Link>
  );
}
