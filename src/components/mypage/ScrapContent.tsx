import { Link } from "react-router-dom";

export default function ScrapContent({
  ip_id,
  ip_name,
  poster_path,
}: SavedClips) {
  return (
    <Link to={`/detailmovie/${ip_id}`} className="flex flex-col gap-[10px]">
      <figure
        className={`tablet:w-[212px] tablet:h-[306px] mobile:w-[93px] mobile:h-[134px] bg-gray03 rounded-[10px]`}
      >
        <img
          src={poster_path}
          className="w-full h-full object-cover rounded-[10px]"
        />
      </figure>
      <div className="tablet:text-[18px] tablet:w-[212px] mobile:text-[16px] mobile:w-[93px] truncate text-white02">
        {ip_name}
      </div>
    </Link>
  );
}
