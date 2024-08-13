import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { gsap } from "gsap";

const Demand = () => {
  const sliderRef = useRef(null);

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
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const textSectionRef = useRef(null);
  const formSectionRef = useRef(null);

  const [hasAnimatedTextSection, setHasAnimatedTextSection] = useState(false);
  const [hasAnimatedFormSection, setHasAnimatedFormSection] = useState(false);

  useEffect(() => {
    const animateOnScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('text-section') && !hasAnimatedTextSection) {
            gsap.to(entry.target, {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            });
            setHasAnimatedTextSection(true); 
          } else if (entry.target.classList.contains('form-section') && !hasAnimatedFormSection) {
            gsap.to(entry.target, {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            });
            setHasAnimatedFormSection(true); 
          }
        } else {
          if (!hasAnimatedTextSection && entry.target.classList.contains('text-section')) {
            gsap.to(entry.target, {
              x: -100,
              opacity: 0,
              duration: 1,
              ease: "power2.out",
            });
          } else if (!hasAnimatedFormSection && entry.target.classList.contains('form-section')) {
            gsap.to(entry.target, {
              x: 100,
              opacity: 0,
              duration: 1,
              ease: "power2.out",
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
      threshold: 0.1,
    });

    if (textSectionRef.current) {
      observer.observe(textSectionRef.current);
    }

    if (formSectionRef.current) {
      observer.observe(formSectionRef.current);
    }

    return () => {
      if (textSectionRef.current) {
        observer.unobserve(textSectionRef.current);
      }
      if (formSectionRef.current) {
        observer.unobserve(formSectionRef.current);
      }
    };
  }, [hasAnimatedTextSection, hasAnimatedFormSection]);

  return (
    <div className="bg-[#021127]">
      <div className="container py-[60px] lg:flex lg:gap-[100px] flex-none">
        <div ref={textSectionRef} className="lg:w-[30%] text-section w-full">
          <h1 className="font-bold text-[38px] lg:text-left text-center leading-[51.3px] text-white">
            Востребованность программистов в Узбекистане
          </h1>
          <p className="font-normal lg:text-left text-center text-[18px] leading-[24.3px] text-[#FFFFFFCC] mt-[16px]">
            Количество вакансий разработчиков – 611
          </p>
          <div className="flex gap-[12px] items-center justify-center lg:mx-0 mx-auto mt-[30px]">
            <button onClick={() => sliderRef.current.slickPrev()}>
              <img src="/images/img/Input.png" alt="Previous" />
            </button>
            <button onClick={() => sliderRef.current.slickNext()}>
              <img src="/images/img/Input_1.png" alt="Next" />
            </button>
          </div>
        </div>
        <div ref={formSectionRef} className="lg:w-[60%] form-section text-center lg:mt-0 mt-[20px]">
          <Slider {...settings} ref={sliderRef}>
            {[1, 2, 3, 4].map((item, index) => (
              <div key={index} className="px-2 w-full">
                <img src="/images/img/JobList.png" alt="Job List" />
              </div>
            ))}
          </Slider>
          <p className="text-[#FFFFFFCC] mt-[16px]">
            Все данные взяты с ресурса
            <span className="text-[#4481F6]">hh.uz</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Demand;
