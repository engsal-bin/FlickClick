import React from "react";
import OttIcon from "../OttIcon";
import type { OttState } from "../../type/seriesType";

interface OttIconsProps {
  ottStates: OttState[];
  setOttStates?: React.Dispatch<React.SetStateAction<OttState[]>>;
}

export default function OttIcons({ ottStates, setOttStates }: OttIconsProps) {
  const selectOtt = (id: number) => {
    if (setOttStates) {
      setOttStates((prev) =>
        prev.map((service) =>
          service.id === id
            ? { ...service, selected: !service.selected }
            : service
        )
      );
    }
  };

  return (
    <div className="w-[124px] flex flex-wrap gap-[15px]">
      {ottStates.map((service) => (
        <OttIcon
          key={service.key}
          src={service.src}
          isSelected={service.selected}
          onClick={() => selectOtt(service.id)}
          alt={service.alt}
        />
      ))}
    </div>
  );
}
