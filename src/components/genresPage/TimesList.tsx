import { useLanguageStore } from "../../store/useLanguageStore";

interface ToggleListProps {
  runtimeState: RuntimeRange[];
  onCheckboxChange: (id: number) => void;
}

export default function TimesList({
  runtimeState,
  onCheckboxChange,
}: ToggleListProps) {
  const { language } = useLanguageStore();
  return (
    <div
      className="w-[124px] flex flex-col justify-start items-start
      text-[13px] font-light gap-[10px]"
    >
      {runtimeState.map((time) => (
        <div className="flex justify-center items-center gap-[15px]">
          <input
            type="checkbox"
            id="2025-checkbox"
            checked={time.selected}
            onChange={() => onCheckboxChange(time.id)}
            className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer ${
              time.selected
                ? "bg-main border-white01"
                : "bg-black border-gray-400"
            } transition-colors ease-in-out`}
          />
          <label htmlFor="years-checkbox">
            {language === "ko" ? time.krKey : time.key}
          </label>
        </div>
      ))}
    </div>
  );
}
