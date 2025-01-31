import Tag from "./Tag";

const tags = [
  { id: 1, year: "1800년대" },
  { id: 2, year: "1900년대" },
  { id: 3, year: "2000년대" },
  { id: 4, year: "2010년대" },
  { id: 5, year: "2020년대" },
  { id: 6, year: "2021년" },
  { id: 7, year: "2022년" },
  { id: 8, year: "2023년" },
  { id: 9, year: "2024년" },
  { id: 10, year: "2025년" },
];

export default function YearTags({ children }: { children: string }) {
  return (
    <>
      {/* pc, tablet */}
      <div className="hidden tablet:block w-full px-[50px]">
        <p className="text-white01 font-bold text-[24px] mb-[30px]">
          {children}
        </p>
        <div className="flex flex-wrap gap-[10px]">
          {tags.map((tag) => (
            <Tag key={tag.id}>{tag.year}</Tag>
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
            <Tag key={tag.id}>{tag.year}</Tag>
          ))}
        </div>
      </div>
    </>
  );
}
