import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Ourmission = () => {
  const textSectionRef = useRef(null);
  const formSectionRef = useRef(null);

  // States to track if the animation has been triggered
  const [hasAnimatedTextSection, setHasAnimatedTextSection] = useState(false);
  const [hasAnimatedFormSection, setHasAnimatedFormSection] = useState(false);

  useEffect(() => {
    const animateOnScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (
            entry.target.classList.contains("text-section_5") &&
            !hasAnimatedTextSection
          ) {
            gsap.to(entry.target, {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            });
            setHasAnimatedTextSection(true); // Set flag to true after animation
          } else if (
            entry.target.classList.contains("form-section_5") &&
            !hasAnimatedFormSection
          ) {
            gsap.to(entry.target, {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            });
            setHasAnimatedFormSection(true); // Set flag to true after animation
          }
        } else {
          if (
            !hasAnimatedTextSection &&
            entry.target.classList.contains("text-section_5")
          ) {
            gsap.to(entry.target, {
              x: -100,
              opacity: 0,
              duration: 1,
              ease: "power2.out",
            });
          } else if (
            !hasAnimatedFormSection &&
            entry.target.classList.contains("form-section_5")
          ) {
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
    <div className="py-[60px] container w-full lg:flex grid items-center gap-[60px]">
      <div ref={textSectionRef} className="lg:w-1/3 text-section_5 w-full">
        <img className="w-full" src="/images/img/mission.png" alt="Mission" />
      </div>
      <div ref={formSectionRef} className="lg:w-2/3 form-section_5 w-full">
        <h1 className="font-bold text-[48px] lg:text-left text-center mx-auto leading-[64.8px] text-[#191721]">
          Наша Миссия
        </h1>
        <p className="mt-[20px] font-normal text-[20px] lg:text-left text-center leading-[27px] text-[#77767A]">
          Мы нацелены на создание инновационной и креативной среды, которая
          стимулирует студентов к исследованиям, разработке новаторских решений
          и преодолению вызовов в области информационных технологий, чтобы
          способствовать развитию Узбекистана как технологической державы.
        </p>
        <p className="flex gap-[12px] mt-[20px] lg:text-left text-center text-[18px] text-[#191721] leading-[24.3px]">
          <img src="/images/img/ic_check.png" alt="Check" /> MARKETING STRATEGY
        </p>
        <p className="flex gap-[12px] mt-[24px] lg:text-left text-center line-clamp-1 text-[18px] text-[#191721] leading-[24.3px]">
          <img src="/images/img/ic_check.png" alt="Check" /> INTERNAL
          COMMUNICATIONS
        </p>
        <p className="flex gap-[12px] mt-[24px] lg:text-left text-center text-[18px] text-[#191721] leading-[24.3px]">
          <img src="/images/img/ic_check.png" alt="Check" /> EXPERIENTIAL DESIGN
        </p>
      </div>
    </div>
  );
};

export default Ourmission;
