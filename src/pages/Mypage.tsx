import { getClipsByUId, getReviewsByUId } from "../api/mypageInfo";
import { useEffect, useState } from "react";

import DiscussTab from "../components/mypage/DiscussTab";
import NotifyTab from "../components/mypage/NotifyTab";
import Review from "../components/mypage/Review";
import ScrapTab from "../components/mypage/ScrapTab";
import TabMenu from "../components/mypage/TabMenu";
import { useAuth } from "../api/Auth";
import { useLocation } from "react-router-dom";

export default function Mypage() {
  const { user } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedTab = searchParams.get("tab") || "notify";

  const [reviews, setReviews] = useState<Review[] | null>([]);
  const [clips, setClips] = useState<SavedClips[] | null>([]);
  const [seasonClips, setSeasonClips] = useState<SavedClips[] | null>([]);
  const [episodeClips, setEpisodeClips] = useState<SavedClips[] | null>([]);
  const [movieClips, setMovieClips] = useState<SavedClips[] | null>([]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      if (selectedTab === "review") {
        const reviewsData = await getReviewsByUId(user.id);
        setReviews(reviewsData || []);
      } else if (selectedTab === "scrap") {
        const fetchedClips = await getClipsByUId(user.id);
        setClips(fetchedClips || []);
      }
    };

    fetchData();
  }, [selectedTab, user]);

  useEffect(() => {
    if (!clips?.length) return;
    setSeasonClips(clips.filter((clip) => clip.ip_type === "season"));
    setEpisodeClips(clips.filter((clip) => clip.ip_type === "episode"));
    setMovieClips(clips.filter((clip) => clip.ip_type === "movie"));
  }, [clips]);

  return ( 
    <div className="w-full y-full flex-1 pt-[100px] tablet:px-[50px] mobile:pt-0 mobile:px-[10px] text-gray01">
      <TabMenu selectedTab={selectedTab} />
      <div className="mt-[30px]">
        {selectedTab === "notify" && <NotifyTab userId={user?.id} />}
        {selectedTab === "review" &&
          reviews?.map((review) => (
            <Review key={review.review_id} {...review} />
          ))}
        {selectedTab === "discuss" && <DiscussTab userId={user?.id} />}
        {selectedTab === "scrap" && (
          <ScrapTab
            seasonClips={seasonClips}
            episodeClips={episodeClips}
            movieClips={movieClips}
          />
        )}
      </div>
    </div>
  );
}
