import { useLanguageStore } from "../../store/useLanguageStore";
import { YearState } from "../../type/seriesType";
import Tag from "./Tag";

export default function YearTags({
  children,
  tags,
  selectTag,
}: {
  children: string;
  tags: YearState[];
  selectTag: (id: number) => void;
}) {
  const { language } = useLanguageStore();
  return (
    <>
      {/* pc, tablet */}
      <div className="hidden tablet:block w-full px-[50px]">
        <p className="text-white01 font-bold text-[24px] mb-[30px]">
          {children}
        </p>
        <div className="flex flex-wrap gap-[10px]">
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              onClick={() => selectTag(tag.id)}
              isSelected={tag.selected}
            >
              {language === "ko" ? tag.krKey : tag.key}
            </Tag>
          ))}
        </div>
      </div>
      {/* mobile */}
      <div className="tablet:hidden mobile:px-[10px] w-full">
        <p className="text-white01 font-bold text-[18px] mb-[30px]">
          {children}
        </p>
        <div className="flex flex-wrap gap-[10px]">
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              onClick={() => selectTag(tag.id)}
              isSelected={tag.selected}
            >
              {language === "ko" ? tag.krKey : tag.key}
            </Tag>
          ))}
        </div>
      </div>
    </>
  );
}
