import { Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";


const Testimonial = () => {
  const {data} = useFetchData(`${BASE_URL}/appreviews`);
  console.log("data: ", data);
  return (
    <div className="mt-[30px] lg:mt-[55px]">
      <Swiper
        // install Swiper modules
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {
          data.map((review) => (
        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-3 ">
            <div className="flex items-center gap-[13px]">
              <div>
                <h4 className="text-[18px] leading-[30px] text-headingColor font-[600]">
                  {review.name}
                </h4>
              </div>
            </div>

            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
              {review.message}
            </p>
          </div>
        </SwiperSlide>
          ))}  
      </Swiper>
    </div>
  );
};

export default Testimonial;
