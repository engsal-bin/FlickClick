export default function ContentsWithoutViewMore({ info }: { info: BasicType }) {
  return (
    <div className="flex-grow-0 flex-shrink-0 basis-auto max-w-[212px] min-w-[93px] w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] md:w-[calc(25%-16px)] lg:w-[calc(20%-16px)]">
      {/* tablet 이상 */}
      <div className="flex-col hidden sm:flex ">
        <div className="w-full aspect-[212/306]">
          <img
            src={info.poster_path}
            className="object-cover w-full h-full border-black border-[1px] rounded-[8px]"
          />
        </div>
        <p className="text-white01 pt-[10px] font-[18px]">
          {info.title || info.name}
        </p>
      </div>
      {/* mobile 전용 */}
      <div className="flex flex-col justify-between sm:hidden">
        <div className="w-full aspect-[93/134]">
          <img
            src={info.poster_path}
            className="object-cover w-full h-full border-black border-[1px] rounded-[8px]"
          />
        </div>
        <p className="text-white01 pt-[10px] font-[14px]">
          {info.title || info.name}
        </p>
      </div>
    </div>
  );
}
