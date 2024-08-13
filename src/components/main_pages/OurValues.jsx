import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const OurValues = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".scroll-section_6");
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
    handleScroll(); // Trigger on initial render

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAnimated]);

  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        ".scroll-section_6",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.5 }
      );
    }
  }, [isVisible]);

  return (
    <div className="bg-[#021127]">
      <div className="container rounded-b-[60px] py-[60px]">
        <h1 className="font-bold text-[38px] text-white leading-[51.3px]">
          Наши ценности
        </h1>
        <div className="grid scroll-section_6 md:grid-cols-2 grid-cols-1 gap-[20px] mt-[30px]">
          {[
            { text: "Открытость новому", key: 1 },
            { text: "Открытость новому", key: 2 },
            { text: "Открытость новому", key: 3 },
            { text: "Открытость новому", key: 4 },
          ].map((item) => (
            <div
              key={item.key}
              className="p-[20px] bg-[#37344740] rounded-xl flex gap-[65px]"
            >
              <div className="w-[55%] p-[10px]">
                <div className="flex gap-[10px] items-center">
                  <span className="py-[10px] px-[16px] bg-[#E3E6F8] rounded-full">
                    {item.key}.
                  </span>
                  <h1 className="font-bold text-[22px] leading-[29.7px] text-white">
                    {item.text}
                  </h1>
                </div>
                <p className="mt-[6px] font-normal text-[16px] leading-[21.6px] text-white">
                  Мы всегда в поиске новых перспектив, партнерств с новыми
                  людьми, приобретения новых знаний и решения задач путем
                  внедрения инновационных инструментов
                </p>
              </div>
              <div className="w-[177px]">
                <img src="/images/img/hand.png" alt="hand" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurValues;
