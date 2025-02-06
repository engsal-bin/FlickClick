export default function PersonList({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-[30px]">
      <p className="tablet:text-[24px] text-semibold mobile:text-[18px] text-white01">
        {label}
      </p>
      <div className="flex gap-[30px]">
        <figure className="flex flex-col gap-[5px]">
          <img
            src=""
            className="bg-white tablet:w-[100px] mobile:w-[60px] aspect-square rounded-full z-10"
          />
          <figcaption className="text-[18px] leading-auto text-white01 text-center">
            하정우
          </figcaption>
          <figcaption className="text-[16px] leading-auto text-gray03 text-center">
            태인
          </figcaption>
        </figure>
        <figure className="flex flex-col gap-[5px]">
          <img
            src=""
            className="bg-white tablet:w-[100px] mobile:w-[60px] aspect-square rounded-full z-10"
          />
          <figcaption className="text-[18px] leading-auto text-white01 text-center">
            하정우
          </figcaption>
          <figcaption className="text-[16px] leading-auto text-gray03 text-center">
            태인
          </figcaption>
        </figure>
        <figure className="flex flex-col gap-[5px]">
          <img
            src=""
            className="bg-white tablet:w-[100px] mobile:w-[60px] aspect-square rounded-full z-10"
          />
          <figcaption className="text-[18px] leading-auto text-white01 text-center">
            하정우
          </figcaption>
          <figcaption className="text-[16px] leading-auto text-gray03 text-center">
            태인
          </figcaption>
        </figure>
        <figure className="flex flex-col gap-[5px]">
          <img
            src=""
            className="bg-white tablet:w-[100px] mobile:w-[60px] aspect-square rounded-full z-10"
          />
          <figcaption className="text-[18px] leading-auto text-white01 text-center">
            하정우
          </figcaption>
          <figcaption className="text-[16px] leading-auto text-gray03 text-center">
            태인
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
