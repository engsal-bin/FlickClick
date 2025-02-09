import logo from "../../assets/logo/socialLogo/logo.svg";
export default function UpcomingCreditsDetail({
  info,
}: {
  info: CreditInfoType;
}) {
  return (
    <div className=" w-auto mr-[15px] min-h-[101px] h-auto">
      <div className="flex justify-center">
        <div className=" w-[60px] h-[60px] rounded-full ">
          <img
            className="object-cover w-full h-full rounded-full"
            src={
              info.profile_path
                ? `https://image.tmdb.org/t/p/w220_and_h330_face${info.profile_path}`
                : logo
            }
          />
        </div>
      </div>

      <div className="text-white03 w-auto min-h-[17px] h-auto text-[14px] text-center">
        {info.name}
      </div>
      <div className="text-gray03 w-auto min-h-[17px] h-auto text-[12px] text-center">
        {info.character}
      </div>
    </div>
  );
}
