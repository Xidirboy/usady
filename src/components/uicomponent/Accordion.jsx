import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa"; // React Icons uchun

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div onClick={onClick} className="border border-[#E0E0E0] cursor-pointer p-[30px] mt-[26px] bg-[#FFFF] mb-[20px] rounded-[12px]">
      <div
        onClick={onClick}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          cursor: "pointer",
        }}
      >
        <span>{title}</span>
        <span>
          {isOpen ? (
            <img
              className="w-[48px] h-[48px]"
              src="/images/img/accordion_2.png"
              alt="qweq"
            />
          ) : (
            <img
              className="w-[48px] h-[48px]"
              src="/images/img/accordion_1.png"
              alt="qweq"
            />
          )}
        </span>
      </div>
      {isOpen && <div>{content}</div>}
    </div>
  );
};

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={index === openIndex}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
