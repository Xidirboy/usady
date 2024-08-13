import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Address = () => {
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
    <div className="container py-[60px] lg:flex grid items-center gap-[60px]">
      <div ref={textSectionRef} className="rounded-[20px] text-section">
        <iframe
          className="lg:w-[600px] w-full"
          title="Google Maps - Bizning ofisimiz joylashuvi"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.3068070358313!2d69.26432691514493!3d41.30218875300856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef48af02cbe0b%3A0xb521f9f68613cfa0!2sMirzo%20Ulugbek%20Innovation%20Center!5e0!3m2!1sru!2s!4v1723138066499!5m2!1sru!2s"
          width="600"
          height="450"
          style={{ border: 0, borderRadius: "20px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div ref={formSectionRef} className="flex flex-col gap-[15px] form-section">
        <div>
          <p className="font-medium lg:text-left text-center text-[16px] text-[#201E1E] leading-[21.6px]">
            Адрес
          </p>
          <h1 className="font-semibold lg:text-left text-center text-[22px] text-[#213B5D] leading-[29.7px] mt-[10px]">
            Мирзо-Улугбекский район, ул. Муминова 4а. Министерство цифровых
            технологий.
          </h1>
        </div>
        <div>
          <p className="font-medium lg:text-left text-center text-[16px] text-[#201E1E] leading-[21.6px]">
            Ориентир
          </p>
          <h1 className="font-semibold lg:text-left text-center text-[#213B5D] text-[22px] leading-[29.7px] mt-[10px]">
            Между IT-park и Aloqabank, Министерство цифровых технологий
            Республики Узбекистан.
          </h1>
        </div>
        <div>
          <p className="font-medium lg:text-left text-center text-[16px] text-[#201E1E] leading-[21.6px]">
            Телефон
          </p>
          <h1 className="font-semibold text-[#213B5D] lg:text-left text-center text-[22px] leading-[29.7px] mt-[10px]">
            +998 55 501 53 53
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Address;
