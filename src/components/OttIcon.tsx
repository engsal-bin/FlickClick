interface OttIconProps {
  src: string; // 이미지 경로
  isSelected: boolean; // 선택 여부
  onClick: () => void; // 클릭 이벤트
  alt: string; // 대체 텍스트
}

const OttIcon = ({ src, isSelected, onClick, alt }: OttIconProps) => {
  return (
    <img
      src={src}
      onClick={onClick}
      className={`cursor-pointer ${isSelected ? "opacity-100" : "opacity-30"}`}
      alt={alt}
    />
  );
};

export default OttIcon;
