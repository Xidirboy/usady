import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import { gsap } from "gsap";

const Helper = () => {
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [full_name, setFull_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [error, setError] = useState("");

  const textSectionRef = useRef(null);
  const formSectionRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericPhoneNumber = phone_number
      .replace(/[-()_]/g, ""); 
    if (numericPhoneNumber.length < 13) {
      setError("Телефонный номер должен содержать минимум 9 цифр");
      return;
    }

    setError("");

    axios
      .post("https://ustudy.201.uz/en/api/v1/application/create_application/", {
        full_name,
        phone_number,
      })
      .then(() => {
        alert("Данные отправлены");
        setFull_name("");
        setPhone_number("");
      })
      .catch(() => {
        setError("Произошла ошибка. Пожалуйста, попробуйте снова");
      });
  };

  useEffect(() => {
    const animateOnScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animationPlayed) {
          gsap.to(entry.target, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          });
          setAnimationPlayed(true); 
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
  }, [animationPlayed]);

  return (
    <div id="konsul" className="bg-[#191721]">
      <div className="container flex flex-col-reverse lg:flex-row lg:justify-between justify-between lg:gap-[196px] gap-[50px] p-[60px]">
        <div
          ref={textSectionRef}
          className="text-section opacity-0 translate-x-[-100px]"
        >
          <h1 className="font-bold text-white lg:text-left text-center text-[38px] leading-[51.3px]">
            Мы поможем Вам выбрать <br />
            <span className="text-[#4EAE32]">подходящий курс!</span>
          </h1>
          <p className="text-white mt-4 text-[14px] leading-[18.9px] lg:text-left text-center">
            Студенты получают доступ к отдельным мини-курсам по подготовке к
            собеседованию и
          </p>
        </div>
        <div
          ref={formSectionRef}
          className="form-section opacity-0 translate-x-[100px]"
        >
          <form
            action=""
            onSubmit={handleSubmit}
            className="p-6 bg-[#37344740] rounded-xl"
          >
            <h1 className="text-white font-semibold text-[18px] leading-[24.3px] mb-4">
              Ваши контакты
            </h1>
            <input
              className="bg-[#2E2A3A] text-white w-full rounded-xl px-[20px] py-[14px] border-[#474452]"
              type="text"
              placeholder="Имя"
              value={full_name}
              onChange={(e) => setFull_name(e.target.value)}
              required
            />
            <br />
            <InputMask
              name="phone_number"
              className="bg-[#2E2A3A] w-full text-white rounded-xl mt-4 px-[20px] py-[14px] border-[#474452]"
              mask="+998(nn)nnn-nn-nn"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
              placeholder="+998 (__) ___-__-__"
              formatChars={{
                n: "[0-9]",
                a: "[A-Za-z]",
                "*": "[A-Za-z0-9]",
              }}
              required
            />
            {error && <p className="text-red bg-white mt-2">{error}</p>}
            <div className="mt-4 sm:flex grid gap-4">
              <button
                type="submit"
                className="w-[80%] px-[20px] sm:py-[15px] py-[14px] rounded-xl hover:bg-white hover:text-[#4EAE32] bg-[#4EAE32] text-white font-semibold text-[16px] leading-[19.6px]"
              >
                Отправить заявку
              </button>
              <p className="text-white">
                Регистрируясь, вы подтверждаете, что прочитали и согласны с{" "}
                <span className="text-[#4481F6]">
                  Политикой конфиденциальности.
                </span>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Helper;
