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
  const stateLifting = async () => {
    await fetchReview();
  };
  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <>
      <div>
        <InputTextarea
          stateLifting={stateLifting}
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
                stateLifting={stateLifting}
                movieOrSeasonOrEpisode={movieOrSeasonOrEpisode}
              />
            ))
          ) : (
            <p className="text-white">리뷰가 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
}
