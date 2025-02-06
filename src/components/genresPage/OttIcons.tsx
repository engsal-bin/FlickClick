import React, { useState } from "react";
import OttIcon from "../OttIcon";

// ott 로고
import appleTv from "../../assets/icon/ottIcon/appleTV.svg";
import googlePlay from "../../assets/icon/ottIcon/googlePlay.svg";
import disneyPlus from "../../assets/icon/ottIcon/disneyPlus.svg";
import watcha from "../../assets/icon/ottIcon/watcha.svg";
import primeVideo from "../../assets/icon/ottIcon/primeVideo.svg";
import netflix from "../../assets/icon/ottIcon/netflix.svg";
import wavve from "../../assets/icon/ottIcon/wavve.svg";

type OttState = {
  [key: string]: boolean;
};

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

export default function OttIcons() {
  // ott 선택 상태 관리
  const [ottSelect, setOttSelect] = useState<OttState>({
    appleTv: false,
    googlePlay: false,
    disneyPlus: false,
    watcha: false,
    primeVideo: false,
    netflix: false,
    wavve: false,
  });

  // ott 선택 상태 변경 함수
  const selectOtt = (key: string) => {
    setOttSelect((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-[124px] flex flex-wrap gap-[15px]">
      {/* ott서비스 아이콘 */}
      {ottServices.map((service) => (
        <OttIcon
          key={service.key}
          src={service.src}
          isSelected={ottSelect[service.key]}
          onClick={() => selectOtt(service.key)}
          alt={service.alt}
        />
      ))}
    </div>
  );
}
