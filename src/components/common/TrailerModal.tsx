import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function TrailerModal() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const key = searchParams.get("play");

  // 모달이 열릴 때 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden"; // 스크롤 방지
    return () => {
      document.body.style.overflow = "auto"; // 언마운트 시 복원
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={() => navigate(-1)} // 배경 클릭 시 닫기
    >
      <div
        className="relative w-[90%] max-w-[1024px] h-[60vh] sm:h-[80vh] bg-black shadow-lg rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute text-2xl text-white top-4 right-4"
        >
          ✖
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${key}`}
          className="w-full h-full"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
