import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Carousel({ images, autoplay = true }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      navigation
      pagination={{ clickable: true }}
      effect="fade"
      loop
      autoplay={autoplay ? { delay: 5000, disableOnInteraction: false } : false}
      className="hero-carousel"
    >
      {images.map((img) => (
        <SwiperSlide key={img.id}>
          <img src={img.image} alt={img.caption} className="w-full h-full object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
