import ScrapContent from "./ScrapContent";

export default function ScrapMovie({
  movieClips,
}: {
  movieClips: SavedClips[] | null;
}) {
  return (
    <div className="flex flex-wrap tablet:gap-[30px] mobile:gap-[10px] mb-[50px]">
      {movieClips?.map((clip) => (
        <ScrapContent
          ip_id={clip.ip_id}
          ip_name={clip.ip_name}
          poster_path={clip.poster_path}
        />
      ))}
    </div>
  );
}
