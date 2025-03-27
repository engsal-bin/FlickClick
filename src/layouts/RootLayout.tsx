import { useState } from "react";
import Header from "../components/rootlayouts/Header";
import { Outlet } from "react-router";
import topButtonDefault from "../assets/icon/fixedButton/topButton_default.svg";
import topButtonHover from "../assets/icon/fixedButton/topButton_hover.svg";
import chatbotButtonDefault from "../assets/icon/fixedButton/chatbot_default.svg";
import chatbotButtonHover from "../assets/icon/fixedButton/chatbot_hover.svg";
import Chatbot from "../components/common/Chatbot";

export default function RootLayout() {
  const [topButtonImage, setTopButtonImage] = useState(topButtonDefault);
  const [chatbotButtonImage, setChatbotButtonImage] =
    useState(chatbotButtonDefault);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <Outlet />
      {/* 탑 버튼 */}
      <button onClick={scrollToTop}>
        <img
          src={topButtonImage}
          className="fixed bottom-[55px] right-[5px]"
          onMouseEnter={() => setTopButtonImage(topButtonHover)}
          onMouseLeave={() => setTopButtonImage(topButtonDefault)}
        />
      </button>

      {/* 챗봇 버튼 */}
      <button className="z-50">
        <img
          src={chatbotButtonImage}
          className="fixed bottom-[5px] right-[5px]"
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          onMouseEnter={() => setChatbotButtonImage(chatbotButtonHover)}
          onMouseLeave={() => setChatbotButtonImage(chatbotButtonDefault)}
        />
      </button>
      {/* 챗봇 */}
      <Chatbot
        isChatbotOpen={isChatbotOpen}
        setIschatbotOpen={setIsChatbotOpen}
      />
    </div>
  );
}
