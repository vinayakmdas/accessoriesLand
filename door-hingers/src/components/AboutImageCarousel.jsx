// src/components/AboutImageCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

// Dynamically import all images from the about_image folder
const importImages = import.meta.glob("../assets/about_image/*.{png,jpg,jpeg,svg}", { eager: true, import: "default" });
const images = Object.values(importImages);

const carouselStyle = {
  width: "100%",
  height: "100%",
  minHeight: "350px",
  borderRadius: "1rem",
  overflow: "hidden",
};

const imgStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "1rem",
};

export default function AboutImageCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      loop={true}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="about-image-carousel"
      style={carouselStyle}
    >
      {images.map((src, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={src}
            alt={`About image ${idx + 1}`}
            style={imgStyle}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
