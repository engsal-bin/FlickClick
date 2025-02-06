import EpisodeContent from "./EpisodeContent";

export default function Episode() {
  return (
    <div className="flex flex-col gap-[30px] mb-[50px]">
      <EpisodeContent />
      <EpisodeContent />
      <EpisodeContent />
      <EpisodeContent />
    </div>
  );
}
