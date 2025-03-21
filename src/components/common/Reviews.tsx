import { useEffect, useState } from "react";
import InputTextarea from "./InputTextarea";
import Review from "./Review";
import { commonAPI } from "../../api/common";

export default function Reviews({
  movieOrSeasonOrEpisode,
  contentId,
}: {
  movieOrSeasonOrEpisode: movieOrSeasonOrEpisodeType;
  contentId: string;
}) {
  const [reviews, setReviews] = useState([]);

  const fetchMovieReview = async () => {
    const { data } = await commonAPI.getMovieReview(contentId);
    console.log("data = ", data);
    setReviews(data);
  };
  const getMovieReview = async () => {
    await fetchMovieReview();
  };
  useEffect(() => {
    fetchMovieReview();
  }, []);

  return (
    <>
      <div>
        <InputTextarea
          stateLifting={getMovieReview}
          contentId={contentId}
          reviewOrArgumentOrOpinion={"review"}
          movieOrSeasonOrEpisode={movieOrSeasonOrEpisode}
        />
        {/* 리뷰리스트 */}
        <div className="flex flex-col gap-[20px]">
          {reviews.length > 0
            ? reviews.map((review, index) => (
                <Review
                  review={review}
                  key={index}
                  stateLifting={getMovieReview}
                />
              ))
            : "리뷰가 없습니다."}
        </div>
      </div>
    </>
  );
}
