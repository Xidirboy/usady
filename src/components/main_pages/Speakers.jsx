import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { gsap } from "gsap";

const Speakers = () => {
  const sliderRef = useRef(null);
  const textSectionRef = useRef(null);
  const formSectionRef = useRef(null);

  // States to track if the animation has been triggered
  const [hasAnimatedTextSection, setHasAnimatedTextSection] = useState(false);
  const [hasAnimatedFormSection, setHasAnimatedFormSection] = useState(false);

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
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, []);

  useEffect(() => {
    const animateOnScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("text-section_1") && !hasAnimatedTextSection) {
            gsap.to(entry.target, {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            });
            setHasAnimatedTextSection(true); // Set flag to true after animation
          } else if (entry.target.classList.contains("form-section_1") && !hasAnimatedFormSection) {
            gsap.to(entry.target, {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            });
            setHasAnimatedFormSection(true); // Set flag to true after animation
          }
        } else {
          if (entry.target.classList.contains("text-section_1") && !hasAnimatedTextSection) {
            gsap.to(entry.target, {
              x: -100,
              opacity: 0,
              duration: 1,
              ease: "power2.out",
            });
          } else if (entry.target.classList.contains("form-section_1") && !hasAnimatedFormSection) {
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
    <div className="bg-[#191721]">
      <div className="container py-[60px] px-[10px] sm:px-0 flex flex-col-reverse lg:flex-row lg:justify-between lg:gap-[38px] gap-[28px] justify-between items-center">
        <div
          ref={textSectionRef}
          className="flex text-section_1 lg:pl-[70px] pl-[10px] justify-center lg:flex-col flex-col-reverse gap-[20px]"
        >
          <h1 className="font-bold text-white text-[38px] text-center leading-[51.3px]">
            Наши опытные <span className="text-[#4EAE32]">Cпикеры</span>
          </h1>
          <p className="text-white text-center flex justify-center text-[14px] leading-[18.9px]">
            Студенты получают доступ к отдельным мини-курсам по подготовке к
            собеседованию и
          </p>
          <div className="flex items-center justify-center gap-[12px]">
            <button onClick={() => sliderRef.current.slickPrev()}>
              <img src="/images/img/Input.png" alt="Previous" />
            </button>
            <button onClick={() => sliderRef.current.slickNext()}>
              <img src="/images/img/Input_1.png" alt="Next" />
            </button>
          </div>
        </div>
        <div ref={formSectionRef} className="lg:w-2/3 form-section_1 w-full">
          <Slider className="" {...settings} ref={sliderRef}>
            {[1, 2, 3, 4].map((item, index) => (
              <div key={index} className=" mx-[10xp]">
                <div
                  className="container w-[95%] bg-cover bg-center bg-no-repeat h-[400px]"
                  style={{
                    backgroundImage: `url('/images/img/teacher.png')`,
                    backgroundPosition: "top center",
                  }}
                >
                  {/* <img className="w-[95%] mt" src="/images/img/teacher.png" alt="Teacher" /> */}
                </div>
                <div className="py-4">
                  <p className="flex gap-2 text-white lg:justify-start text-center justify-center font-medium leading-[16.2px]">
                    <img src="/images/img/briefcase.png" alt="Briefcase" /> Опыт
                    работы: 5.5+ лет
                  </p>
                  <h1 className="text-white font-bold lg:text-left text-center text-[18px] leading-[24.3px] mt-[6px]">
                    Sarvarbek Nurmatov
                  </h1>
                  <p className="font-normal text-white lg:text-left text-center text-[14px] leading-[18.9px] mt-2">
                    Работал Backend-разработчиком в Paymeda и Uzinfocom.
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
