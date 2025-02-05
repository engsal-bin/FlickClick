import { Link } from "react-router-dom";

export default function Episodes() {
  return (
    <section className="flex flex-col gap-[20px]">
        {/* 개별 에피소드 */}
        <Link to="">
          <figure className="flex tablet:flex-row mobile:flex-col desktop:gap-[30px] tablet:gap-[20px] mobile:gap-[10px]">
            <img
              src=""
              alt=""
              className="tablet:w-[323px] mobile:w-full bg-white object-cover"
              style={{ aspectRatio: '1661 / 1000' }} 
            /> 
              <figcaption className="flex flex-col justify-start py-[15px]">
                  <p className="mt-[15px] mb-[20px] text-white02 text-[22px] font-bold leading-none">에피소드 2</p>
                  <p className="text-white03 text-[18px] leading-[27px] tablet:line-clamp-4 mobile:line-clamp-3">어떤 이에겐 아픔이 어떤이에겐 희망이 되는 병원이란 공간. 산모는 아기를 지켜내겠다는 간절함으로 하루하루를 버텨낸다. 이 모습을 지켜보는 석형도 계속 마음이 쓰이는데.. 한편 서울과 속초를 오가며 바쁘게 일하는 송화에게 한 가지 제안이 건네진다. 그러나 어쩌고 저저꼬 테스트 넘어 갈때ㅇ어허허허어ㅓㅓ헣허허허허허허허ㅓ허하호ㅓㅏㅇ너ㅏㅎㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
              </figcaption>
          </figure>
        </Link>
        <Link to="">
          <figure className="flex tablet:flex-row mobile:flex-col desktop:gap-[30px] tablet:gap-[20px] mobile:gap-[10px]">
            <img
              src=""
              alt=""
              className="tablet:w-[323px] mobile:w-full bg-white object-cover"
              style={{ aspectRatio: '1661 / 1000' }} 
            /> 
              <figcaption className="flex flex-col justify-start py-[15px]">
                  <p className="mt-[15px] mb-[20px] text-white02 text-[22px] font-bold leading-none">에피소드 2</p>
                  <p className="text-white03 text-[18px] leading-[27px] tablet:line-clamp-4 mobile:line-clamp-3">어떤 이에겐 아픔이 어떤이에겐 희망이 되는 병원이란 공간. 산모는 아기를 지켜내겠다는 간절함으로 하루하루를 버텨낸다. 이 모습을 지켜보는 석형도 계속 마음이 쓰이는데.. 한편 서울과 속초를 오가며 바쁘게 일하는 송화에게 한 가지 제안이 건네진다. 그러나 어쩌고 저저꼬 테스트 넘어 갈때ㅇ어허허허어ㅓㅓ헣허허허허허허허ㅓ허하호ㅓㅏㅇ너ㅏㅎㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
              </figcaption>
          </figure>
        </Link>
    </section>
  )
}
