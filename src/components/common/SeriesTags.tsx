import Tag from "./Tag";

export default function Tags({
  children,
  tags,
  selectTag,
}: {
  children: string;
  tags: GenreState[];
  selectTag: (id: number) => void;
}) {
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
              {tag.krKey}
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
              {tag.krKey}
            </Tag>
          ))}
        </div>
      </div>
    </>
  );
}
