import React, { useState } from "react";
import { HistorysContainer } from "../../styleComponents/sections/commonStyle/HistorysStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import HistoryShowSlider from "../utilsSections/HistoryShowSlider";

const Historys = ({ data = {} }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HistorysContainer>
        <div className="card">
          <TitelBlack word={data?.title ?? ""} />
          <div className="slider_target">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              className="HistorysSlider"
              // autoplay={{
              //   delay: 3000,
              //   disableOnInteraction: false,
              //   pauseOnMouseEnter: true,
              // }}
              // modules={[Autoplay]}
            >
              {data?.items?.map((item, index) => (
                <SwiperSlide className="item" key={index}>
                  <div
                    onClick={() => {
                      setIsOpen(index + 1);
                    }}
                    className="poster"
                    style={{ backgroundImage: `url("${item?.image}")` }}
                  >
                    <div
                      className="title"
                      dangerouslySetInnerHTML={{ __html: item?.title }}
                    />
                    <div className="duration">
                      <div>
                        <svg
                          width="130"
                          height="3"
                          viewBox="0 0 130 3"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            opacity="0.4"
                            width="130"
                            height="3"
                            rx="1.5"
                            fill="white"
                          />
                          <rect width="55" height="3" rx="1.5" fill="white" />
                        </svg>
                      </div>
                      {/* <div className="time">0:30</div> */}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        {/* <Modal isOpen={isOpen} onClose={() => setIsOpen(null)} size={"xl"}>
          <ModalOverlay />
          <ModalContent
            style={{ maxWidth: "95%", width: 650, borderRadius: 20 }}
          >
            <ModalHeader>
              <div dangerouslySetInnerHTML={{ __html: isOpen?.title ?? "" }} />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Video source={isOpen?.video} poster={isOpen?.image} />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal> */}
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(null)}
          size={"xl"}
          style={{ background: "darkgray" }}
        >
          <ModalOverlay />
          <ModalContent
            style={{
              width: "100%",
              borderRadius: 0,
              maxWidth: "100%",
              height: "100vh",
              margin: 0,
            }}
          >
            <ModalHeader style={{ padding: "10px" }}>
              <div dangerouslySetInnerHTML={{ __html: data?.title ?? "" }} />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody style={{ padding: "10px" }}>
              <HistoryShowSlider items={data?.items ?? []} isOpen={isOpen} />
            </ModalBody>
            {/* <ModalFooter></ModalFooter> */}
          </ModalContent>
        </Modal>
      </HistorysContainer>
    </>
  );
};

export default Historys;
