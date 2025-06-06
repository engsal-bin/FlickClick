import { ChangeEvent, useEffect, useState } from "react";
import seachIcon from "../../assets/icon/searchIcon.svg";
import defaultImage from "../../assets/icon/imagenone2.svg";
import { commonAPI } from "../../api/common";
import { searchAPI } from "../../api/search";
import useDebounce from "../../hooks/useDebounce";
import { mediaTypeToPathName } from "../../constants/path";
import { useNavigate } from "react-router-dom";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

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
  const { language } = useLanguageStore();
  const translation = menuTranslations[language];
  const debouncedValue = useDebounce(searchValue, 200);
  const [currentTab, setCurrentTab] = useState<string>("");
  const navigate = useNavigate();

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleContentClick = (content: ContentType) => {
    if (!content.media_type) return;
    const path = mediaTypeToPathName[content.media_type as "movie" | "tv"];
    if (path) navigate(`/${path}/${content.id}`);
  };

  const fetchTrendingContents = async () => {
    try {
      const response: ContentsType = await commonAPI.getTrendingAll(
        1,
        "day",
        translation.languageParams
      );
      setTrendingContents(response.results.slice(0, 10));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSearhResults = async () => {
    try {
      const allResults = await searchAPI.multiSearch(
        debouncedValue,
        translation.languageParams
      );
      const tvResults = await searchAPI.tvSearch(
        debouncedValue,
        translation.languageParams
      );
      const movieResults = await searchAPI.movieSearch(
        debouncedValue,
        translation.languageParams
      );

      setSearchResults(allResults.results);
      setSearchTVResults(tvResults.results);
      setSearchMovieResults(movieResults.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTrendingContents();
  }, [language]);

  useEffect(() => {
    fetchSearhResults();
  }, [debouncedValue, currentTab]);

  useEffect(() => {
    if (debouncedValue && !currentTab) {
      setCurrentTab("all");
    }
  }, [debouncedValue]);

  useEffect(() => {
    console.log("선택된 탭 바뀜", currentTab);
  }, [currentTab]);

  return (
    <>
      {/* desktop */}
      <div className="tablet:hidden mobile:hidden desktop:flex z-40">
        <div className="w-[100%] h-[100%] py-[50px] px-[315px] flex flex-col justify-between items-center">
          <div className="flex">
            <input
              className="w-[620px] h-[41px] mr-[4px] font-light text-white01 text-[18px] bg-black border-b-[2px] border-b-white01 focus:outline-none"
              placeholder={translation.searchPlaceholder}
              value={searchValue}
              onChange={handleSearchInput}
            />
            <img src={seachIcon} />
          </div>
          <div className="w-[650px] flex flex-col gap-[20px] mt-[50px] text-white01 font-bold text-[18px]">
            {!searchValue ? <p>{translation.trendingContent}</p> : ""}
            {!searchValue ? (
              trendingContents.map((content, index) => (
                <div
                  className="flex text-[16px] cursor-pointer"
                  key={content.id}
                  onClick={() => {
                    handleContentClick(content);
                  }}
                >
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
                        currentTab === "all"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => setCurrentTab("all")}
                    >
                      {translation.all}
                    </li>
                    <li
                      className={`w-[100px] py-[19px] text-center text-gray02 cursor-pointer ${
                        currentTab === "series"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => setCurrentTab("series")}
                    >
                      {translation.series}
                    </li>
                    <li
                      className={`w-[100px] py-[19px] text-center text-gray02 cursor-pointer ${
                        currentTab === "movie"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => setCurrentTab("movie")}
                    >
                      {translation.movie}
                    </li>
                  </ul>
                </div>
                {currentTab === "all" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchResults.length === 0 && (
                      <div>
                        '{searchValue}'{translation.noSearchResults}
                      </div>
                    )}
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px] cursor-pointer"
                        onClick={() => {
                          handleContentClick(result);
                        }}
                      >
                        <div className="w-[109px] h-[144px]">
                          <img
                            src={
                              result.poster_path
                                ? `https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`
                                : defaultImage
                            }
                            className="w-full h-full rounded-[8px]"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                defaultImage;
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[20px] text-white01">
                            {result.name || result.title}
                          </p>
                          <p className=" font-normal text-[14px] text-gray03 flex gap-[5px]">
                            <p>
                              {result.media_type === "tv"
                                ? translation.series
                                : translation.movie}
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
                {currentTab === "series" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchTVResults.length === 0 && (
                      <div>
                        '{searchValue}'{translation.noSearchResults}
                      </div>
                    )}
                    {searchTVResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px] cursor-pointer"
                        onClick={() => {
                          handleContentClick(result);
                        }}
                      >
                        <div className="w-[109px] h-[144px]">
                          <img
                            src={
                              result.poster_path
                                ? `https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`
                                : defaultImage
                            }
                            className="w-full h-full rounded-[8px]"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                defaultImage;
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[20px] text-white01">
                            {result.name || result.title}
                          </p>
                          <p className=" font-normal text-[14px] text-gray03 flex gap-[5px]">
                            <p>{translation.series}</p>
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
                {currentTab === "movie" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchMovieResults.length === 0 && (
                      <div>
                        '{searchValue}'{translation.noSearchResults}
                      </div>
                    )}
                    {searchMovieResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px] cursor-pointer"
                        onClick={() => {
                          handleContentClick(result);
                        }}
                      >
                        <div className="w-[109px] h-[144px]">
                          <img
                            src={
                              result.poster_path
                                ? `https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`
                                : defaultImage
                            }
                            className="w-full h-full rounded-[8px]"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                defaultImage;
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[20px] text-white01">
                            {result.name || result.title}
                          </p>
                          <p className=" font-normal text-[14px] text-gray03 flex gap-[5px]">
                            <p>{translation.movie}</p>
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
              placeholder={translation.searchPlaceholder}
              value={searchValue}
              onChange={handleSearchInput}
            />
            <img src={seachIcon} />
          </div>
          <div className="w-[650px] flex flex-col gap-[20px] mt-[50px] text-white01 font-bold text-[18px]">
            {!searchValue ? <p>{translation.trendingContent}</p> : ""}
            {!searchValue ? (
              trendingContents.map((content, index) => (
                <div
                  className="flex text-[16px] cursor-pointer"
                  key={content.id}
                  onClick={() => {
                    handleContentClick(content);
                  }}
                >
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
                        currentTab === "all"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => setCurrentTab("all")}
                    >
                      {translation.all}
                    </li>
                    <li
                      className={`w-[100px] py-[19px] text-center text-gray02 cursor-pointer ${
                        currentTab === "series"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => setCurrentTab("series")}
                    >
                      {translation.series}
                    </li>
                    <li
                      className={`w-[100px] py-[19px] text-center text-gray02 cursor-pointer ${
                        currentTab === "movie"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => setCurrentTab("movie")}
                    >
                      {translation.movie}
                    </li>
                  </ul>
                </div>
                {currentTab === "all" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchResults.length === 0 && (
                      <div>
                        '{searchValue}'{translation.noSearchResults}
                      </div>
                    )}
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px] cursor-pointer"
                        onClick={() => {
                          handleContentClick(result);
                        }}
                      >
                        <div className="w-[109px] h-[144px]">
                          <img
                            src={
                              result.poster_path
                                ? `https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`
                                : defaultImage
                            }
                            className="w-full h-full rounded-[8px]"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                defaultImage;
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[20px] text-white01">
                            {result.name || result.title}
                          </p>
                          <p className=" font-normal text-[14px] text-gray03 flex gap-[5px]">
                            <p>
                              {result.media_type === "tv"
                                ? translation.series
                                : translation.movie}
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
                {currentTab === "series" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchTVResults.length === 0 && (
                      <div>
                        '{searchValue}'{translation.noSearchResults}
                      </div>
                    )}
                    {searchTVResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px] cursor-pointer"
                        onClick={() => {
                          handleContentClick(result);
                        }}
                      >
                        <div className="w-[109px] h-[144px]">
                          <img
                            src={
                              result.poster_path
                                ? `https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`
                                : defaultImage
                            }
                            className="w-full h-full rounded-[8px]"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                defaultImage;
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[20px] text-white01">
                            {result.name || result.title}
                          </p>
                          <p className=" font-normal text-[14px] text-gray03 flex gap-[5px]">
                            <p>{translation.series}</p>
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
                {currentTab === "movie" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchMovieResults.length === 0 && (
                      <div>
                        '{searchValue}' {translation.noSearchResults}
                      </div>
                    )}
                    {searchMovieResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px] cursor-pointer"
                        onClick={() => {
                          handleContentClick(result);
                        }}
                      >
                        <div className="w-[109px] h-[144px]">
                          <img
                            src={
                              result.poster_path
                                ? `https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`
                                : defaultImage
                            }
                            className="w-full h-full rounded-[8px]"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                defaultImage;
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[20px] text-white01">
                            {result.name || result.title}
                          </p>
                          <p className=" font-normal text-[14px] text-gray03 flex gap-[5px]">
                            <p>{translation.movie}</p>
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
        <div className="w-full h-full py-[50px] px-[50px] flex flex-col justify-between items-center ">
          <div className="flex w-full">
            <input
              className="w-full h-[35px] mr-[4px] font-light text-white01 bg-black border-b border-b-white01 focus:outline-none text-[16px]"
              placeholder={translation.searchPlaceholder}
              value={searchValue}
              onChange={handleSearchInput}
            />
            <img src={seachIcon} />
          </div>
          <div className="w-full flex flex-col gap-[20px] mt-[50px] text-white01 font-bold ">
            {!searchValue ? (
              <p className="text-[18px]">{translation.trendingContent}</p>
            ) : (
              ""
            )}
            {!searchValue ? (
              trendingContents.map((content, index) => (
                <div
                  className="flex text-[14px] cursor-pointer"
                  key={content.id}
                  onClick={() => {
                    handleContentClick(content);
                  }}
                >
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
                        currentTab === "all"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => setCurrentTab("all")}
                    >
                      {translation.all}
                    </li>
                    <li
                      className={`w-[100px] py-[19px] text-center text-gray02 text-[16px] cursor-pointer ${
                        currentTab === "series"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => setCurrentTab("series")}
                    >
                      {translation.series}
                    </li>
                    <li
                      className={`w-[100px] py-[19px] text-center text-gray02 text-[16px] cursor-pointer ${
                        currentTab === "movie"
                          ? "border-b border-b-white02 text-white01 font-bold"
                          : ""
                      }`}
                      onClick={() => setCurrentTab("movie")}
                    >
                      {translation.movie}
                    </li>
                  </ul>
                </div>
                {currentTab === "all" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchResults.length === 0 && (
                      <div className="text-[16px]">
                        '{searchValue}'{translation.noSearchResults}
                      </div>
                    )}
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px] cursor-pointer"
                        onClick={() => {
                          handleContentClick(result);
                        }}
                      >
                        <div className="w-[70px] h-[94px]">
                          <img
                            src={
                              result.poster_path
                                ? `https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`
                                : defaultImage
                            }
                            className="w-full h-full rounded-[8px]"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                defaultImage;
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[16px] text-white01 min-w-[210px] line-clamp-1">
                            {result.name || result.title}
                          </p>
                          <p className=" font-normal text-[12px] text-gray03 flex gap-[5px]">
                            <p>
                              {result.media_type === "tv"
                                ? translation.series
                                : translation.movie}
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
                {currentTab === "series" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchTVResults.length === 0 && (
                      <div className="text-[16px]">
                        '{searchValue}'{translation.noSearchResults}
                      </div>
                    )}
                    {searchTVResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px] cursor-pointer"
                        onClick={() => {
                          handleContentClick(result);
                        }}
                      >
                        <div className="w-[70px] h-[94px]">
                          <img
                            src={
                              result.poster_path
                                ? `https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`
                                : defaultImage
                            }
                            className="w-full h-full rounded-[8px]"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                defaultImage;
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[16px] text-white01 min-w-[210px] line-clamp-1">
                            {result.name || result.title}
                          </p>
                          <p className="font-normal text-[12px] text-gray03 flex gap-[5px]">
                            <p>{translation.series}</p>
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
                {currentTab === "movie" && (
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto mt-[30px]">
                    {searchMovieResults.length === 0 && (
                      <div className="text-[16px]">
                        '{searchValue}'{translation.noSearchResults}
                      </div>
                    )}
                    {searchMovieResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-[20px] mb-[30px] cursor-pointer"
                        onClick={() => {
                          handleContentClick(result);
                        }}
                      >
                        <div className="min-w-[70px] h-[94px]">
                          <img
                            src={
                              result.poster_path
                                ? `https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`
                                : defaultImage
                            }
                            className="w-full h-full rounded-[8px]"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                defaultImage;
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="font-bold text-[16px] text-white01 min-w-[210px] line-clamp-1">
                            {result.name || result.title}
                          </p>
                          <p className="font-normal text-[12px] text-gray03 flex gap-[5px]">
                            <p>{translation.movie}</p>
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
