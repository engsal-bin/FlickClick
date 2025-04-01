import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../api/axios";
import { Content } from "../../type/seriesType";
import { useEffect } from "react";
import defaultImage from "../../assets/icon/imagenone2.svg";

export default function GridContents({ content }: { content: Content }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("content", content);
  }, [content]);

  return (
    <div
      key={content.id}
      className="relative w-[200px] h-[265px] rounded-lg "
      onClick={() =>
        navigate(
          `/${content.media_type === "tv" ? "detailseries" : "detailmovie"}/${content.id}`
        )
      }
    >
      <img
        src={
          content.poster_path
            ? `${IMAGE_BASE_URL}original${content.poster_path}`
            : defaultImage
        }
        alt={content.name || "no image"}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
}
