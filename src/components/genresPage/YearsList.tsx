type CheckedState = {
  [key: string]: boolean;
};

interface ToggleListProps {
  checked: CheckedState;
  onCheckboxChange: (key: string) => void;
}

export default function YearsList({
  checked,
  onCheckboxChange,
}: ToggleListProps) {
  return (
    <div
      className="w-[124px] flex flex-col justify-start items-start
     text-[13px] font-light gap-[10px]">
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="2025-checkbox"
          checked={checked["2025년"]}
          onChange={() => onCheckboxChange("2025년")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer relative ${
            checked["2025년"]
              ? "bg-main border-none"
              : "bg-black border-gray-400"
          } transition-colors ease-in-out after:content-[''] after:absolute after:left-[5px] after:top-[2px]
            after:w-[6px] after:h-[10px] after:border-white
            after:border-r-2 after:border-b-2 after:rotate-45
            ${checked["2025년"] ? "after:block" : "after:hidden"}`}
        />
        <label htmlFor="years-checkbox">2025년</label>
      </div>
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="2025-checkbox"
          checked={checked["2024년"]}
          onChange={() => onCheckboxChange("2024년")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer relative ${
            checked["2024년"]
              ? "bg-main border-none"
              : "bg-black border-gray-400"
          } transition-colors ease-in-out after:content-[''] after:absolute after:left-[5px] after:top-[2px]
            after:w-[6px] after:h-[10px] after:border-white
            after:border-r-2 after:border-b-2 after:rotate-45
            ${checked["2024년"] ? "after:block" : "after:hidden"}`}
        />
        <label htmlFor="years-checkbox">2024년</label>
      </div>
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="2025-checkbox"
          checked={checked["2023년"]}
          onChange={() => onCheckboxChange("2023년")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer relative ${
            checked["2023년"]
              ? "bg-main border-none"
              : "bg-black border-gray-400"
          } transition-colors ease-in-out after:content-[''] after:absolute after:left-[5px] after:top-[2px]
            after:w-[6px] after:h-[10px] after:border-white
            after:border-r-2 after:border-b-2 after:rotate-45
            ${checked["2023년"] ? "after:block" : "after:hidden"}`}
        />
        <label htmlFor="years-checkbox">2023년</label>
      </div>
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="2025-checkbox"
          checked={checked["2022년"]}
          onChange={() => onCheckboxChange("2022년")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer relative ${
            checked["2022년"]
              ? "bg-main border-none"
              : "bg-black border-gray-400"
          } transition-colors ease-in-out after:content-[''] after:absolute after:left-[5px] after:top-[2px]
            after:w-[6px] after:h-[10px] after:border-white
            after:border-r-2 after:border-b-2 after:rotate-45
            ${checked["2022년"] ? "after:block" : "after:hidden"}`}
        />
        <label htmlFor="years-checkbox">2022년</label>
      </div>
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="2025-checkbox"
          checked={checked["2021년"]}
          onChange={() => onCheckboxChange("2021년")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer relative ${
            checked["2021년"]
              ? "bg-main border-none"
              : "bg-black border-gray-400"
          } transition-colors ease-in-out after:content-[''] after:absolute after:left-[5px] after:top-[2px]
            after:w-[6px] after:h-[10px] after:border-white
            after:border-r-2 after:border-b-2 after:rotate-45
            ${checked["2021년"] ? "after:block" : "after:hidden"}`}
        />
        <label htmlFor="years-checkbox">2021년</label>
      </div>
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="2025-checkbox"
          checked={checked["2020년"]}
          onChange={() => onCheckboxChange("2020년")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer relative ${
            checked["2020년"]
              ? "bg-main border-none"
              : "bg-black border-gray-400"
          } transition-colors ease-in-out after:content-[''] after:absolute after:left-[5px] after:top-[2px]
            after:w-[6px] after:h-[10px] after:border-white
            after:border-r-2 after:border-b-2 after:rotate-45
            ${checked["2020년"] ? "after:block" : "after:hidden"}`}
        />
        <label htmlFor="years-checkbox">2020년</label>
      </div>
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="2025-checkbox"
          checked={checked["2010년대"]}
          onChange={() => onCheckboxChange("2010년대")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer relative ${
            checked["2010년대"]
              ? "bg-main border-none"
              : "bg-black border-gray-400"
          } transition-colors ease-in-out after:content-[''] after:absolute after:left-[5px] after:top-[2px]
            after:w-[6px] after:h-[10px] after:border-white
            after:border-r-2 after:border-b-2 after:rotate-45
            ${checked["2010년대"] ? "after:block" : "after:hidden"}`}
        />
        <label htmlFor="years-checkbox">2010년대</label>
      </div>
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="2025-checkbox"
          checked={checked["2000년대"]}
          onChange={() => onCheckboxChange("2000년대")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer relative ${
            checked["2000년대"]
              ? "bg-main border-none"
              : "bg-black border-gray-400"
          } transition-colors ease-in-out after:content-[''] after:absolute after:left-[5px] after:top-[2px]
            after:w-[6px] after:h-[10px] after:border-white
            after:border-r-2 after:border-b-2 after:rotate-45
            ${checked["2000년대"] ? "after:block" : "after:hidden"}`}
        />
        <label htmlFor="years-checkbox">2000년대</label>
      </div>
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="2025-checkbox"
          checked={checked["1990년대"]}
          onChange={() => onCheckboxChange("1990년대")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer relative ${
            checked["1990년대"]
              ? "bg-main border-none"
              : "bg-black border-gray-400"
          } transition-colors ease-in-out after:content-[''] after:absolute after:left-[5px] after:top-[2px]
            after:w-[6px] after:h-[10px] after:border-white
            after:border-r-2 after:border-b-2 after:rotate-45
            ${checked["1990년대"] ? "after:block" : "after:hidden"}`}
        />
        <label htmlFor="years-checkbox">1990년대</label>
      </div>
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="2025-checkbox"
          checked={checked["1980년대"]}
          onChange={() => onCheckboxChange("1980년대")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer relative ${
            checked["1980년대"]
              ? "bg-main border-none"
              : "bg-black border-gray-400"
          } transition-colors ease-in-out after:content-[''] after:absolute after:left-[5px] after:top-[2px]
            after:w-[6px] after:h-[10px] after:border-white
            after:border-r-2 after:border-b-2 after:rotate-45
            ${checked["1980년대"] ? "after:block" : "after:hidden"}`}
        />
        <label htmlFor="years-checkbox">1980년대</label>
      </div>
    </div>
  );
}
