import { useEffect, useState } from "react";
import sendIcon from "../../assets/icon/send.svg";
import sendBlueIcon from "../../assets/icon/sendBlue.svg";
import { commonAPI } from "../../api/common";
export default function InputTextarea({
  reviewOrArgumentOrOpinion,
}: {
  reviewOrArgumentOrOpinion: "review" | "argument" | "opinion";
}) {
  const [text, setText] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("");

  const fn = async () => {
    if (reviewOrArgumentOrOpinion === "review") {
      await commonAPI.postReview(
        "m",
        text,
        "1be395d3-dd4b-4c68-b90e-738583c1f0e4",
        "Movie",
        "movie"
      );
      await commonAPI.postReview(
        "e",
        text,
        "1be395d3-dd4b-4c68-b90e-738583c1f0e4",
        "Episode",
        "episode"
      );
    }
    if (reviewOrArgumentOrOpinion === "argument") {
      await commonAPI.postArgument(
        text,
        "m",
        "1be395d3-dd4b-4c68-b90e-738583c1f0e4",
        "Movie",
        "movie"
      );
      await commonAPI.postArgument(
        text,
        "e",
        "1be395d3-dd4b-4c68-b90e-738583c1f0e4",
        "Episode",
        "episode"
      );
      await commonAPI.postArgument(
        text,
        "s",
        "1be395d3-dd4b-4c68-b90e-738583c1f0e4",
        "Season",
        "season"
      );
    }
    if (reviewOrArgumentOrOpinion === "opinion") {
    }
  };

  useEffect(() => {
    text ? setIsSend(true) : setIsSend(false);
    if (reviewOrArgumentOrOpinion === "review") {
      setPlaceHolder("리뷰를 입력해주세요");
    } else if (reviewOrArgumentOrOpinion === "argument") {
      setPlaceHolder("토론 주제를 입력하다!");
    } else {
      setPlaceHolder("의견를 입력하세요");
    }
  }, [text]);
  return (
    <div className="flex justify-between mb-[30px] tablet:px-[30px] mobile:px-[10px]  tablet:h-[86px] mobile:h-[59px] border border-gray02 rounded-[10px]">
      <textarea
        onChange={(e) => setText(e.target.value)}
        placeholder={placeHolder}
        className="outline-none w-full h-full pt-[31px] mobile:pt-[20px] bg-black tablet tablet:text-[20px] mobile:text-[16px] placeholder:text-gray03 text-gray03  resize-none"
      ></textarea>
      <button>
        <img
          onClick={() => {
            fn();
          }}
          src={isSend ? sendBlueIcon : sendIcon}
          alt="입력 전송 버튼"
          className="tablet:w-[26px] mobile:w-[16px]"
        />
      </button>
    </div>
  );
}
