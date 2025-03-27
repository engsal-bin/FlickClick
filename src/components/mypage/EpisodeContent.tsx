import { Link } from "react-router-dom";

export default function EpisodeContent({
  ip_id,
  ip_name,
  poster_path,
  summary,
  upstream_ip_name,
}: SavedClips) {
  return (
    <Link to={`/detailepisode/${ip_id}`} className="flex">
      <div className="tablet:flex justify-between items-center gap-[30px]">
        <figure className="min-w-[323px] h-[180px] mb-[30px] tablet:mb-0 object-cover rounded-[10px]">
          {/* TODO: Object-cover가 맞나 */}
          <img src={poster_path} className="w-full h-full rounded-[10px] " />
        </figure>
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
