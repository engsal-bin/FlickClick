type CheckedState = {
  [key: string]: boolean;
};

interface MediaListProps {
  checked: CheckedState;
  onCheckboxChange: (key: string) => void;
}

export default function MediaList({
  checked,
  onCheckboxChange,
}: MediaListProps) {
  return (
    <div
      className="w-[124px] flex flex-col justify-start items-start
    font-light text-[13px] gap-[10px]">
      <div className="flex justify-center items-center gap-[15px]">
        <input
          type="checkbox"
          id="series-checkbox"
          checked={checked.series}
          onChange={() => onCheckboxChange("series")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer relative ${
            checked.series ? "bg-main border-none" : "bg-black border-gray-400"
          } transition-colors ease-in-out
            after:content-[''] after:absolute after:left-[5px] after:top-[2px]
            after:w-[6px] after:h-[10px] after:border-white
            after:border-r-2 after:border-b-2 after:rotate-45
            ${checked.series ? "after:block" : "after:hidden"}`}
        />
        <label htmlFor="series-checkbox">시리즈</label>
      </div>
      <div className="flex items-center gap-[15px]">
        <input
          type="checkbox"
          id="movies-checkbox"
          checked={checked.movies}
          onChange={() => onCheckboxChange("movies")}
          className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer relative ${
            checked.movies ? "bg-main border-none" : "bg-black border-gray-400"
          } transition-colors ease-in-out
            after:content-[''] after:absolute after:left-[5px] after:top-[2px]
            after:w-[6px] after:h-[10px] after:border-white
            after:border-r-2 after:border-b-2 after:rotate-45
            ${checked.movies ? "after:block" : "after:hidden"}`}
        />
        <label htmlFor="movies-checkbox">영화</label>
      </div>
    </div>
  );
}
