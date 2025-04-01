import { useEffect, useState } from "react";
import { movieAPI } from "../../api/movie";

export default function UpcomingVideo({ movie_id }: { movie_id: number }) {
  const [trailerSite, setTrailerSite] = useState<string[]>([]);
  useEffect(() => {
    const fetchMovieTrailer = async () => {
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
          }

          const trailerSiteFilter = youtubeVideos.map(
            (video: VideoType) => `https://www.youtube.com/embed/${video.key}`,
          );

          setTrailerSite(trailerSiteFilter);
        }
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    };
    fetchMovieTrailer();
  }, [movie_id]);
  return (
    <div className="w-[801px] h-[500px] max-desktop:w-full max-xl:h-[429px]  max-sm:h-[305px]  max-mobile:h-[180px]">
      {trailerSite.length > 0 ? (
        <iframe src={trailerSite[0]} className="w-full h-full"></iframe>
      ) : (
        <p className="text-center text-white">트레일러를 찾을 수 없습니다.</p>
      )}
    </div>
  );
}
