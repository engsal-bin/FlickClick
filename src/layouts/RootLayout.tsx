import { useEffect, useState } from "react";
import Header from "../components/rootlayouts/Header";
import { Outlet } from "react-router";
import topButtonDefault from "../assets/icon/fixedButton/topButton_default.svg";
import topButtonHover from "../assets/icon/fixedButton/topButton_hover.svg";
import chatbotButtonDefault from "../assets/icon/fixedButton/chatbot_default.svg";
import chatbotButtonHover from "../assets/icon/fixedButton/chatbot_hover.svg";
import mainLogo from "../assets/logo/mainlogo-img-only.svg";

export default function RootLayout() {
  const [topButtonImage, setTopButtonImage] = useState(topButtonDefault);
  const [chatbotButtonImage, setChatbotButtonImage] =
    useState(chatbotButtonDefault);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isChatbotMessageShown, setIsChatbotMessageShown] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const userMessage: { sender: "user" | "bot"; text: string } = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage: { sender: "user" | "bot"; text: string } = { sender: "bot", text: `안녕하세요! "${inputText}"에 대해 도와드릴까요?` };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInputText("");
  };

  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      sendMessage();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  useEffect(() => {
    if (isChatbotMessageShown) {
      setTimeout(() => {
        setIsChatbotMessageShown(false);
      }, 5000);}
  }, [isChatbotMessageShown]);

  useEffect(() => {
    setIsChatbotMessageShown(true);
  }, []);

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

      {/* 챗봇 안내 메시지 */}
      <div>
        {!isChatbotOpen && isChatbotMessageShown && (
          <div className="fixed bottom-[5px] right-[50px] w-auto px-[20px] h-[40px] bg-white bg-opacity-30 backdrop-blur-lg border border-[3px] border-white border-opacity-30 shadow-lg flex items-center justify-center rounded-[30px] z-50 gap-[5px]">
            <p className="text-sm text-center text-white">챗봇을 열어서 질문을 입력하세요</p>
            <img src={mainLogo} alt="메인 로고" className="w-[28px] h-[28px] pt-1" />
          </div>
        )
        }
      </div>

      {/* 챗봇 UI (글래스 모피즘 스타일 적용) */}
      {isChatbotOpen && (
        <div className="fixed bottom-[5px] right-[50px] w-[300px] h-[400px] bg-white bg-opacity-30 backdrop-blur-lg border border-white border-opacity-30 shadow-lg flex flex-col rounded-lg z-50">
          {/* 챗봇 헤더 */}
          <div className="bg-gray-800 text-white p-3 flex justify-between rounded-lg">
            <span>챗봇</span>
            <button onClick={() => setIsChatbotOpen(false)}>X</button>
          </div>

          {/* 챗봇 메시지 영역 */}
          <div className="flex-1 p-2 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded-md text-sm ${
                  msg.sender === "user" ? "bg-main text-white self-end" : "bg-gray-200 text-black self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* 입력창 */}
          <div className="p-2 border-t flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              className="flex-1 p-2 border rounded-md focus:outline-none"
              placeholder="메시지를 입력하세요..."
            />
            <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md">
              전송
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
