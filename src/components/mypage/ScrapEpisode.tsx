import EpisodeContent from "./EpisodeContent";

export default function ScrapEpisode({
  episodeClips,
}: {
  episodeClips: SavedClips[] | null;
}) {
  return (
    <div className="flex flex-col gap-[30px] mb-[50px]">
      {episodeClips?.map((clip) => (
        <EpisodeContent
          ip_id={clip.ip_id}
          ip_name={clip.ip_name}
          ip_type={"episode"}
          poster_path={clip.poster_path}
          summary={clip.summary}
        />
      ))}
    </div>
  );
}
