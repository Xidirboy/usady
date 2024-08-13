import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Uzinfocom = () => {
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
    <div className="bg-[#191721] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/img/UzInfoCom-bg.png')" }}>
      <div className="lg:flex grid justify-between py-[90px] container rounded-t-[70px]">
        <div ref={textSectionRef} className="flex text-section flex-col mx-auto lg:mx-0 gap-[30px] w-[60%]">
          <div className="mx-auto lg:mx-0">
            <img src="/images/img/Logo_uz.png" alt="Logo" />
          </div>
          <div>
            <h1 className="font-bold lg:text-start text-center mx-auto text-white text-[38px] leading-[51.3px]">
              Мы создаём уникальные IT - решения, которые помогают обществу и
              нашим партнёрам достигать своих целей, обеспечивают комфорт и
              наполняют жизнь новыми возможностями!
            </h1>
          </div>
          <div className="flex gap-4 mx-auto lg:mx-0 items-center">
            <img src="/images/img/Group_user.png" alt="Person" />
            <div>
              <p className="text-white font-black text-[16px] leading-[24px]">
                Гимранов Эмиль Илдарович
              </p>
              <p className="text-[#FFFFFFD9] text-[14px] leading-[21px]">
                Генеральный директор
              </p>
            </div>
          </div>
        </div>
        <div ref={formSectionRef} className="flex form-section flex-col lg:mt-0 mt-[20px] gap-[16px]">
          <div className="py-[21px] px-[24px] bg-[#0000001F] rounded-2xl">
            <div className="flex justify-between">
              <h1 className="font-bold text-white text-[22px] leading-[29.7px]">Результаты</h1>
              <img src="/images/img/tick-circle.png" alt="Tick" />
            </div>
            <p className="font-normal text-[16px] text-white mt-[15px] leading-[23.52px] pr-[70px]">Ориентирование на достижение лучших <br /> результатов</p>
          </div>
          <div className="py-[21px] px-[24px] bg-[#0000001F] rounded-2xl">
            <div className="flex justify-between">
              <h1 className="font-bold text-white text-[22px] leading-[29.7px]">Результаты</h1>
              <img src="/images/img/tick-circle.png" alt="Tick" />
            </div>
            <p className="font-normal text-[16px] text-white mt-[15px] leading-[23.52px] pr-[70px]">Ориентирование на достижение лучших <br /> результатов</p>
          </div>
          <div className="py-[21px] px-[24px] bg-[#0000001F] rounded-2xl">
            <div className="flex justify-between">
              <h1 className="font-bold text-white text-[22px] leading-[29.7px]">Результаты</h1>
              <img src="/images/img/tick-circle.png" alt="Tick" />
            </div>
            <p className="font-normal text-[16px] text-white mt-[15px] leading-[23.52px] pr-[70px]">Ориентирование на достижение лучших <br /> результатов</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uzinfocom;
