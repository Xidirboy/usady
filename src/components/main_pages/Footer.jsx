import React from "react";

const Footer = () => {
  return (
    <div id="kontaktlar" className="bg-[#021127]">
      <div className=" pt-10 pb-5 sm:px-[70px] px-[60px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="flex flex-col  gap-1">
            <p className="font-medium lg:text-left text-center text-[16px] text-[#FFFFFF66] leading-[20px]">Pages</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Курсы</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">О нас</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Консультация</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Контакты</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Cпикеры</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Наши ценности</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium lg:text-left text-center text-[16px] text-[#FFFFFF66] leading-[20px]">Курсы</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Java Графический дизайн</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Backend-разработчик</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Python-разработчик</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">JavaScript Frontend</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Программирование на TypeScript</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Графический дизайн</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium lg:text-left text-center text-[16px] text-[#FFFFFF66] leading-[20px]">Support</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Contact Us</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Наш адрес</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Help Center</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium lg:text-left text-center text-[16px] text-[#FFFFFF66] leading-[20px]">Resources</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Product Updates</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Customer Stories</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Testimonials</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Contact Us</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">Blog</p>
            <p className="font-normal lg:text-left text-center text-white text-[14px] leading-[34px]">FAQs</p>
          </div>
          <div className="flex items-center justify-center flex-col gap-4">
            <p className="font-medium lg:text-left text-center text-[16px] text-[#FFFFFF66] leading-[20px]">Social Media</p>
            <div className="flex gap-4  mt-1">
              <img src="/images/img/Linkedin.png" alt="LinkedIn" className="w-6 h-6" />
              <img src="/images/img/Linkedin.png" alt="LinkedIn" className="w-6 h-6" />
              <img src="/images/img/Linkedin.png" alt="LinkedIn" className="w-6 h-6" />
              <img src="/images/img/Linkedin.png" alt="LinkedIn" className="w-6 h-6" />
            </div>
            <div className="mt-3">
              <p className="flex items-center lg:text-left text-center gap-2 text-[14px] text-white leading-[16.8px]">
                <img src="/images/img/gmail.png" alt="Email" className="w-[21p] h-[16px]" /> contact@ustudy.uz
              </p>
            </div>
            <div className="mt-3">
              <p className="flex items-center lg:text-left text-center gap-2 text-[14px] text-white leading-[16.8px]">
                <img  src="/images/img/Phone.png" alt="Phone" className="w-5 h-5" /> +998 55 501 53 53
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#FFFFFF1F] my-4"></div>
        <div className="flex flex-col lg:flex-row lg:gap-0 gap-2 justify-between items-center">
          <div>
            <img className="w-[85px] h-[60px]" src="/images/img/Logo_1.png" alt="Logo"  />
          </div>
          <div>
            <p className="text-[#949494] font-normal text-[14px] leading-[18px] text-center lg:text-left">
              Copyright © 2024 Uzinfocom. All Rights Reserved.
            </p>
          </div>
          <div className="flex gap-6 mt-6 lg:mt-0">
            <p className="text-[#FFFF] font-normal text-[14px] leading-[18.9px]">Terms of Service</p>
            <p className="text-[#FFFF] font-normal text-[14px] leading-[18.9px]">Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
