import {
  getArgumentsCommentedByUId,
  getArgumentsCreatedByUserId,
  getClipsByUId,
  getReviewsByUId,
} from "../api/mypageInfo";
import { useEffect, useState } from "react";

import CreatedDiscuss from "../components/mypage/CreatedDiscuss";
import MyOpinion from "../components/mypage/MyOpinion";
import Notify from "../components/mypage/Notify";
import Review from "../components/mypage/Review";
import ScrapEpisode from "../components/mypage/ScrapEpisode";
import ScrapMovie from "../components/mypage/ScrapMovie";
import ScrapSeason from "../components/mypage/ScrapSeason";
import Tag from "../components/common/Tag";
import { useAuth } from "../api/Auth";

// import { useNavigate } from "react-router-dom";
export default function Mypage() {
  const [isClick, setIsClick] = useState("notify");
  const [discussType, setDiscussType] = useState("createdDiscuss");
  const [scrapType, setScrapType] = useState("season");
  const [reviews, setReviews] = useState<Review[] | null>([]);
  const [discusses, setDiscusses] = useState<Argument[] | null>([]);
  const [myOpinions, setMyOpinions] = useState<ArgumentComment[] | null>([]);
  const [clips, setClips] = useState<SavedClips[] | null>([]);
  const [seasonClips, setSeasonClips] = useState<SavedClips[] | null>([]);
  const [episodeClips, setEpisodeClips] = useState<SavedClips[] | null>([]);
  const [movieClips, setMovieClips] = useState<SavedClips[] | null>([]);

  const { user } = useAuth();
  
  const onClickReviewTab = async () => {
    setIsClick("review");
    if (user) {
      await getReviewsByUId(user.id).then((reviews) => {
        console.log(reviews);
        setReviews(reviews);
      });
    }
  };

  const onClickDiscussTab = async () => {
    setIsClick("discuss");
    setDiscussType("createdDiscuss");
    if (user) {
      await getArgumentsCreatedByUserId(user.id).then((discusses) => {
        console.log(discusses);
        setDiscusses(discusses || []);
      });
    }
  };

  const onClickMyOpinionTag = async () => {
    setDiscussType("myOpinion");
    if (user) {
      await getArgumentsCommentedByUId(user.id).then(
        (myOpinions: ArgumentComment[] | null) => {
          console.log(myOpinions);
          setMyOpinions(myOpinions);
        }
      );
    }
  };

  const onClickScrapTab = async () => {
    setIsClick("scrap");
    if (user?.id) {
      const fetchedClips = await getClipsByUId(user.id);
      console.log(fetchedClips);
      setClips(fetchedClips || []);
    }
  };

  useEffect(() => {
    if (!clips) return;
    if (user?.id) {
      setSeasonClips(
        clips
          .filter((clip) => clip.ip_type === "season")
          .map((clip) => {
            const { ...rest } = clip;
            delete rest.upstream_ip_name;
            return rest;
          })
      );
      setEpisodeClips(clips.filter((clip) => clip.ip_type === "episode"));
      setMovieClips(
        clips
          .filter((clip) => clip.ip_type === "movie")
          .map((clip) => {
            const { ...rest } = clip;
            delete rest.upstream_ip_name;
            return rest;
          })
      );
    }
  }, [clips]);

  

  return (
    <div className="w-full y-full flex-1 pt-[100px] tablet:px-[50px] mobile:pt-0 mobile:px-[10px] text-gray01">
      <div className="hidden tablet:flex flex-row border-b-[1px] border-gray01">
        <div
          className={`w-[150px] h-[60px] flex justify-center items-center cursor-pointer ${
            isClick === "notify"
              ? "border-b-[2px] border-main text-main"
              : "hover:text-gray03"
          }`}
          onClick={() => {
            setIsClick(() => "notify");
          }}
        >
          알림
        </div>
        <div
          className={`w-[150px] h-[60px] flex justify-center items-center cursor-pointer ${
            isClick === "review"
              ? "border-b-[2px] border-main text-main"
              : "hover:text-gray03"
          }`}
          onClick={onClickReviewTab}
        >
          리뷰
        </div>
        <div
          className={`w-[150px] h-[60px] flex justify-center items-center cursor-pointer ${
            isClick === "discuss"
              ? "border-b-[2px] border-main text-main"
              : "hover:text-gray03"
          }`}
          onClick={onClickDiscussTab}
        >
          토론
        </div>
        <div
          className={`w-[150px] h-[60px] flex justify-center items-center cursor-pointer ${
            isClick === "scrap"
              ? "border-b-[2px] border-main text-main"
              : "hover:text-gray03"
          }`}
          onClick={onClickScrapTab}
        >
          스크랩
        </div>
      </div>
      <div className="mt-[30px]">
        {/* 알림 */}
        {isClick === "notify" && (
          <div className="flex flex-col gap-[30px] ">
            <Notify
              name={"송원"}
              content={"리뷰"}
              action={"댓글"}
              read={true}
            />
          </div>
        )}
        {/* 리뷰 */}
        {isClick === "review" && (
          <div>
            {reviews?.map((review) => (
              <Review
                key={review.review_id}
                review_id={review.review_id}
                ip_name={review.ip_name}
                ip_id={review.ip_id}
                content={review.content}
                created_at={review.created_at}
              />
            ))}
          </div>
        )}
        {/* 토론 */}
        {isClick === "discuss" && (
          <div>
            <div className="flex gap-[10px]">
              <Tag
                onClick={onClickDiscussTab}
                isSelected={discussType === "createdDiscuss"}
              >
                생성한 토론
              </Tag>
              <Tag
                onClick={onClickMyOpinionTag}
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
        {/* 스크랩 */}
        {isClick === "scrap" && (
          <div>
            <div className="flex gap-[10px]">
              <Tag
                onClick={() => {
                  setScrapType("season");
                }}
                isSelected={scrapType === "season"}
              >
                시즌
              </Tag>
              <Tag
                onClick={() => {
                  setScrapType("episode");
                }}
                isSelected={scrapType === "episode"}
              >
                에피소드
              </Tag>
              <Tag
                onClick={() => {
                  setScrapType("movie");
                }}
                isSelected={scrapType === "movie"}
              >
                영화
              </Tag>
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
