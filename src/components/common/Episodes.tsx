import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../api/axios";
import imagenone2 from "../../assets/icon/imagenone2.svg";

export default function Episodes({
  seriesId,
  seasonNum,
  data,
}: {
  seriesId: number;
  seasonNum: number;
  data?: EpisodeType[];
}) {
  // console.log(data);
  return (
    <section className="flex flex-col gap-[20px]">
      {/* 개별 에피소드 */}

      {data?.map((epi) => (
        <Link
          key={epi.id}
          to={`/detailepisode/${seriesId}/${seasonNum}/${epi.episode_number}`}
        >
          <div
            className="flex tablet:flex-row mobile:flex-col 
          desktop:gap-[30px] tablet:gap-[20px] mobile:gap-[10px]"
          >
            {/* 스틸컷 */}
            <div
              className="tablet:w-[323px] mobile:w-full bg-white bg-cover bg-center
              border-[1px] border-main"
              style={{
                aspectRatio: "1661 / 1000",
                backgroundImage: epi.still_path
                  ? `url(${IMAGE_BASE_URL}original${epi.still_path})`
                  : `url(${imagenone2})`,
              }}
            ></div>

            {/* 에피소드 설명 */}
            <div className="w-full flex flex-col justify-start py-[15px]">
              <div className="flex justify-between items-baseline">
                {/* 에피소드 제목 */}
                <p
                  className="mt-[15px] mb-[20px] text-white02 text-[22px] font-bold 
            leading-none"
                >
                  {epi.name}
                </p>

                {/* 에피소드 방영일 */}
                <p
                  className="mt-[15px] mb-[20px] text-white02 text-[18px] 
                  font-medium leading-none"
                >
                  {epi.air_date}
                </p>
              </div>

              {/* 오버뷰 */}
              <p
                className="text-white03 text-[18px] 
            leading-[27px] tablet:line-clamp-4 mobile:line-clamp-3"
              >
                {epi.overview}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
