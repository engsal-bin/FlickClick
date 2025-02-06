import { useEffect, useState } from "react";

import { movieAPI } from "../api/movie";
import UpcomingVideo from "../components/upcoming/UpcomingVideo";
import UpcomingOverview from "../components/upcoming/UpcomingOverview";
import UpcomingCredits from "../components/upcoming/UpcomingCredits";

export default function Upcoming() {
  const [upcomingImgSrc, setUpcomingImgSrc] = useState<{}[]>([]);
  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const upcoming = await movieAPI.getUpComingMovie();

        setUpcomingImgSrc(upcoming.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    fetchUpcomingMovies();
  }, []);
  console.log(upcomingImgSrc);

  return (
    <div className="h-[596px] w-[1180px] border border-white">
      <h2 className="text-white">히트맨2</h2>
      <div className="flex">
        <UpcomingVideo />
        <div>
          <UpcomingOverview />
          <hr className="my-6" />
          <UpcomingCredits />
        </div>
      </div>
    </div>
  );
}
