import ScrapContent from "./ScrapContent";

export default function ScrapSeason({
  seasonClips,
}: {
  seasonClips: SavedClips[] | null;
}) {
  console.log(seasonClips);
  return (
    <div className="flex flex-wrap tablet:gap-[30px] mobile:gap-[10px] mb-[50px]">
      {seasonClips?.map((clip) => (
        <div key={clip.ip_id}>
          <ScrapContent
            ip_id={`detailseason/${clip.ip_id}`}
            ip_name={clip.ip_name}
            ip_type={clip.ip_type}
            poster_path={clip.poster_path}
            summary={clip.summary}
          />
        </div>
      ))}
    </div>
  );
}
