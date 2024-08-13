import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "./styles.css";
import { useDispatch } from "react-redux";

const Main = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();
  useEffect(() => {
    // dispatch({ type: "SET_LOADING", payload: true });
    axios
      .get("https://ustudy.201.uz/uz/api/v1/course/courses/")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("xatolik:", error);
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 3000);
        // dispatch({ type: "SET_LOADING", payload: false });
      });
  }, []);

  return (
    <div
      className="lg:h-[100vh] sm:h-[1000px] h-[1200px]"
      style={{
        backgroundImage:
          "url('/images/img/main_img.png'), linear-gradient(107.67deg, rgba(24, 19, 38, 0.96) 23.58%, rgba(24, 19, 38, 0.879377) 47.9%, rgba(24, 19, 38, 0.911744) 61.57%, rgba(24, 19, 38, 0.880592) 70.72%, rgba(24, 19, 38, 0.94) 79.14%)",
      }}
    >
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <img
            src="/images/img/logo_1.png"
            alt="Loading"
            className=" animate-spin"
          />
        </div>
      )}

      <div className="container bg-cover bg-center bg-no-repeat h-[100vh] w-full custom-gradient">
        <div className="relative bg-cover bg-center bg-no-repeat h-[100vh] w-full">
          <img
            className="absolute right-0 bottom-0 z-10"
            src="/images/img/Vector_3.png"
            alt="Vector decoration"
          />
          <div className="flex flex-col-reverse lg:flex-row lg:justify-between absolute lg:top-[175px]  top-[100px] w-full px-4 pb-4 lg:px-0">
            <div className="w-full lg:w-1/3 mt-[30px]">
              <h1 className="text-white font-bold lg:text-left text-center text-[38px]">
                Создаем востребованных <br />
                <span className="text-[#4EAE32]">специалистов</span>
              </h1>
              <p className="text-white mt-5 lg:text-left text-center">
                Этот курс дает понимание UX-мышления, исследований, генерации
                ценных дизайнерских идей, структурирования процесса и того, как
                организовать все это профессионально.
              </p>
              <a
                href="#konsul"
                className="lg:text-left text-center flex items-center justify-center"
              >
                <button
                  aria-label="Zayavka qoldirish"
                  className="flex items-center sm:gap-[76px] gap-[30px] rounded-[34px] hover:bg-[#FFFFFF] hover:text-[#4EAE32] mt-[43px] text-[20px] sm:font-bold font-medium text-[#FFFF] bg-[#4EAE32] sm:px-[42px] px-[22px] py-[23px]"
                >
                  Оставить заявку
                  <img
                    className="group-hover:hidden w-[18px] h-[18px] object-cover"
                    src="/images/img/layer.png"
                    alt="Zayavka qoldirish ikonkasi"
                  />
                </button>
              </a>
            </div>

            <div className="w-full z-999">
              {!loading && (
                <Swiper
                  pagination={{
                    dynamicBullets: true,
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, Pagination]}
                >
                  {data?.map((item, index) => (
                    <SwiperSlide
                      key={index}
                      className="!w-full flex gap-[10px]"
                    >
                      <div
                        className="relative text-center z-999 bg-cover bg-center w-full bg-no-repeat mt-8 lg:mt-0 lg:ml-[100px] h-[425px] rounded-3xl"
                        style={{
                          backgroundImage: `url('${item.image}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        <div className="absolute bottom-[36px] left-[32px]">
                          <h1 className="text-white lg:text-left text-center font-bold text-[32px] leading-[43.2px]">
                            {item.title}
                          </h1>

                          <button className="rounded-3xl mt-[21px] bg-[#26479682] text-white px-[14px] py-[6px]">
                            {item.period_in_month} месяца
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
