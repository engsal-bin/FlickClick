import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { movieAPI } from "../../api/movie";
import Trailer from "./Trailer";
import TrailerModal from "./TrailerModal";

export default function Trailers() {
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [selectedVideoKey, setSelectedVideoKey] = useState<string | null>(null);
  const [key, setKey] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 예고편 가져오기
    const fetchMovieTrailer = async (movie_id: number) => {
      try {
        const trailer = await movieAPI.getMovieTrailer(movie_id);
        if (trailer.results.length > 0) {
          const youtubeVideos = trailer.results.filter(
            (video: VideoType) =>
              video.type === "Trailer" && video.site === "YouTube",
          );

          if (youtubeVideos.length > 0) {
            youtubeVideos.sort((a: VideoType, b: VideoType) =>
              a.published_at > b.published_at ? 1 : -1,
            );

            const dataKey = youtubeVideos.map((video: VideoType) => video.key);
            setKey(dataKey);

            const thumbnails = youtubeVideos.map(
              (video: VideoType) =>
                `https://img.youtube.com/vi/${video.key}/0.jpg`,
            );
            setThumbnails(thumbnails);
          }
        }
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    };

    fetchMovieTrailer(426063); // 예시 영화 ID
  }, []);

  // URL에 ?play가 있으면 모달을 띄움
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("play")) {
      setSelectedVideoKey(params.get("play"));
    } else {
      setSelectedVideoKey(null);
    }
  }, [location.search]);

  return (
    <>
      <div className="text-white">영상</div>

      {thumbnails.length > 0 ? (
        thumbnails.map((thumbnailUrl, index) => (
          <button
            key={index}
            onClick={() => {
              navigate(`?play=${key[index]}`);
            }}
          >
            <Trailer thumbnailUrl={thumbnailUrl} />
          </button>
        ))
      ) : (
        <p className="text-gray-400">예고편 썸네일을 불러오는 중...</p>
      )}

      {/* 모달이 URL을 기반으로 열리도록 설정 */}
      {selectedVideoKey && <TrailerModal />}
    </>
  );
}
