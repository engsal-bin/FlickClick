export default function EpisodeContent({
  ip_id,
  ip_name,
  ip_type,
  poster_path,
  summary,
}: SavedClips) {
  return (
    <div className="flex">
      <div className="tablet:flex justify-between items-center gap-[30px]">
        <figure className="min-w-[323px] h-[180px] mb-[30px] tablet:mb-0 object-cover rounded-[10px]">
          {/* TODO: Object-cover가 맞나 */}
          <img src={poster_path} className="w-full h-full rounded-[10px] " />
        </figure>
        <div className="flex flex-col tablet:gap-5 gap-[10px]">
          <p className="text-[14px] tablet:text-[22px] text-white02 font-semibold">
            슬기로운 의사생활
            {/* TODO: 에피소드 RPC로 가져와야 함. 테이블에서도 추가해야 될 것 같음 */}
            {/* 상위 아이피 이름 */}
          </p>
          <p className="text-[16px] tablet:text-[22px] text-white02 font-semibold">
            {ip_name}
          </p>
          <p className="text-[14px] tablet:text-[18px] text-white03 tablet:h-[58px] overflow-hidden tablet:line-clamp-2">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}
