import { useEffect, useState } from "react";
import mainLogo from "../../assets/logo/mainlogo-img-only.svg";
import cancel from "../../assets/icon/tagCancelIcon.svg";
import send from "../../assets/icon/send.svg";

export default function Chatbot({
  isChatbotOpen,
  setIschatbotOpen,
}: {
  isChatbotOpen: boolean;
  setIschatbotOpen: (isOpen: boolean) => void;
}) {
  const [isChatbotMessageShown, setIsChatbotMessageShown] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [inputText, setInputText] = useState("");

  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    const userMessage: { sender: "user" | "bot"; text: string } = {
      sender: "user",
      text: inputText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    const loadingMessage = { sender: "bot" as const, text: "생각하는 중..." };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
      const ORGANIZATION_ID = import.meta.env.VITE_OPENAI_ORGANIZATION_ID;

      if (!API_KEY) {
        throw new Error("API 키가 설정되지 않았습니다.");
      }

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
            ...(ORGANIZATION_ID && { "OpenAI-Organization": ORGANIZATION_ID }),
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "너는 영화와 TV 시리즈에 대해 전문적인 지식을 가진 친절한 챗봇이야. 사용자의 질문에 대해 명확하고 유용한 답변을 제공해줘.",
              },
              { role: "user", content: inputText },
            ],
            max_tokens: 500,
            temperature: 0.7,
            presence_penalty: 0.6,
            frequency_penalty: 0.5,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API 응답 오류:", errorData);
        throw new Error(errorData.error?.message || "API 요청에 실패했습니다.");
      }

      const data = await response.json();

      if (!data.choices?.[0]?.message?.content) {
        throw new Error("응답 데이터 형식이 올바르지 않습니다.");
      }

      const botMessage = {
        sender: "bot" as const,
        text: data.choices[0].message.content,
      };

      setMessages((prev) => [...prev.slice(0, -1), botMessage]);
    } catch (error) {
      console.error("API 호출 오류:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          sender: "bot",
          text: `죄송합니다. 오류가 발생했습니다: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
        },
      ]);
    }
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
      }, 5000);
    }
  }, [isChatbotMessageShown]);

  useEffect(() => {
    setIsChatbotMessageShown(true);
  }, []);

  return (
    <>
      {/* 챗봇 안내 토스트 메시지 */}
      <div>
        {!isChatbotOpen && isChatbotMessageShown && (
          <div className="fixed bottom-[5px] right-[50px] w-auto px-[20px] h-[40px] bg-white bg-opacity-30 backdrop-blur-lg border-[3px] border-white border-opacity-30 shadow-lg flex items-center justify-center rounded-[30px] z-50 gap-[5px]">
            <p className="text-sm text-center text-white">
              챗봇을 열어서 질문을 입력하세요
            </p>
            <img
              src={mainLogo}
              alt="메인 로고"
              className="w-[28px] h-[28px] pt-1"
            />
          </div>
        )}
      </div>

      {/* 챗봇 UI */}
      {isChatbotOpen && (
        <div className="fixed bottom-[5px] right-[50px] w-[300px] h-[400px] bg-white bg-opacity-30 backdrop-blur-lg border border-white border-opacity-30 shadow-lg flex flex-col rounded-lg z-50">
          {/* 챗봇 헤더 */}
          <div className="text-white p-3 grid grid-cols-3 items-center rounded-lg">
            <div></div>
            <div className="flex-1 flex justify-center items-center">
              {[1, 1, 1].map((_) => (
                <img
                  src={mainLogo}
                  className="w-[17px] h-[13px] animate-spin"
                  alt="로고"
                />
              ))}
            </div>
            <div className="flex justify-end">
              <button onClick={() => setIschatbotOpen(false)}>
                <img src={cancel} alt="챗봇 닫기" />
              </button>
            </div>
          </div>

          {/* 챗봇 메시지 영역 */}
          <div className="flex-1 p-2 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded-md text-sm max-w-[80%] break-words whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-main text-white self-end ml-auto"
                    : "bg-gray-200 text-black self-start mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* 입력창 */}
          <div className="py-1 px-2 flex h-[30px]  m-2 rounded-[10px] bg-white">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              className="flex-1 focus:outline-none bg-transparen text-[14px] placeholder:text-gray-400"
              placeholder="ex) 영화 추천해줘"
            />
            <button onClick={sendMessage}>
              <img src={send} alt="전송" className="w-[15px] h-[15px]" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
