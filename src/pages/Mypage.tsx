import {
  getArgumentsCommentedByUId,
  getArgumentsCreatedByUserId,
  getClipsByUId,
  getReviewsByUId,
} from "../api/mypageInfo";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CreatedDiscuss from "../components/mypage/CreatedDiscuss";
import MyOpinion from "../components/mypage/MyOpinion";
import Notify from "../components/mypage/Notify";
import Review from "../components/mypage/Review";
import ScrapEpisode from "../components/mypage/ScrapEpisode";
import ScrapMovie from "../components/mypage/ScrapMovie";
import ScrapSeason from "../components/mypage/ScrapSeason";
import Tag from "../components/common/Tag";
import { useAuth } from "../api/Auth";

export default function Mypage() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const selectedTab = searchParams.get("tab") || "notify";

  const [discussType, setDiscussType] = useState("createdDiscuss");
  const [scrapType, setScrapType] = useState("season");
  const [reviews, setReviews] = useState<Review[] | null>([]);
  const [discusses, setDiscusses] = useState<Argument[] | null>([]);
  const [myOpinions, setMyOpinions] = useState<ArgumentComment[] | null>([]);
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
      } else if (selectedTab === "discuss") {
        const discussesData = await getArgumentsCreatedByUserId(user.id);
        setDiscusses(discussesData || []);
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
      <div className="hidden tablet:flex flex-row border-b-[1px] border-gray01">
        {["notify", "review", "discuss", "scrap"].map((tab) => (
          <div
            key={tab}
            className={`w-[150px] h-[60px] flex justify-center items-center cursor-pointer ${
              selectedTab === tab
                ? "border-b-[2px] border-main text-main"
                : "hover:text-gray03"
            }`}
            onClick={() => navigate(`?tab=${tab}`)}
          >
            {tab === "notify"
              ? "알림"
              : tab === "review"
              ? "리뷰"
              : tab === "discuss"
              ? "토론"
              : "스크랩"}
          </div>
        ))}
      </div>
      <div className="mt-[30px]">
        {selectedTab === "notify" && (
          <Notify name={"송원"} content={"리뷰"} action={"댓글"} read={true} />
        )}
        {selectedTab === "review" &&
          reviews?.map((review) => (
            <Review key={review.review_id} {...review} />
          ))}
        {selectedTab === "discuss" && (
          <div>
            <div className="flex gap-[10px]">
              <Tag
                onClick={() => setDiscussType("createdDiscuss")}
                isSelected={discussType === "createdDiscuss"}
              >
                생성한 토론
              </Tag>
              <Tag
                onClick={async () => {
                  setDiscussType("myOpinion");
                  if (user) {
                    const opinions = await getArgumentsCommentedByUId(user.id);
                    setMyOpinions(opinions || []);
                  }
                }}
                isSelected={discussType === "myOpinion"}
              >
                내 의견
              </Tag>
            </div>
            <div className="mt-[30px]">
              {discussType === "createdDiscuss" && (
                <CreatedDiscuss discusses={discusses} />
              )}
              {discussType === "myOpinion" && (
                <MyOpinion myOpinions={myOpinions} />
              )}
            </div>
          </div>
        )}
        {selectedTab === "scrap" && (
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
              {scrapType === "season" && (
                <ScrapSeason seasonClips={seasonClips} />
              )}
              {scrapType === "episode" && (
                <ScrapEpisode episodeClips={episodeClips} />
              )}
              {scrapType === "movie" && <ScrapMovie movieClips={movieClips} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
