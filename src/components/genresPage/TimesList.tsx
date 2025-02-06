type CheckedState = {
  [key: string]: boolean;
};

interface ToggleListProps {
  checked: CheckedState;
  onCheckboxChange: (key: string) => void;
}

export default function TimesList({
  checked,
  onCheckboxChange,
}: ToggleListProps) {
  return (
    <div
      className="w-[124px] flex flex-col justify-start items-start
      text-[13px] font-light gap-[10px]"
    >
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="2025-checkbox"
          checked={checked["15분 이하"]}
          onChange={() => onCheckboxChange("15분 이하")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer ${
            checked["15분 이하"]
              ? "bg-main border-white01"
              : "bg-black border-gray-400"
          } transition-colors ease-in-out`}
        />
        <label htmlFor="years-checkbox">15분 이하</label>
      </div>
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="2025-checkbox"
          checked={checked["15~30분"]}
          onChange={() => onCheckboxChange("15~30분")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer ${
            checked["15~30분"]
              ? "bg-main border-white01"
              : "bg-black border-gray-400"
          } transition-colors ease-in-out`}
        />
        <label htmlFor="years-checkbox">15~30분</label>
      </div>
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="2025-checkbox"
          checked={checked["30~60분"]}
          onChange={() => onCheckboxChange("30~60분")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer ${
            checked["30~60분"]
              ? "bg-main border-white01"
              : "bg-black border-gray-400"
          } transition-colors ease-in-out`}
        />
        <label htmlFor="years-checkbox">30~60분</label>
      </div>
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="2025-checkbox"
          checked={checked["60~90분"]}
          onChange={() => onCheckboxChange("60~90분")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer ${
            checked["60~90분"]
              ? "bg-main border-white01"
              : "bg-black border-gray-400"
          } transition-colors ease-in-out`}
        />
        <label htmlFor="years-checkbox">60~90분</label>
      </div>
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="2025-checkbox"
          checked={checked["90~120분"]}
          onChange={() => onCheckboxChange("90~120분")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer ${
            checked["90~120분"]
              ? "bg-main border-white01"
              : "bg-black border-gray-400"
          } transition-colors ease-in-out`}
        />
        <label htmlFor="years-checkbox">90~120분</label>
      </div>
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="2025-checkbox"
          checked={checked["120분 이상"]}
          onChange={() => onCheckboxChange("120분 이상")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer ${
            checked["120분 이상"]
              ? "bg-main border-white01"
              : "bg-black border-gray-400"
          } transition-colors ease-in-out`}
        />
        <label htmlFor="years-checkbox">120분 이상</label>
      </div>
    </div>
  );
}
