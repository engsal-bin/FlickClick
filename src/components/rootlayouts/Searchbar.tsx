import { useEffect, useState } from "react";
import seachIcon from "../../assets/icon/searchIcon.svg";
import { commonAPI } from "../../api/common";

interface ContentType {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name?: string;
  title?: string;
  origin_country: string[];
  original_language: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface ContentsType {
  page: number;
  results: ContentType[];
  total_pages: number;
  total_results: number;
}

export default function Searchbar() {
  const [trendingContents, setTrendingContents] = useState<ContentType[] | []>(
    []
  );
  const fetchTrendingContents = async () => {
    try {
      const response: ContentsType = await commonAPI.getTrendingAll(1);
      setTrendingContents(response.results.slice(0, 10));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTrendingContents();
  }, []);

  return (
    <>
      {/* desktop */}
      <div className="tablet:hidden mobile:hidden desktop:flex">
        <div className="w-[100%] h-[100%] py-[50px] px-[315px] flex flex-col justify-between items-center">
          <div className="flex">
            <input
              className="w-[620px] h-[41px] mr-[4px] font-light text-white01 text-[18px] bg-black border-b-[2px] border-b-white01"
              placeholder="검색어를 입력하세요"
            />
            <img src={seachIcon} />
          </div>
          <div className="w-[650px] h-[411px] flex flex-col gap-[20px] mt-[50px] text-white01 font-bold text-[18px]">
            <p>트렌드 컨텐츠</p>
            {trendingContents.map((content, index) => (
              <div className="flex text-[16px]" key={content.id}>
                <div className="w-[20px] text-main mr-[20px]">{index + 1}</div>
                <div className="font-light">
                  {content.name || content.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* tablet */}
      <div className="desktop:hidden mobile:hidden tablet:flex">
        <div className="w-[100%] h-[100%] py-[50px] px-[58px] flex flex-col justify-between items-center">
          <div className="flex text-[18px]">
            <input
              className="w-[620px] h-[41px] mr-[4px] font-light text-white01 bg-black border-b-[2px] border-b-white01"
              placeholder="검색어를 입력하세요"
            />
            <img src={seachIcon} />
          </div>
          <div className="w-[650px] h-[411px] flex flex-col gap-[20px] mt-[50px] text-white01 font-bold text-[18px]">
            <p>트렌드 컨텐츠</p>
            {trendingContents.map((content, index) => (
              <div className="flex text-[16px]" key={content.id}>
                <div className="w-[20px] text-main mr-[20px]">{index + 1}</div>
                <div className="font-light">
                  {content.name || content.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="desktop:hidden tablet:hidden mobile:flex">
        <div className="w-[100%] h-[100%] py-[50px] px-[58px] flex flex-col justify-between items-center">
          <div className="flex text-[18px]">
            <input
              className="w-[250px] h-[35px] mr-[4px] font-light text-white01 bg-black border-b-[2px] border-b-white01"
              placeholder="검색어를 입력하세요"
            />
            <img src={seachIcon} />
          </div>
          <div className="w-[280px] h-[411px] flex flex-col gap-[20px] mt-[50px] text-white01 font-bold text-[18px]">
            <p>트렌드 컨텐츠</p>
            {trendingContents.map((content, index) => (
              <div className="flex text-[16px]" key={content.id}>
                <div className="w-[20px] text-main mr-[20px]">{index + 1}</div>
                <div className="font-light">
                  {content.name || content.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
