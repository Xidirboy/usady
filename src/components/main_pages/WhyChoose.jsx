import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const WhyChoose = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); 

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".scroll-section");
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
      gsap.to(".scroll-section", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.5,
      });
    }
  }, [isVisible]);

  return (
    <div className="bg-[#191721] py-[60px]">
      <div className="container">
        <h1 className="text-white font-bold text-[38px] lg:text-left text-center leading-[51.3px]">
          Почему выбирают <br />{" "}
          <span className="text-[#4EAE32]">именно нас?</span>
        </h1>

        <div className="scroll-section grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-[40px] opacity-0 translate-y-12 transition-transform duration-1000 ease-out">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index} className="flex flex-col group justify-center items-center p-6">
              <div className="bg-[#2A253A] w-[90%] h-8 rounded-xl transition-all duration-300 ease-in-out group-hover:opacity-0 z-10"></div>
              <div className="bg-[#201B30] group-hover:bg-[#4EAE32] -mt-[15px] transition-all duration-300 ease-in-out p-6 rounded-xl z-20">
                <img
                  className="w-[60px] h-[60px]"
                  src="/images/img/like.png"
                  alt="qwq"
                />
                <h1 className="text-[#FFFFFF] mt-[16px] font-bold text-[18px] leading-[24.3px]">
                  Студенты и выпускники специальностей информационных технологий:
                </h1>
                <p className="text-[#FFFFFF] mt-[8px] font-normal text-[14px] leading-[18.9px]">
                  Для тех, кто стремится к карьере в IT-индустрии, курс Back-end
                  разработчика на Java предоставляет отличную возможность углубить
                  знания и навыки в области разработки серверной части
                  веб-приложений и программных систем.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
