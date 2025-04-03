import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

export default function GenreList({
  genreStates,
  onCheckboxChange,
  showGenreOptions,
}: {
  genreStates: GenreState[];
  onCheckboxChange: (id: number) => void;
  showGenreOptions: boolean;
}) {
  const { language } = useLanguageStore();
  const t = menuTranslations[language];
  return (
    <div className="flex flex-col gap-[10px]">
      {!showGenreOptions ? (
        <div className="text-[13px] text-gray02">{t.noTagSelected}</div>
      ) : (
        <div className="flex flex-col gap-[10px]">
          {genreStates.map((genre) => (
            <div
              key={genre.id}
              className="flex justify-start items-center gap-[15px]"
            >
              <input
                type="checkbox"
                id={`genre-${genre.id}`}
                checked={genre.selected}
                onChange={() => onCheckboxChange(genre.id)}
                className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer ${
                  genre.selected
                    ? "bg-main border-white01"
                    : "bg-black border-gray-400"
                } transition-colors ease-in-out`}
              />
              <label htmlFor={`genre-${genre.id}`} className="text-[13px]">
                {language === "ko" ? genre.krKey : genre.key}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
