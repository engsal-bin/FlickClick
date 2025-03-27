import EpisodeContent from "./EpisodeContent";

export default function ScrapEpisode({
  episodeClips,
}: {
  episodeClips: SavedClips[] | null;
}) {
  return (
    <div className="flex flex-col gap-[30px] mb-[50px]">
      {episodeClips?.map((clip) => (
        <div key={clip.ip_id}>
          <EpisodeContent
            ip_id={`detailepisode/${clip.ip_id}`}
            ip_name={clip.ip_name}
            poster_path={clip.poster_path}
            summary={clip.summary}
            upstream_ip_name={clip.upstream_ip_name}
          />
        </div>
      ))}
    </div>
  );
}
