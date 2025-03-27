import { useState, useRef, useEffect } from "react";
import type { CheckedState } from "../../type/seriesType";

interface MediaListProps {
  checked: CheckedState;
  onCheckboxChange: (key: string) => void;
}

export default function MediaList({ checked, onCheckboxChange }: MediaListProps) {
  // 스와이퍼 상태 관리
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="text-[16px]">미디어 타입</div>
      <div
        ref={containerRef}
        className="flex gap-[15px] overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing whitespace-nowrap min-w-max"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex justify-start items-center gap-[15px]">
          <input
            type="checkbox"
            id="series-checkbox"
            checked={checked.series}
            onChange={() => onCheckboxChange("series")}
            className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer ${
              checked.series
                ? "bg-main border-white01"
                : "bg-black border-gray-400"
            } transition-colors ease-in-out`}
          />
          <label htmlFor="series-checkbox" className="text-[13px]">
            시리즈
          </label>
        </div>
        <div className="flex items-center gap-[15px]">
          <input
            type="checkbox"
            id="movies-checkbox"
            checked={checked.movies}
            onChange={() => onCheckboxChange("movies")}
            className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer ${
              checked.movies
                ? "bg-main border-white01"
                : "bg-black border-gray-400"
            } transition-colors ease-in-out`}
          />
          <label htmlFor="movies-checkbox" className="text-[13px]">
            영화
          </label>
        </div>
      </div>
    </div>
  );
}
