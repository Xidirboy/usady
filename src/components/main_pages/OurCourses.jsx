import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { gsap } from "gsap";

const OurCourses = () => {
  const sliderRef = useRef(null);
  const [data,setData]=useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); 

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".scroll-section_1");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          if (!hasAnimated) { 
            setIsVisible(true);
            setHasAnimated(true); 
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAnimated]);

  useEffect(() => {
    if (isVisible) {
      gsap.to(".scroll-section_1", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.5,
      });
    }
  }, [isVisible]);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://ustudy.201.uz/uz/api/v1/course/courses/")
      .then((response) => {
        setData(response.data);
        console.log(response.data[1].big_background_image

        );
      })
      .catch((error) => {
        console.error("xatolik:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div id="kurs" className="bg-[#191721] ">
      <div className="container  px-[60px]">
        <div className="sm:flex  grid  justify-between items-center">
          <h1 className="font-bold  text-[38px] leading-[51.3px] text-white">
            Наши курсы
          </h1>
          <div className="flex gap-[12px]">
            <div className="">
              <button onClick={() => sliderRef.current.slickPrev()}>
                <img src="/images/img/Input.png" alt="sasa" />
              </button>
            </div>
            <div>
              <button onClick={() => sliderRef.current.slickNext()}>
                <img src="/images/img/Input_1.png" alt="sas" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-[30px] scroll-section_1 opacity-0 translate-y-12 transition-transform duration-1000 ease-out">
          <Slider {...settings} ref={sliderRef}>
            
            <div className="">
              <div className="bg-[#AF51C3] rounded-xl p-6 sm:mr-[20px] mr-0">
                <div className="flex justify-between">
                  <button className="bg-[#FFFFFF40] p-[13px] rounded-xl">
                    <img src="/images/img/code.png" alt="aaaa" />
                  </button>
                  <button className="bg-transparent overflow-hidden border-[#FFFFFF80] border h-[36px] flex gap-2 items-center p-[13px] rounded-xl">
                    <img
                      className="w-[20px] h-[20px]"
                      src="/images/img/calendar.png"
                      alt="ssss"
                    />
                    <span className="text-white">1,5 месяца</span>
                  </button>
                </div>
                <div className="mt-[46px] mb-[30px]">
                  <h1 className="font-bold text-white text-[24px] leading-[32.4px]">
                    Python-разработчик
                  </h1>
                  <p className="font-normal text-white text-[14px] leading-[18.9px] mt-[8px]">
                    Студенты получают доступ к отдельным мини-курсам по
                    подготовке к собеседованию и составлению резюме. А лучших
                    выпускников мы трудоустраиваем в компании партнеров.
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <button className="px-[12px] line-clamp-1 py-[9.5px] bg-[#FFFFFF40] text-white rounded-xl">
                    2 000 000 сум / месяц
                  </button>
                  <button className="flex hover:gap-1 gap-2 text-white">
                    Подробнее <img src="/images/img/arrow-right.png" alt="" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-[#3FA421] rounded-xl p-6 sm:mr-[20px] mr-0">
                <div className="flex justify-between">
                  <button className="bg-[#FFFFFF40] p-[13px] rounded-xl">
                    <img src="/images/img/code.png" alt="qqq" />
                  </button>
                  <button className="bg-transparent overflow-hidden border-[#FFFFFF80] border h-[36px] flex gap-2 items-center p-[13px] rounded-xl">
                    <img
                      className="w-[20px] h-[20px]"
                      src="/images/img/calendar.png"
                      alt="www"
                    />
                    <span className="text-white">1,5 месяца</span>
                  </button>
                </div>
                <div className="mt-[46px] mb-[30px]">
                  <h1 className="font-bold text-white text-[24px] leading-[32.4px]">
                    Python-разработчик
                  </h1>
                  <p className="font-normal text-white text-[14px] leading-[18.9px] mt-[8px]">
                    Студенты получают доступ к отдельным мини-курсам по
                    подготовке к собеседованию и составлению резюме. А лучших
                    выпускников мы трудоустраиваем в компании партнеров.
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <button className="px-[12px] line-clamp-1 py-[9.5px] bg-[#FFFFFF40] text-white rounded-xl">
                    2 000 000 сум / месяц
                  </button>
                  <button className="flex gap-2 hover:gap-1 text-white">
                    Подробнее <img src="/images/img/arrow-right.png" alt="" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-[#6551E2] rounded-xl p-6 sm:mr-[20px] mr-0">
                <div className="flex justify-between">
                  <button className="bg-[#FFFFFF40] p-[13px] rounded-xl">
                    <img src="/images/img/code.png" alt="" />
                  </button>
                  <button className="bg-transparent overflow-hidden border-[#FFFFFF80] border h-[36px] flex gap-2 items-center p-[13px] rounded-xl">
                    <img
                      className="w-[20px] h-[20px]"
                      src="/images/img/calendar.png"
                      alt="kkk"
                    />
                    <span className="text-white">1,5 месяца</span>
                  </button>
                </div>
                <div className="mt-[46px] mb-[30px]">
                  <h1 className="font-bold text-white text-[24px] leading-[32.4px]">
                    Python-разработчик
                  </h1>
                  <p className="font-normal text-white text-[14px] leading-[18.9px] mt-[8px]">
                    Студенты получают доступ к отдельным мини-курсам по
                    подготовке к собеседованию и составлению резюме. А лучших
                    выпускников мы трудоустраиваем в компании партнеров.
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <button className="px-[12px] py-[9.5px] line-clamp-1 bg-[#FFFFFF40] text-white rounded-xl">
                    2 000 000 сум / месяц
                  </button>
                  <button className="flex gap-2 text-white hover:gap-1">
                    Подробнее <img src="/images/img/arrow-right.png" alt="" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-[#6551E2] rounded-xl p-6 sm:mr-[20px] mr-0">
                <div className="flex justify-between">
                  <button className="bg-[#FFFFFF40] p-[13px] rounded-xl">
                    <img src="/images/img/code.png" alt="werw" />
                  </button>
                  <button className="bg-transparent overflow-hidden border-[#FFFFFF80] border h-[36px] flex gap-2 items-center p-[13px] rounded-xl">
                    <img
                      className="w-[20px] h-[20px]"
                      src="/images/img/calendar.png"
                      alt="weqewq"
                    />
                    <span className="text-white">1,5 месяца</span>
                  </button>
                </div>
                <div className="mt-[46px] mb-[30px]">
                  <h1 className="font-bold text-white text-[24px] leading-[32.4px]">
                    Python-разработчик
                  </h1>
                  <p className="font-normal text-white text-[14px] leading-[18.9px] mt-[8px]">
                    Студенты получают доступ к отдельным мини-курсам по
                    подготовке к собеседованию и составлению резюме. А лучших
                    выпускников мы трудоустраиваем в компании партнеров.
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <button className="px-[12px] py-[9.5px] bg-[#FFFFFF40] line-clamp-1 text-white rounded-xl">
                    2 000 000 сум / месяц
                  </button>
                  <button className="flex gap-2 hover:gap-1 text-white">
                    Подробнее <img src="/images/img/arrow-right.png" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default OurCourses;