import { useEffect, useState } from "react";
import InputTextarea from "./InputTextarea";
import Review from "./Review";
import { commonAPI } from "../../api/common";
import { supabase } from "../../api";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

export default function Reviews({
  movieOrSeasonOrEpisode,
  contentId,
}: {
  movieOrSeasonOrEpisode: movieOrSeasonOrEpisodeType;
  contentId: string;
}) {
  const [reviews, setReviews] = useState([]);
  const { language } = useLanguageStore();
  const translation = menuTranslations[language];

  const fetchReview = async () => {
    if (movieOrSeasonOrEpisode === "movie") {
      const { data } = await commonAPI.getMovieReview(contentId);
      setReviews(data);
    }
    if (movieOrSeasonOrEpisode === "season") {
      const { data } = await commonAPI.getSeasonReview(contentId);
      setReviews(data);
    }
    if (movieOrSeasonOrEpisode === "episode") {
      const { data } = await commonAPI.getEpisodeReview(contentId);
      console.log("data = ", data);
      setReviews(data);
    }
    console.log("contentId = ", contentId);
  };

  useEffect(() => {
    fetchReview();
    const movieReviewSubscription = supabase
      .channel("movie_review")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "movie_review" },
        (payload) => {
          console.log("🔄 댓글 변경 감지:", payload);
          fetchReview();
        }
      )
      .subscribe();
    const episodeReviewSubscription = supabase
      .channel("episode_review")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "episode_review" },
        (payload) => {
          console.log("🔄 댓글 변경 감지:", payload);
          fetchReview();
        }
      )
      .subscribe();
    const seasonReviewSubscription = supabase
      .channel("season_review")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "season_review" },
        (payload) => {
          console.log("🔄 댓글 변경 감지:", payload);
          fetchReview();
        }
      )
      .subscribe();
    return () => {
      movieReviewSubscription.unsubscribe();
      episodeReviewSubscription.unsubscribe();
      seasonReviewSubscription.unsubscribe();
    };
  }, []);
  return (
    <>
      <div>
        <InputTextarea
          stateLifting={() => {}}
          contentId={contentId}
          reviewOrArgumentOrOpinion={"review"}
          movieOrSeasonOrEpisode={movieOrSeasonOrEpisode}
        />
        {/* 리뷰리스트 */}
        <div className="flex flex-col gap-[20px]">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Review
                review={review}
                key={index}
                movieOrSeasonOrEpisode={movieOrSeasonOrEpisode}
              />
            ))
          ) : (
            <p className="text-white">{translation.noReviews}</p>
          )}
        </div>
      </div>
    </>
  );
}
