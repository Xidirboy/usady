import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { gsap } from "gsap";

const Contact = () => {
  const [full_name, setFull_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".scroll-section_5");
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
      gsap.fromTo(
        ".scroll-section_5",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1 }
      );
    }
  }, [isVisible]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const numericPhoneNumber = phone_number.replace(/[-()_]/g, ""); // Simplified phone number cleaning

    if (numericPhoneNumber.length < 13) {
      setError("Telefon raqami kamida 9 ta raqamdan iborat bo'lishi kerak.");
      return;
    }

    setError("");

    axios
      .post("https://ustudy.201.uz/en/api/v1/application/create_application/", {
        full_name,
        phone_number,
      })
      .then((res) => {
        alert("Malumotlar yuborildi!!");
        setFull_name("");
        setPhone_number("");
      })
      .catch((e) => {
        setError("Xato yuz berdi. Iltimos, qayta urinib ko'ring.");
      });
  };

  return (
    <div id="maslahat" className="bg-[#021127]">
      <div className="container py-[60px]">
        <div className="bg-[#04152F] scroll-section_5 rounded-[20px] p-[30px] border flex items-center border-[#FFFFFF1F]">
          <div>
            <h1 className="text-white font-bold text-[38px] leading-[51.3px]">
              Мы подберем для вас идеальный курс,
              <br />
              <span className="text-[#4EAE32]">
                исходя из ваших интересов и целей!
              </span>
            </h1>
            <p className="font-normal text-[14px] leading-[18.9px] text-[#FFFFFFCC] mt-4">
              Студенты получают доступ к отдельным мини-курсам по подготовке к
              собеседованию и
            </p>
            <div className="lg:pr-[150px] pr-0 mt-[30px]">
              <form
                action=""
                onSubmit={handleSubmit}
                className="p-6 bg-[#37344740] rounded-xl"
              >
                <h1 className="text-white font-semibold text-[18px] leading-[24.3px] mb-4">
                  Ваши котакты
                </h1>
                <input
                  className="bg-[#2E2A3A] text-white w-full rounded-xl px-[20px] py-[14px] border-[#474452]"
                  type="text"
                  placeholder="Ism"
                  value={full_name}
                  onChange={(e) => setFull_name(e.target.value)}
                  required
                />
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
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className="mt-4 sm:flex grid gap-4">
                  <button
                    type="submit"
                    className="w-[80%] px-[20px] sm:py-[15px] py-[14px] rounded-xl hover:bg-white hover:text-[#4EAE32] bg-[#4EAE32] text-white font-semibold text-[16px] leading-[19.6px]"
                  >
                    Отправить заявку
                  </button>
                  <p className="text-white">
                    Регистрируясь, вы подтверждаете, что прочитали и
                    <span className="text-[#4481F6]">
                      согласны с Политикой конфиденциальности.
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:flex hidden">
            <img
              className="w-[544px]"
              src="/images/img/Group_img.png"
              alt="group"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
