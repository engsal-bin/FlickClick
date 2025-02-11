import { useEffect, useState } from "react";
import OttIcon from "../OttIcon";
import { genreAPI } from "../../api/genre";

interface ProviderType {
  display_priorities: { [key: string]: number };
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export default function OttIcons() {
  const [ottServices, setOttServices] = useState<ProviderType[] | []>([]);
  const [selectedOtts, setSelectedOtts] = useState<ProviderType[] | []>([]);

  const fetchOttServices = async () => {
    try {
      const tvProviders = await genreAPI.getTVProvider();
      const movieProviders = await genreAPI.getMovieProvider();
      const allProviders = [...tvProviders.results, ...movieProviders.results];
      const deduplicatedProviders = [
        ...new Set(allProviders.map((provider) => JSON.stringify(provider))),
      ].map((provider) => JSON.parse(provider)) as ProviderType[];
      const sortDeduplicatedProviders = deduplicatedProviders.sort(
        (provider1, provider2) =>
          provider2.display_priorities["KR"] -
          provider1.display_priorities["KR"]
      );
      setOttServices(sortDeduplicatedProviders);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOttSelect = (service: ProviderType) => {
    setSelectedOtts((prev) => {
      const isAlreadySelected = prev.some(
        (ott) => ott.provider_id === service.provider_id
      );

      if (isAlreadySelected) {
        return prev.filter((ott) => ott.provider_id !== service.provider_id);
      } else {
        return [...prev, service];
      }
    });
  };

  useEffect(() => {
    fetchOttServices();
  }, []);

  return (
    <div className="w-full flex flex-wrap gap-[15px]">
      {/* ott서비스 아이콘 */}
      {ottServices.map((service) => (
        <OttIcon
          key={service.provider_id}
          src={service.logo_path}
          alt={service.provider_name}
          onClick={() => handleOttSelect(service)}
          isSelected={selectedOtts.some(
            (ott) => ott.provider_id === service.provider_id
          )}
        />
      ))}
    </div>
  );
}
