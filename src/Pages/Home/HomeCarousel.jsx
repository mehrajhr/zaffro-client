// src/components/HomeCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeCarousel = () => {
  const banners = [
    {
      id: 1,
      title: "Accessorize Your Style",
      subtitle: "Minimal, elegant accessories that define your personality.",
      image: "https://i.ibb.co.com/TxYM9Pc8/banner1.webp",
      link: "/products",
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Discover the latest trends",
      image: "https://i.ibb.co.com/Vc4Z056K/banner2.webp",
      link: "/new-arrivals",
    },
    {
      id: 3,
      title: "Exclusive Offers",
      subtitle: "Limited-time deals just for you",
      image: "https://i.ibb.co.com/GQ1VNttr/banner3.webp",
      link: "/sale/offers",
    },
  ];

  return (
    <div className="w-ful">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="rounded-none"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="relative h-[40vh] md:h-[60vh] flex items-center justify-center"
              style={{
                backgroundImage: `url(${banner.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative text-center text-white px-6 max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-bold mb-3 leading-tight">
                  {banner.title}
                </h2>
                <p className="text-lg md:text-xl mb-6 opacity-90">
                  {banner.subtitle}
                </p>
                <a
                  href={banner.link}
                  className="border border-white px-6 py-2 md:px-8 md:py-3 text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeCarousel;
