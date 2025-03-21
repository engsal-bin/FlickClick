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

  const fetchReview = async () => {
    if (movieOrSeasonOrEpisode === "movie") {
      const { data } = await commonAPI.getMovieReview(contentId);
      console.log("data = ", data);
      setReviews(data);
    }
    if (movieOrSeasonOrEpisode === "season") {
      const { data } = await commonAPI.getSeasonReview(contentId);
      console.log("data = ", data);
      setReviews(data);
    }
    if (movieOrSeasonOrEpisode === "episode") {
      const { data } = await commonAPI.getEpisodeReview(contentId);
      console.log("data = ", data);
      setReviews(data);
    }
    console.log("contentId = ", contentId);
  };
  const getReview = async () => {
    await fetchReview();
  };
  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <>
      <div>
        <InputTextarea
          stateLifting={getReview}
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
                  stateLifting={getReview}
                  movieOrSeasonOrEpisode={movieOrSeasonOrEpisode}
                />
              ))
            : "리뷰가 없습니다."}
        </div>
      </div>
    </>
  );
}
