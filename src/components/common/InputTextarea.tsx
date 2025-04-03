import { useEffect, useState } from "react";
import sendIcon from "../../assets/icon/send.svg";
import sendBlueIcon from "../../assets/icon/sendBlue.svg";
import { commonAPI } from "../../api/common";
import { useAuth } from "../../api/Auth";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";
export default function InputTextarea({
  reviewOrArgumentOrOpinion,
  movieOrSeasonOrEpisode,
  contentId,
  stateLifting,
}: {
  reviewOrArgumentOrOpinion: "review" | "argument" | "opinion";
  movieOrSeasonOrEpisode: movieOrSeasonOrEpisodeType;
  contentId: string | number;
  stateLifting: () => void;
}) {
  const { language } = useLanguageStore();
  const t = menuTranslations[language];
  const [text, setText] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("");

  const { user } = useAuth();

  const write = async () => {
    if (text.length === 0) {
      alert("1글자 이상 입력해주세요");
      return;
    }
    if (!user?.id) return; // 사용자가 없으면 실행 안 함

    if (reviewOrArgumentOrOpinion === "review") {
      await commonAPI.postReview(
        String(contentId),
        text,
        user.id,
        movieOrSeasonOrEpisode
      );
      setText("");
    }
    if (reviewOrArgumentOrOpinion === "argument") {
      await commonAPI.postArgument(
        text,
        String(contentId),
        user.id,
        movieOrSeasonOrEpisode
      );
      setText("");
    }
    if (reviewOrArgumentOrOpinion === "opinion") {
      await commonAPI.postArgumentOpinion(
        Number(contentId),
        text,
        user.id,
        movieOrSeasonOrEpisode
      );
      setText("");
    }
    stateLifting();
  };

  useEffect(() => {
    text.trim() ? setIsSend(true) : setIsSend(false);
    if (reviewOrArgumentOrOpinion === "review") {
      setPlaceHolder(t.reviewPlaceholder);
    } else if (reviewOrArgumentOrOpinion === "argument") {
      setPlaceHolder(t.argumentPlaceholder);
    } else {
      setPlaceHolder(t.opinionPlaceholder);
    }
  }, [text]);
  return (
    <div className="flex justify-between mb-[30px] tablet:px-[30px] mobile:px-[10px]  tablet:h-[86px] mobile:h-[59px] border border-gray02 rounded-[10px]">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            write();
          }
        }}
        placeholder={placeHolder}
        className="outline-none w-full h-full pt-[31px] mobile:pt-[20px] bg-black tablet tablet:text-[20px] mobile:text-[16px] placeholder:text-gray03 text-gray03  resize-none"
      ></textarea>
      <button>
        <img
          onClick={() => {
            isSend ? write() : alert("한 글자 이상 입력하셔야 합니다.");
          }}
          src={isSend ? sendBlueIcon : sendIcon}
          alt="입력 전송 버튼"
          className="tablet:w-[26px] mobile:w-[16px]"
        />
      </button>
    </div>
  );
}
