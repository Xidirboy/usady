import React, { useEffect, useState } from "react";
import Accordion from "../uicomponent/Accordion";
import axios from "axios";

const items = [
  {
    title: "Yosh cheklovlari bormi?",
    content:
      "Dasturlash sohasida yangi boshlovchilar ham, o‘z malakasini oshirishni istagan mutaxassislar ham Ustudy Akademiyasida o‘qishlari mumkin. Dasturlar barcha darajadagi treninglar uchun mo‘ljallangan.",
  },
  { title: "Kurslar kimlar uchun?"
, content: "Ustudy akademiyasi dasturlash sohasida yangi boshlanuvchilarni ham, o'z malakasini oshirishni istagan mutaxassislarni ham tayyorlashi mumkin. Dasturlar barcha darajadagi ta'lim uchun mo'ljallangan."
 },
  
];

const Faq = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://ustudy.201.uz/uz/api/v1/faq/faqs/")
      .then((response) => {
        setData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("xatolik:", error);
      })
      .finally(() => {});
  }, []);
  return (
    <div className="container py-[30px] ">
      <div className="bg-[#2D2E2D0A] py-[45px] lg:px-[190px] px-[50px] rounded-[30px] text-center">
        <h1 className="font-bold text-[48px] leading-[64.8px] text-[#191721]">
          FAQ
        </h1>
        <div>
          <Accordion items={items} />
        </div>
      </div>
    </div>
  );
};

export default Faq;
