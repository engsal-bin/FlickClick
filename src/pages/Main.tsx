import MainThumbnail from "../components/common/MainThumbnail";
import Banner from "../components/common/Banner";
import Contents from "../components/common/Contents";

export default function Main() {
  return (
    <div className="flex flex-col justify-between items-center mb-[100px] desktop:gap-[50px] tablet:gap-[40px] mobile:gap-[30px] text-white bg-black">
      <MainThumbnail />
      <Banner />
      <Contents to="/popular" showMore>
        인기 급상승
      </Contents>
      <Contents to="/newupdate" showMore>
        신규 업데이트
      </Contents>
      <Contents to="/upcoming" showMore>
        공개 예정
      </Contents>
      <Contents to="" showMore={false}>
        새해에 봐야하는 ☀️
      </Contents>
    </div>
  );
}
