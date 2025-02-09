import ScrapEpisode from "./ScrapEpisode";
import ScrapMovie from "./ScrapMovie";
import ScrapSeason from "./ScrapSeason";
import Tag from "../common/Tag";
import { useState } from "react";

interface ScrapTabProps {
  seasonClips: SavedClips[] | null;
  episodeClips: SavedClips[] | null;
  movieClips: SavedClips[] | null;
}

const ScrapTab = ({ seasonClips, episodeClips, movieClips }: ScrapTabProps) => {
  const [scrapType, setScrapType] = useState("season");

  return (
    <div>
      <div className="flex gap-[10px]">
        {["season", "episode", "movie"].map((type) => (
          <Tag
            key={type}
            onClick={() => setScrapType(type)}
            isSelected={scrapType === type}
          >
            {type === "season"
              ? "시즌"
              : type === "episode"
              ? "에피소드"
              : "영화"}
          </Tag>
        ))}
      </div>
      <div className="mt-[30px]">
        {scrapType === "season" && <ScrapSeason seasonClips={seasonClips} />}
        {scrapType === "episode" && (
          <ScrapEpisode episodeClips={episodeClips} />
        )}
        {scrapType === "movie" && <ScrapMovie movieClips={movieClips} />}
      </div>
    </div>
  );
};

export default ScrapTab;
