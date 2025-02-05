// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper 컴포넌트 사용 예시
export default function ArgorithmIP() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={5}
      pagination={{ clickable: true }}
      navigation={true}  // 네비게이션 버튼 활성화
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
}
