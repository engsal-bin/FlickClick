import { useEffect, useRef, useState } from "react";
import { tvAPI } from "../../api/tv";
import { IMAGE_BASE_URL } from "../../api/axios";
import { movieAPI } from "../../api/movie";
import imagenone from "../../assets/icon/imagenone.svg";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

export default function PersonList({
  seriesId,
  seasonNum,
  label,
  type,
}: {
  seriesId: number;
  seasonNum?: number;
  label: string;
  type: string;
}) {
  const [personData, setPersonData] = useState<PersonDataType[]>([]);
  const personListRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const { language } = useLanguageStore();
  const translation = menuTranslations[language];

  useEffect(() => {
    if (!seriesId || !seasonNum) {
      return;
    }

    const fetchPerson = async () => {
      try {
        const person = await tvAPI.getSeasonCredits(
          seriesId,
          seasonNum,
          translation.languageParams
        );
        console.log(person);

        if (label === translation.cast) {
          setPersonData(person.cast);
        } else if (label === translation.crew) {
          setPersonData(person.crew);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPerson();
  }, [seriesId, seasonNum, type]);

  // Movie 데이터 불러오기
  useEffect(() => {
    if (type === "movie") {
      const fetchPerson = async () => {
        try {
          const person = await movieAPI.getCredits(
            seriesId,
            translation.languageParams
          );

          if (label === translation.cast) {
            setPersonData(person.cast);
          } else if (label === translation.crew) {
            setPersonData(person.crew);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchPerson();
    }
  }, [seriesId, type]);

  // 마우스 휠 이벤트 핸들러
  const handleWheel = (event: WheelEvent) => {
    if (personListRef.current) {
      // 세로 스크롤을 막고, 가로 스크롤만 적용
      if (isOverflow) {
        event.preventDefault();
      }
      personListRef.current.scrollLeft += event.deltaY; // deltaY 값에 따라 scrollLeft를 조정
    }
  };

  useEffect(() => {
    const personList = personListRef.current;
    if (personList) {
      personList.addEventListener("wheel", handleWheel, { passive: false });
    }

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      if (personList) {
        personList.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isOverflow]);

  // 부모 요소의 너비를 기준으로 자식 요소가 넘쳤는지 체크
  useEffect(() => {
    const checkOverflow = () => {
      if (personListRef.current) {
        const isOverflowing =
          personListRef.current.scrollWidth > personListRef.current.clientWidth;
        setIsOverflow(isOverflowing);
      }
    };

    // 브라우저가 레이아웃을 계산한 후 실행되도록 requestAnimationFrame 사용
    const raf = requestAnimationFrame(checkOverflow);

    window.addEventListener("resize", checkOverflow);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [personData]);

  return (
    <div className="flex flex-col gap-[30px]">
      {/* 제목 */}
      <p className="tablet:text-[24px] text-semibold mobile:text-[18px] text-white01">
        {label}
      </p>

      {/* 인물정보 */}
      <div
        ref={personListRef}
        className={`flex justify-start gap-[30px] overflow-x-auto overflow-y-hidden" 
        `}
        style={{
          scrollbarWidth: "none",
        }}
      >
        {personData?.length ? (
          personData.map((person) => (
            <div
              key={
                person.credit_id +
                `${label === translation.cast ? person.character : person.department}`
              }
              className="flex flex-col gap-[5px] items-center"
            >
              {/* 프로필 이미지 */}
              <div
                className="bg-white tablet:w-[100px] mobile:w-[60px] 
                aspect-square bg-cover bg-center rounded-full z-10"
                style={{
                  backgroundImage: person.profile_path
                    ? `url(${IMAGE_BASE_URL}original${person.profile_path})`
                    : `url(${imagenone})`,
                  border: person.profile_path ? "none" : "1px solid #4CC9F0",
                }}
              ></div>

              {/* 이름 */}
              <div className="w-full text-[18px] leading-auto text-white01 text-center">
                {person.name}
              </div>

              {/* 역할 */}
              <div className="w-full text-[16px] leading-auto text-gray03 text-center">
                {label === translation.cast
                  ? person.character
                  : person.department}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray03">{translation.noInfo}</div>
        )}
      </div>
    </div>
  );
}
