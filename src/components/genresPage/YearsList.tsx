import { useLanguageStore } from "../../store/useLanguageStore";

interface ToggleListProps {
  yearStates: YearState[];
  onCheckboxChange: (id: number) => void;
}

export default function YearsList({
  yearStates,
  onCheckboxChange,
}: ToggleListProps) {
  const { language } = useLanguageStore();

  return (
    <div className="w-[124px] flex flex-col justify-start items-start text-[13px] font-light gap-[10px]">
      {yearStates.map((year) => {
        const checkboxId = `${year.id}-checkbox`;

        return (
          <div
            key={checkboxId}
            className="flex justify-center items-center gap-[15px]"
          >
            <input
              type="checkbox"
              id={checkboxId}
              checked={year.selected}
              onChange={() => onCheckboxChange(year.id)}
              className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer ${
                year.selected
                  ? "bg-main border-white01"
                  : "bg-black border-gray-400"
              } transition-colors ease-in-out`}
            />
            <label htmlFor={checkboxId}>
              {language === "ko" ? year.krKey : year.key}
            </label>
          </div>
        );
      })}
    </div>
  );
}
