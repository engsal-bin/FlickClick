import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";
import ScrapEpisode from "./ScrapEpisode";
import ScrapMovie from "./ScrapMovie";
import ScrapSeason from "./ScrapSeason";
import { useState } from "react";
import TagWithnotCancelIcon from "../common/TagWithnotCancelIcon";

interface ScrapTabProps {
  seasonClips: SavedClips[] | null;
  episodeClips: SavedClips[] | null;
  movieClips: SavedClips[] | null;
}

const ScrapTab = ({ seasonClips, episodeClips, movieClips }: ScrapTabProps) => {
  const [scrapType, setScrapType] = useState("season");
  const { language } = useLanguageStore();
  const translation = menuTranslations[language];

  return (
    <div>
      <div className="flex gap-[10px]">
        {["season", "episode", "movie"].map((type) => (
          <TagWithnotCancelIcon
            key={type}
            onClick={() => setScrapType(type)}
            isSelected={scrapType === type}
          >
            {type === "season"
              ? translation.season
              : type === "episode"
                ? translation.episode
                : translation.movie}
          </TagWithnotCancelIcon>
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
