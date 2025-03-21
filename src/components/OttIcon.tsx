interface OttIconProps {
  src: string;
  isSelected: boolean;
  onClick: () => void;
  alt: string;
}

const OttIcon = ({ src, isSelected, onClick, alt }: OttIconProps) => {
  return (
    <img
      src={src}
      onClick={onClick}
      alt={alt}
      className={`cursor-pointer object-cover ${
        isSelected
          ? "opacity-100" // 선택된 아이콘에 노란색 테두리 추가
          : "opacity-30"
      }`}
    />
  );
};

export default OttIcon;
