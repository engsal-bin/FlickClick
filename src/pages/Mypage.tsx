import {
  getArgumentsCommentedByUId,
  getArgumentsCreatedByUserId,
  getClipsByUId,
  getReviewsByUId,
} from "../api/mypageInfo";

import CreatedDiscuss from "../components/mypage/CreatedDiscuss";
import Episode from "../components/mypage/Episode";
import MovieContents from "../components/mypage/MovieContents";
import MyOpinion from "../components/mypage/MyOpinion";
import Notify from "../components/mypage/Notify";
import Review from "../components/mypage/Review";
import Season from "../components/mypage/Season";
import Tag from "../components/common/Tag";
import { useState } from "react";

export default function Mypage() {
  const [isClick, setIsClick] = useState("notify");
  const [discussType, setDiscussType] = useState("createdDiscuss");
  const [scrapType, setScrapType] = useState("season");

  const [reviews, setReviews] = useState([]);
  const [discusses, setDiscusses] = useState([]);
  const [myOpinions, setMyOpinions] = useState([]);
  const [clips, setClips] = useState([]);

  // 리뷰
  const userId = "ce0845a8-ac83-425b-af3f-cb534ac52d09"; // 더미 데이터 만들어 놓은 테스트 계정
  const onClickReviewTab = async () => {
    setIsClick("review");
    await getReviewsByUId(userId).then((reviews) => {
      console.log(reviews);
      setReviews(reviews);
    });
  };

  // 불러올 수가 없는 애러 왜지?
  const onClickDiscussTab = async () => {
    setIsClick("discuss");
    await getArgumentsCreatedByUserId(userId).then((discusses) => {
      console.log(discusses);
      setDiscusses(discusses);
    });
  };

  const onClickMyOpinionTag = async () => {
    setDiscussType("myOpinion");
    await getArgumentsCommentedByUId(userId).then((myOpinions) => {
      console.log(myOpinions);
      setMyOpinions(myOpinions);
    });
  };

  const onClickScrapTab = async () => {
    setIsClick("scrap");
    await getClipsByUId(userId).then((clips) => {
      console.log(clips);
      setClips(clips);
    });
  };

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
        {isClick === "review" && (
          <div>
            {reviews.map((review) => (
              <Review
                key={review.id}
                review_id={review.id}
                ip_name={review.ip_name}
                ip_id={review.ip_id}
                ip_type={review.ip_type}
                content={review.content}
                created_at={review.created_at}
              />
            ))}
          </div>
        )}
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
              {discussType === "createdDiscuss" && <CreatedDiscuss />}
              {discussType === "myOpinion" && (
                <MyOpinion myOpinions={myOpinions} />
              )}
            </div>
          </div>
        )}
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
              {scrapType === "season" && <Season />}
              {scrapType === "episode" && <Episode />}
              {scrapType === "movie" && <MovieContents />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
