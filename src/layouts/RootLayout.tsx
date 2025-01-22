import React, { useState } from "react";
import Header from "../components/rootlayouts/Header";
import { Outlet } from "react-router";
import topButtonDefault from "../assets/icon/fixedButton/topButton_default.svg";
import topButtonHover from "../assets/icon/fixedButton/topButton_hover.svg";
import chatbotButtonDefault from "../assets/icon/fixedButton/chatbot_default.svg";
import chatbotButtonHover from "../assets/icon/fixedButton/chatbot_hover.svg";

export default function RootLayout() {
  // 탑버튼 이미지 경로 상태
  const [topButtonImage, setTopButtonImage] = useState(topButtonDefault);
  // 챗봇버튼 이미지 경로 상태
  const [chatbotButtonImage, setChatbotButtonImage] =
    useState(chatbotButtonDefault);

  // 탑버튼 위로올라가기
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <Outlet />
      {/* 탑 버튼 */}
      <button onClick={scrollToTop}>
        <img
          src={topButtonImage}
          className="fixed bottom-[55px] right-[5px]"
          onMouseEnter={() => setTopButtonImage(topButtonHover)} // hover 시 이미지 변경
          onMouseLeave={() => setTopButtonImage(topButtonDefault)}
        />
      </button>
      {/* 챗봇 버튼 */}
      <button>
        <img
          src={chatbotButtonImage}
          className="fixed bottom-[5px] right-[5px] "
          onMouseEnter={() => setChatbotButtonImage(chatbotButtonHover)} // hover 시 이미지 변경
          onMouseLeave={() => setChatbotButtonImage(chatbotButtonDefault)}
        />
      </button>
    </div>
  );
}
