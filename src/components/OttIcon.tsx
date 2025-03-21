interface OttIconProps {
  src: string;
  isSelected: boolean;
  onClick: () => void;
  alt: string;
}

const OttIcon = ({ src, isSelected, onClick, alt }: OttIconProps) => {
  return (
    <img
      src={`https://image.tmdb.org/t/p/original/${src}`}
      onClick={onClick}
      className={
        `cursor-pointer ${
          isSelected ? "opacity-100" : "opacity-30"
        } w-[40px] h-[40px]` + "object-cover rounded-[8px]"
      }
      alt={alt}
    />
  );
};

export default OttIcon;
