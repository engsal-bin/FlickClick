import appleTv from "../../assets/icon/ottIcon/appleTV.svg";
import googlePlay from "../../assets/icon/ottIcon/googlePlay.svg";
import disneyPlus from "../../assets/icon/ottIcon/disneyPlus.svg";
import watcha from "../../assets/icon/ottIcon/watcha.svg";
import netflix from "../../assets/icon/ottIcon/netflix.svg";
import wavve from "../../assets/icon/ottIcon/wavve.svg";
import { useEffect, useState } from "react";
import { movieAPI } from "../../api/movie";

interface OttServiceType {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

// 모든 OTT 서비스 정보
const ottServiceList = [
  { src: appleTv, alt: "Apple TV" },
  { src: googlePlay, alt: "Google Play Movies" },
  { src: disneyPlus, alt: "Disney Plus" },
  { src: watcha, alt: "Watcha" },
  { src: netflix, alt: "Netflix" },
  { src: wavve, alt: "wavve" },
];

export default function UpcomingOtt({ movie_id }: { movie_id: number }) {
  const [ottServicesInfos, setOttServicesInfos] = useState<
    { src: string; alt: string }[]
  >([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services = await movieAPI.getProviders(movie_id);

        if (!services || !services.results || !services.results.KR) {
          console.warn("KR 데이터가 없음");
          setOttServicesInfos([]);
          return;
        }

        const flatrate = services.results.KR.flatrate || [];

        const filteredServices = ottServiceList.filter((info) =>
          flatrate.some(
            (service: OttServiceType) => service.provider_name === info.alt
          )
        );

        setOttServicesInfos(filteredServices);
      } catch (error) {
        console.error("fetchServices 오류:", error);
        setOttServicesInfos([]);
      }
    };

    fetchServices();
  }, [movie_id]);

  return (
    <div className="flex h-[30px]">
      {ottServicesInfos.length > 0 ? (
        ottServicesInfos.map((service, index) => (
          <div className="w-[30px] h-[30px]" key={index}>
            <img
              src={service.src}
              className="object-cover cursor-pointer"
              alt={service.alt}
            />
          </div>
        ))
      ) : (
        <p className="flex items-center text-sm text-gray-500">OTT 없음</p>
      )}
    </div>
  );
}
