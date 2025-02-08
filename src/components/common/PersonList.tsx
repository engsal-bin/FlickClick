import { useEffect, useRef, useState } from "react";
import { tvAPI } from "../../api/tv";
import { IMAGE_BASE_URL } from "../../api/axios";

export default function PersonList({
  seriesId,
  seasonNum,
  label,
  type,
}: {
  seriesId: number;
  seasonNum: number;
  label: string;
  type: string;
}) {
  const [personData, setPersonData] = useState<PersonDataType[]>([]);
  const personListRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  // console.log(seasonNum);
  useEffect(() => {
    // seriesId와 seasonNum이 유효한지 확인
    if (!seriesId || !seasonNum) {
      return; // 값이 없으면 API 요청을 하지 않음
    }

    const fetchPerson = async () => {
      try {
        const person = await tvAPI.getSeasonCredits(seriesId, seasonNum);

        setPersonData(person[type]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPerson();
  }, [seriesId, seasonNum, type]);
  // console.log(personData);

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
  }, []);

  // 부모 요소의 너비를 기준으로 자식 요소가 넘쳤는지 체크
  useEffect(() => {
    const checkOverflow = () => {
      if (personListRef.current) {
        const isOverflowing =
          personListRef.current.scrollWidth > personListRef.current.clientWidth;
        // console.log(`${type}`, personListRef.current.scrollWidth);
        // console.log(`${type}`, personListRef.current.clientWidth);
        setIsOverflow(isOverflowing);
      }
    };

    checkOverflow(); // 처음 렌더링 시 체크
    window.addEventListener("resize", checkOverflow); // 리사이즈 시 체크

    return () => {
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
        className={`flex justify-start gap-[30px] ${
          isOverflow ? "overflow-x-auto overflow-y-hidden" : "overflow-x-hidden"
        } `}
        style={{
          scrollbarWidth: "none",
        }}
      >
        {personData?.map((person) => (
          <div key={person.id} className="flex flex-col gap-[5px] items-center">
            {/* 프로필 이미지 */}
            <div
              className="bg-white tablet:w-[100px] mobile:w-[60px] 
              aspect-square bg-cover bg-center rounded-full z-10"
              style={{
                backgroundImage: `url(${IMAGE_BASE_URL}original${person.profile_path})`,
              }}
            ></div>

            {/* 이름 */}
            <div
              className="w-full text-[18px] leading-auto text-white01 
            text-center"
            >
              {person.name}
            </div>

            {/* 역할 */}
            <div
              className="w-full text-[16px] leading-auto text-gray03 
            text-center"
            >
              {person.character}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
