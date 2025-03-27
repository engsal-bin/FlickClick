import React from "react";
import OttIcon from "../OttIcon";
import { OttState } from "../../type/seriesType";

// ott 로고
import appleTv from "../../assets/icon/ottIcon/appleTV.svg";
import googlePlay from "../../assets/icon/ottIcon/googlePlay.svg";
import disneyPlus from "../../assets/icon/ottIcon/disneyPlus.svg";
import watcha from "../../assets/icon/ottIcon/watcha.svg";
import primeVideo from "../../assets/icon/ottIcon/primeVideo.svg";
import netflix from "../../assets/icon/ottIcon/netflix.svg";
import wavve from "../../assets/icon/ottIcon/wavve.svg";

interface OttIconsProps {
  ottStates: OttState[];
  setOttStates: React.Dispatch<React.SetStateAction<OttState[]>>;
}

// (임시) OTT서비스 데이터
const ottServices = [
  { key: "appleTv", src: appleTv, alt: "Apple TV" },
  { key: "googlePlay", src: googlePlay, alt: "Google Play" },
  { key: "disneyPlus", src: disneyPlus, alt: "Disney Plus" },
  { key: "watcha", src: watcha, alt: "Watcha" },
  { key: "primeVideo", src: primeVideo, alt: "Prime Video" },
  { key: "netflix", src: netflix, alt: "Netflix" },
  { key: "wavve", src: wavve, alt: "Wavve" },
];

export default function OttIcons({ ottStates, setOttStates }: OttIconsProps) {
  // ott 선택 상태 변경 함수
  const selectOtt = (id: number) => {
    setOttStates((prev) =>
      prev.map((service) =>
        service.id === id
          ? { ...service, selected: !service.selected }
          : service
      )
    );
  };

  return (
    <div className="w-[124px] flex flex-wrap gap-[15px]">
      {/* ott서비스 아이콘 */}
      {ottStates.map((service) => (
        <OttIcon
          key={service.key}
          src={service.src}
          isSelected={service.selected}
          onClick={() => selectOtt(service.id)}
          alt={service.alt}
        />
      ))}
    </div>
  );
}
