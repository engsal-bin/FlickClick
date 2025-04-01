import { useEffect, useState } from "react";
import { API_KEY, API_URL } from "../../api/axios";
import axios from "axios";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

type Genres = {
  id: number;
  name: string;
};

// tv 장르 영어 -> 한글
const mappingGenres: Record<string, string> = {
  "Action & Adventure": "액션 & 어드벤처",
  Kids: "어린이",
  News: "뉴스",
  Reality: "리얼리티",
  "Sci-Fi & Fantasy": "공상과학 & 판타지",
  Soap: "연속극",
  Talk: "토크쇼",
  "War & Politics": "전쟁 & 정치",
};

interface GenreListProps {
  media: string;
  title: string;
}

export default function GenreList(props: GenreListProps) {
  const [moreView, setMoreView] = useState(1);
  const [checkedGenres, setCheckedGenres] = useState<Genres[]>([]);
  const { language } = useLanguageStore();
  const t = menuTranslations[language];

  // 선택장르 상태 변경 함수
  const handleCheckedGenresChange = (genre: Genres) => {
    setCheckedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // 장르 상태 관리
  const [Genres, setGenres] = useState<Genres[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const mediaType = props.media === "tv" ? "tv" : "movie";
      const GenresList = `genre/${mediaType}/list?api_key=${API_KEY}&language=ko-KR`;

      try {
        const GenreResponse = await axios.get(`${API_URL}${GenresList}`);
        const GenreData: Genres[] = GenreResponse.data.genres;

        // 장르 이름을 매핑된 한글 값으로 변경
        const mapGenreData = GenreData.map((data) => ({
          ...data,
          name: mappingGenres[data.name] || data.name, // 매핑되지 않은 값은 그대로 유지
        }));
        setGenres(mapGenreData);
      } catch (error) {
        console.log("Error fetching Genres", error);
      }
    };
    fetchGenres();
  }, []);

  return (
    <div className="flex flex-col gap-[10px]">
      {/* 시리즈 장르 리스트 */}
      <div className="text-[16px]">{props.title}</div>
      {Genres?.slice(0, moreView * 5).map((genre) => (
        <div
          key={genre.id}
          className="flex justify-start items-center gap-[15px]"
        >
          {/* 체크박스 */}
          <input
            type="checkbox"
            id="genre-checkbox"
            checked={checkedGenres.includes(genre) ? true : false}
            onChange={() => handleCheckedGenresChange(genre)}
            className={`w-[16px] h-[16px] border-2 rounded-[3px] 
              appearance-none cursor-pointer ${
                checkedGenres.includes(genre)
                  ? "bg-main border-white01"
                  : "bg-black border-gray-400"
              } transition-colors ease-in-out`}
          />
          {/* 장르명 */}
          <label htmlFor="genre-checkbox" className="text-[13px]">
            {genre.name}
          </label>
        </div>
      ))}
      {/* 더보기 & 접기 */}
      <div
        className={`flex ${
          moreView === 1
            ? "justify-start"
            : Genres?.slice(0, moreView * 5).length !== Genres.length
              ? "justify-between"
              : "justify-end"
        } text-gray01`}
      >
        {/* 더보기 */}
        {Genres?.slice(0, moreView * 5).length !== Genres.length && (
          <div
            className="text-[12px] cursor-pointer hover:text-gray03"
            onClick={() => setMoreView((prev) => prev + 1)}
          >
            {t.viewMore}
          </div>
        )}
        {/* 접기 */}
        {moreView !== 1 && (
          <div
            className="text-[12px] cursor-pointer hover:text-gray03"
            onClick={() => setMoreView(1)}
          >
            {t.viewLess}
          </div>
        )}
      </div>
    </div>
  );
}
