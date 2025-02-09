import { useState } from "react";
import UpcomingCredits from "./UpcomingCredits";
import UpcomingInfo from "./UpcomingInfo";
import UpcomingOverview from "./UpcomingOverview";
import UpcomingTitle from "./UpcomingTitle";
import UpcomingVideo from "./UpcomingVideo";

export default function Upcoming({
  upcomingInfo,
  allGenre,
}: {
  upcomingInfo: UpComingMovieResultsType;
  allGenre: GenreType[];
}) {
  const [plusView, setPlusView] = useState(false);
  const piusViewFunction = () => {
    setPlusView(!plusView);
  };
  return (
    <div className=" w-[1180px] flex flex-col justify-between max-desktop:w-full max-desktop:h-full   mb-[50px]">
      <UpcomingTitle title={upcomingInfo.title} />

      <div className="flex justify-between max-desktop:flex-col">
        <div>
          <UpcomingVideo movie_id={upcomingInfo.id} />
          <UpcomingInfo
            movie_id={upcomingInfo.id}
            genre_ids={upcomingInfo.genre_ids}
            allGenre={allGenre}
          />
        </div>

        <div>
          <UpcomingOverview
            overview={upcomingInfo.overview}
            plusView={plusView}
            piusViewFunction={piusViewFunction}
          />
          {plusView || <hr className="my-6" />}
          {plusView || <UpcomingCredits movie_id={upcomingInfo.id} />}
        </div>
      </div>
    </div>
  );
}
