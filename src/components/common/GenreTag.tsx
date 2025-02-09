export default function GenreTag({
  genre,
  isSelected,
  onSelect,
  onDeselect,
}: {
  genre: GenreBasicType;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onDeselect: (id: number) => void;
}) {
  return (
    <div
      className={`h-[31px] flex items-center ${
        isSelected
          ? "bg-gray01 border-[1px] border-gray01 text-white01"
          : "border-[1px] border-white03"
      } rounded-[8px] py-[6px] px-[10px] cursor-pointer`}
      onClick={() => (isSelected ? onDeselect(genre.id) : onSelect(genre.id))}
    >
      {genre.name}
      {isSelected && (
        <span className="ml-2" onClick={() => onDeselect(genre.id)}>
          ✕
        </span>
      )}
    </div>
  );
}
