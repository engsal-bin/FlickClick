import github from "../../assets/icon/github.svg";

export default function Banner() {
  return (
    <>
      {/* desktop */}
      <a
        href="https://github.com/engsal-bin/FlickClick"
        target="_blank"
        rel="noopener noreferrer"
        className="tablet:hidden mobile:hidden desktop:flex w-[1180px] h-[150px] mx-[50px] bg-[#1D232A] justify-center items-center gap-[50px] cursor-pointer"
      >
        {/* 깃허브 로고 */}
        <div
          className="w-[100px] h-[100px] bg-cover bg-center"
          style={{ backgroundImage: `url(${github})` }}
        ></div>

        {/* 내용 */}
        <div className="text-white02 gap-[10px]">
          <p className="font-bold text-[30px]">FlickClick</p>
          <p className="text-[20px]">GitHub 저장소 바로가기</p>
        </div>
      </a>

      {/* tablet */}
      <a
        href="https://github.com/engsal-bin/FlickClick"
        target="_blank"
        rel="noopener noreferrer"
        className="desktop:hidden mobile:hidden tablet:flex w-[709px] h-[150px] mx-[50px] bg-[#1D232A] justify-center items-center gap-[50px] cursor-pointer"
      >
        {/* 깃허브 로고 */}
        <div
          className="w-[100px] h-[100px] bg-cover bg-center"
          style={{ backgroundImage: `url(${github})` }}
        ></div>

        {/* 내용 */}
        <div className="text-white02 gap-[10px]">
          <p className="font-bold text-[30px]">FlickClick</p>
          <p className="text-[20px]">GitHub 저장소 바로가기</p>
        </div>
      </a>

      {/* mobile */}
      <a
        href="https://github.com/engsal-bin/FlickClick"
        target="_blank"
        rel="noopener noreferrer"
        className="desktop:hidden tablet:hidden mobile:flex w-[300px] h-[80px] mx-[10px] bg-[#1D232A] justify-center items-center gap-[10px] cursor-pointer"
      >
        {/* 깃허브 로고 */}
        <div
          className="w-[50px] h-[50px] bg-cover bg-center"
          style={{ backgroundImage: `url(${github})` }}
        ></div>

        {/* 내용 */}
        <div className="text-white02 gap-[10px]">
          <p className="font-bold text-[20px]">FlickClick</p>
          <p className="text-[12px]">GitHub 저장소 바로가기</p>
        </div>
      </a>
    </>
  );
}
