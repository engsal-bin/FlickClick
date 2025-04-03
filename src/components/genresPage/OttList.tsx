import OttIcon from "../OttIcon";

export default function OttList({
  ottStates,
  onCheckboxChange,
}: {
  ottStates: OttState[];
  onCheckboxChange: (id: number) => void;
}) {
  return (
    <div className="w-[124px] flex flex-wrap gap-[15px]">
      {ottStates.map((ott) => (
        <OttIcon
          key={ott.key}
          src={ott.src}
          isSelected={ott.selected}
          onClick={() => onCheckboxChange(ott.id)}
          alt={ott.alt}
        />
      ))}
    </div>
  );
}
