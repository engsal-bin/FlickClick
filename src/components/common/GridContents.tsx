import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../api/axios";
import { Content } from "../../type/seriesType";
import { useEffect } from "react";

export default function GridContents({ content }: { content: Content }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("content", content);
  }, [content]);

  return (
    <div
      key={content.id}
      className="relative w-[200px] h-[265px]  rounded-lg overflow-hidden"
      onClick={() =>
        navigate(
          `/${content.media_type === "tv" ? "detailseries" : "detailmovie"}/${content.id}`
        )
      }
    >
      <img
        src={`${IMAGE_BASE_URL}original${content.poster_path}`}
        alt={content.name}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
