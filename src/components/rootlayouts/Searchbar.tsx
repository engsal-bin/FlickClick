import { ChangeEvent, useEffect, useState } from "react";
import seachIcon from "../../assets/icon/searchIcon.svg";
import { commonAPI } from "../../api/common";
import { searchAPI } from "../../api/search";
import useDebounce from "../../hooks/useDebounce";

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
  release_date?: string;
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
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<ContentType[] | []>([]);
  const [searchTVResults, setSearchTVResults] = useState<ContentType[] | []>(
    []
  );
  const [searchMovieResults, setSearchMovieResults] = useState<
    ContentType[] | []
  >([]);
  const debouncedValue = useDebounce(searchValue, 500);
  const [currentTab, setCurrentTab] = useState("전체");

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  // 검색어 입력 전 & 검색어 지웠을 때 보여줄 트랜드 컨텐츠 패칭
  const fetchTrendingContents = async () => {
    try {
      const response: ContentsType = await commonAPI.getTrendingAll(1);
      setTrendingContents(response.results.slice(0, 10));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSearhResults = async () => {
    try {
      const allResults = await searchAPI.multiSearch(debouncedValue);
      const tvResults = await searchAPI.tvSearch(debouncedValue);
      const movieResults = await searchAPI.movieSearch(debouncedValue);

      setSearchResults(allResults.results);
      setSearchTVResults(tvResults.results);
      setSearchMovieResults(movieResults.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTrendingContents();
  }, []);

  useEffect(() => {
    fetchSearhResults();
  }, [debouncedValue]);

  return (
    <>
      {/* desktop */}
      <div className="tablet:hidden mobile:hidden desktop:flex">
        <div className="w-[100%] h-[100%] py-[50px] px-[315px] flex flex-col justify-between items-center">
          <div className="flex">
            <input
              className="w-[620px] h-[41px] mr-[4px] font-light text-white01 text-[18px] bg-black border-b-[2px] border-b-white01 focus:outline-none"
              placeholder="검색어를 입력하세요"
              value={searchValue}
              onChange={handleSearchInput}
            />
            <img src={seachIcon} />
          </div>
          <div className="w-[650px] flex flex-col gap-[20px] mt-[50px] text-white01 font-bold text-[18px]">
            {!searchValue ? <p>트렌드 컨텐츠</p> : ""}
            {!searchValue ? (
              trendingContents.map((content, index) => (
                <div className="flex text-[16px]" key={content.id}>
                  <div className="w-[20px] text-main mr-[20px]">
                    {index + 1}
                  </div>
                  <div className="font-light">
                    {content.name || content.title}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white01 font-normal">
                <div>
                  <ul className="flex w-full border-b border-b-gray02">
                    <li
                      className={`w-[100px] py-[19px] text-center text-gray02 cursor-pointer ${
                        currentTab === "전체"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => handleTabChange("전체")}>
                      전체
                    </li>
                    <li
                      className={`w-[100px] py-[19px] text-center text-gray02 cursor-pointer ${
                        currentTab === "시리즈"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => handleTabChange("시리즈")}>
                      시리즈
                    </li>
                    <li
                      className={`w-[100px] py-[19px] text-center text-gray02 cursor-pointer ${
                        currentTab === "영화"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => handleTabChange("영화")}>
                      영화
                    </li>
                  </ul>
                </div>
                {currentTab === "전체" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchResults.length === 0 && (
                      <div>'{searchValue}'에 대한 검색 결과가 없습니다</div>
                    )}
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px]">
                        <div className="w-[109px] h-[144px]">
                          <img
                            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`}
                            className="w-full h-full rounded-[8px]"
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[20px] text-white01">
                            {result.name || result.title}
                          </p>
                          <p className=" font-normal text-[14px] text-gray03 flex gap-[5px]">
                            <p>
                              {result.media_type === "tv" ? "시리즈" : "영화"}
                            </p>
                            <p>|</p>
                            <p>
                              {result.release_date || result.first_air_date}
                            </p>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {currentTab === "시리즈" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchTVResults.length === 0 && (
                      <div>'{searchValue}'에 대한 검색 결과가 없습니다</div>
                    )}
                    {searchTVResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px]">
                        <div className="w-[109px] h-[144px]">
                          <img
                            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`}
                            className="w-full h-full rounded-[8px]"
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[20px] text-white01">
                            {result.name || result.title}
                          </p>
                          <p className=" font-normal text-[14px] text-gray03 flex gap-[5px]">
                            <p>시리즈</p>
                            <p>|</p>
                            <p>
                              {result.release_date || result.first_air_date}
                            </p>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {currentTab === "영화" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchMovieResults.length === 0 && (
                      <div>'{searchValue}'에 대한 검색 결과가 없습니다</div>
                    )}
                    {searchMovieResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px]">
                        <div className="w-[109px] h-[144px]">
                          <img
                            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`}
                            className="w-full h-full rounded-[8px]"
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[20px] text-white01">
                            {result.name || result.title}
                          </p>
                          <p className=" font-normal text-[14px] text-gray03 flex gap-[5px]">
                            <p>영화</p>
                            <p>|</p>
                            <p>
                              {result.release_date || result.first_air_date}
                            </p>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* tablet */}
      <div className="desktop:hidden mobile:hidden tablet:flex">
        <div className="w-[100%] h-[100%] py-[50px] px-[58px] flex flex-col justify-between items-center">
          <div className="flex text-[18px]">
            <input
              className="w-[620px] h-[41px] mr-[4px] font-light text-white01 bg-black border-b-[2px] border-b-white01 focus:outline-none"
              placeholder="검색어를 입력하세요"
              value={searchValue}
              onChange={handleSearchInput}
            />
            <img src={seachIcon} />
          </div>
          <div className="w-[650px] flex flex-col gap-[20px] mt-[50px] text-white01 font-bold text-[18px]">
            {!searchValue ? <p>트렌드 컨텐츠</p> : ""}
            {!searchValue ? (
              trendingContents.map((content, index) => (
                <div className="flex text-[16px]" key={content.id}>
                  <div className="w-[20px] text-main mr-[20px]">
                    {index + 1}
                  </div>
                  <div className="font-light">
                    {content.name || content.title}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white01 font-normal">
                <div>
                  <ul className="flex w-full border-b border-b-gray02">
                    <li
                      className={`w-[100px] py-[19px] text-center text-gray02 cursor-pointer ${
                        currentTab === "전체"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => handleTabChange("전체")}>
                      전체
                    </li>
                    <li
                      className={`w-[100px] py-[19px] text-center text-gray02 cursor-pointer ${
                        currentTab === "시리즈"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => handleTabChange("시리즈")}>
                      시리즈
                    </li>
                    <li
                      className={`w-[100px] py-[19px] text-center text-gray02 cursor-pointer ${
                        currentTab === "영화"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => handleTabChange("영화")}>
                      영화
                    </li>
                  </ul>
                </div>
                {currentTab === "전체" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchResults.length === 0 && (
                      <div>'{searchValue}'에 대한 검색 결과가 없습니다</div>
                    )}
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px]">
                        <div className="w-[109px] h-[144px]">
                          <img
                            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`}
                            className="w-full h-full rounded-[8px]"
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[20px] text-white01">
                            {result.name || result.title}
                          </p>
                          <p className=" font-normal text-[14px] text-gray03 flex gap-[5px]">
                            <p>
                              {result.media_type === "tv" ? "시리즈" : "영화"}
                            </p>
                            <p>|</p>
                            <p>
                              {result.release_date || result.first_air_date}
                            </p>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {currentTab === "시리즈" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchTVResults.length === 0 && (
                      <div>'{searchValue}'에 대한 검색 결과가 없습니다</div>
                    )}
                    {searchTVResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px]">
                        <div className="w-[109px] h-[144px]">
                          <img
                            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`}
                            className="w-full h-full rounded-[8px]"
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[20px] text-white01">
                            {result.name || result.title}
                          </p>
                          <p className=" font-normal text-[14px] text-gray03 flex gap-[5px]">
                            <p>시리즈</p>
                            <p>|</p>
                            <p>
                              {result.release_date || result.first_air_date}
                            </p>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {currentTab === "영화" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchMovieResults.length === 0 && (
                      <div>'{searchValue}'에 대한 검색 결과가 없습니다</div>
                    )}
                    {searchMovieResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px]">
                        <div className="w-[109px] h-[144px]">
                          <img
                            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`}
                            className="w-full h-full rounded-[8px]"
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[20px] text-white01">
                            {result.name || result.title}
                          </p>
                          <p className="font-normal text-[14px] text-gray03 flex gap-[5px]">
                            <p>영화</p>
                            <p>|</p>
                            <p>
                              {result.release_date || result.first_air_date}
                            </p>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="desktop:hidden tablet:hidden mobile:flex">
        <div className="w-full h-full py-[50px] px-[10px] flex flex-col justify-between items-center ">
          <div className="flex text-[18px] w-full">
            <input
              className="w-full h-[35px] mr-[4px] font-light text-white01 bg-black border-b-[2px] border-b-white01 focus:outline-none"
              placeholder="검색어를 입력하세요"
              value={searchValue}
              onChange={handleSearchInput}
            />
            <img src={seachIcon} />
          </div>
          <div className="w-full flex flex-col gap-[20px] mt-[50px] text-white01 font-bold text-[18px]">
            {!searchValue ? <p>트렌드 컨텐츠</p> : ""}
            {!searchValue ? (
              trendingContents.map((content, index) => (
                <div className="flex text-[14px]" key={content.id}>
                  <div className="w-[20px] text-main mr-[20px]">
                    {index + 1}
                  </div>
                  <div className="font-light">
                    {content.name || content.title}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white01 font-normal">
                <div>
                  <ul className="flex w-full border-b border-b-gray02">
                    <li
                      className={`w-[100px] py-[19px] text-center text-gray02 text-[16px] cursor-pointer ${
                        currentTab === "전체"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => handleTabChange("전체")}>
                      전체
                    </li>
                    <li
                      className={`w-[100px] py-[19px] text-center text-gray02 text-[16px] cursor-pointer ${
                        currentTab === "시리즈"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => handleTabChange("시리즈")}>
                      시리즈
                    </li>
                    <li
                      className={`w-[100px] py-[19px] text-center text-gray02 text-[16px] cursor-pointer ${
                        currentTab === "영화"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => handleTabChange("영화")}>
                      영화
                    </li>
                  </ul>
                </div>
                {currentTab === "전체" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchResults.length === 0 && (
                      <div className="text-[16px]">
                        '{searchValue}'에 대한 검색 결과가 없습니다
                      </div>
                    )}
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px]">
                        <div className="w-[70px] h-[94px]">
                          <img
                            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`}
                            className="w-full h-full rounded-[8px]"
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[16px] text-white01 min-w-[210px] line-clamp-1">
                            {result.name || result.title}
                          </p>
                          <p className=" font-normal text-[12px] text-gray03 flex gap-[5px]">
                            <p>
                              {result.media_type === "tv" ? "시리즈" : "영화"}
                            </p>
                            <p>|</p>
                            <p>
                              {result.release_date || result.first_air_date}
                            </p>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {currentTab === "시리즈" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchTVResults.length === 0 && (
                      <div className="text-[16px]">
                        '{searchValue}'에 대한 검색 결과가 없습니다
                      </div>
                    )}
                    {searchTVResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px]">
                        <div className="w-[70px] h-[94px]">
                          <img
                            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`}
                            className="w-full h-full rounded-[8px]"
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[16px] text-white01 min-w-[210px] line-clamp-1">
                            {result.name || result.title}
                          </p>
                          <p className="font-normal text-[12px] text-gray03 flex gap-[5px]">
                            <p>시리즈</p>
                            <p>|</p>
                            <p>
                              {result.release_date || result.first_air_date}
                            </p>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {currentTab === "영화" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchMovieResults.length === 0 && (
                      <div className="text-[16px]">
                        '{searchValue}'에 대한 검색 결과가 없습니다
                      </div>
                    )}
                    {searchMovieResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px]">
                        <div className="min-w-[70px] h-[94px]">
                          <img
                            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`}
                            className="w-full h-full rounded-[8px]"
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[16px] text-white01 min-w-[210px] line-clamp-1">
                            {result.name || result.title}
                          </p>
                          <p className="font-normal text-[12px] text-gray03 flex gap-[5px]">
                            <p>영화</p>
                            <p>|</p>
                            <p>
                              {result.release_date || result.first_air_date}
                            </p>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
