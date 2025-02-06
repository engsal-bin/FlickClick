import { Link } from "react-router-dom";

export default function ArgorithmIP({ label }: { label: string }) {
  return (
    <section className="mb-[130px] w-full">
      <p className="text-white01 font-bold text-[24px]">{label}</p>
      <div className="flex justify-start gap-[30px] tablet:h-[265px] mobile:h-[132.5px]">
        <Link to="">
          <figure className="tablet:w-[200px] mobile:w-[100px] bg-gray02 h-full rounded-[10px] overflow-hidden">
            <img src="" alt="" className="w-full h-full object-cover" />
          </figure>
        </Link>
        <Link to="">
          <figure className="tablet:w-[200px] mobile:w-[100px] bg-gray02 h-full rounded-[10px] overflow-hidden">
            <img src="" alt="" className="w-full h-full object-cover" />
          </figure>
        </Link>
        <Link to="">
          <figure className="tablet:w-[200px] mobile:w-[100px] bg-gray02 h-full rounded-[10px] overflow-hidden">
            <img src="" alt="" className="w-full h-full object-cover" />
          </figure>
        </Link>
      </div>
    </section>
  );
}
