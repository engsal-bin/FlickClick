import { useState, useRef } from "react";
import { useLanguageStore } from "../../store/useLanguageStore";

interface MediaListProps {
  typeState: TypeState[];
  onCheckboxChange: (id: number) => void;
}

export default function TypeList({
  typeState,
  onCheckboxChange,
}: MediaListProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguageStore();

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

  const stopDragging = () => setIsDragging(false);

  return (
    <div className="flex flex-col gap-[10px]">
      <div
        ref={containerRef}
        className="flex flex-col gap-[15px] overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing whitespace-nowrap min-w-max"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {typeState.map((item) => (
          <div className="flex items-center gap-[15px]" key={item.id}>
            <input
              type="checkbox"
              id={`${item.id}-checkbox`}
              checked={item.selected}
              onChange={() => onCheckboxChange(item.id)}
              className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer ${
                item.selected
                  ? "bg-main border-white01"
                  : "bg-black border-gray-400"
              } transition-colors ease-in-out`}
            />
            <label htmlFor={`${item.id}-checkbox`} className="text-[13px]">
              {language === "ko" ? item.krKey : item.key}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
