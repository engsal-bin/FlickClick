import { useState } from "react";
import Notify from "../components/mypage/Notify";
import Review from "../components/mypage/Review";
import Tag from "../components/common/Tag";
import CreatedDiscuss from "../components/mypage/CreatedDiscuss";
import MyOpinion from "../components/mypage/MyOpinion";
import Season from "../components/mypage/Season";
import Episode from "../components/mypage/Episode";
import MovieContents from "../components/mypage/MovieContents";

export default function Mypage() {
  const [isClick, setIsClick] = useState("notify");
  const [discussType, setDiscussType] = useState("createdDiscuss");
  const [scrapType, setScrapType] = useState("season");

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
          }}>
          알림
        </div>
        <div
          className={`w-[150px] h-[60px] flex justify-center items-center cursor-pointer ${
            isClick === "review"
              ? "border-b-[2px] border-main text-main"
              : "hover:text-gray03"
          }`}
          onClick={() => {
            setIsClick(() => "review");
          }}>
          리뷰
        </div>
        <div
          className={`w-[150px] h-[60px] flex justify-center items-center cursor-pointer ${
            isClick === "discuss"
              ? "border-b-[2px] border-main text-main"
              : "hover:text-gray03"
          }`}
          onClick={() => {
            setIsClick(() => "discuss");
          }}>
          토론
        </div>
        <div
          className={`w-[150px] h-[60px] flex justify-center items-center cursor-pointer ${
            isClick === "scrap"
              ? "border-b-[2px] border-main text-main"
              : "hover:text-gray03"
          }`}
          onClick={() => {
            setIsClick(() => "scrap");
          }}>
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
            <Notify
              name={"내현"}
              content={"리뷰"}
              action={"댓글"}
              read={true}
            />
            <Notify
              name={"예빈"}
              content={"토론 글"}
              action={"의견"}
              read={false}
            />
          </div>
        )}
        {isClick === "review" && (
          <div>
            <Review
              content={"슬기로운 의사생활"}
              review={
                "재미도 감동도 잡은 최고의 드라마! 3번째 정주행 중인데 질리지가 않네요!"
              }
              date={"2025-01-02"}
            />
            <Review
              content={"위키드"}
              review={"마지막 엘피의 노래는 너무 감동적인!"}
              date={"2025-01-06"}
            />
          </div>
        )}
        {isClick === "discuss" && (
          <div>
            <div className="flex gap-[10px]">
              <Tag
                onClick={() => {
                  setDiscussType("createdDiscuss");
                }}
                isSelected={discussType === "createdDiscuss"}>
                생성한 토론
              </Tag>
              <Tag
                onClick={() => {
                  setDiscussType("myOpinion");
                }}
                isSelected={discussType === "myOpinion"}>
                내 의견
              </Tag>
            </div>
            <div className="mt-[30px]">
              {discussType === "createdDiscuss" && <CreatedDiscuss />}
              {discussType === "myOpinion" && <MyOpinion />}
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
                isSelected={scrapType === "season"}>
                시즌
              </Tag>
              <Tag
                onClick={() => {
                  setScrapType("episode");
                }}
                isSelected={scrapType === "episode"}>
                에피소드
              </Tag>
              <Tag
                onClick={() => {
                  setScrapType("movie");
                }}
                isSelected={scrapType === "movie"}>
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
