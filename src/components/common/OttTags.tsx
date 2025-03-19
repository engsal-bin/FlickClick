
import OttIcon from "../OttIcon";



export default function OttTags({children, selectedTag, selectTag}: {children: string; selectedTag: OttState[]; selectTag: (key: string) => void}) {


  return (
    <div className="w-full tablet:px-[50px] mobile:px-[10px]">
    <p className="font-bold text-white01 tablet:text-[24px] mb-[30px] mobile:text-[18px]">
        {children}
    </p>
    <div className="flex">
      {selectedTag.map((service: OttState) => (
        <OttIcon
        key={service.key}
        src={service.src}
        isSelected={service.selected} // 여기 수정!
        onClick={() => selectTag(service.key)}
        alt={service.alt}
        />
      ))}
    </div>
  </div>
  )
}
