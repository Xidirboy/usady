import React, { useState } from "react";

const LanguageSwitcher = () => {
  const [selectedLang, setSelectedLang] = useState("RU");

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
  };

  return (
    <div className="flex gap-2 items-center">
      <span
        onClick={() => handleLanguageChange("RU")}
        className={`cursor-pointer ${selectedLang === "RU" ? "text-white border-r-2 pr-2 border-white" : "text-[#FFFFFF99]"} transition-colors duration-300`}
      >
        RU
      </span>
      <span
        onClick={() => handleLanguageChange("UZ")}
        className={`cursor-pointer ${selectedLang === "UZ" ? "text-white border-r-2 pr-2 border-white" : "text-[#FFFFFF99]"} transition-colors duration-300`}
      >
        UZ
      </span>
      <span
        onClick={() => handleLanguageChange("EN")}
        className={`cursor-pointer ${selectedLang === "EN" ? "text-white border-r-2 pr-2 border-white" : "text-[#FFFFFF99]"} transition-colors duration-300`}
      >
        EN
      </span>
    </div>
  );
};

export default LanguageSwitcher;
