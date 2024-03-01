import Hls from "hls.js";
// import Poster from 'Images/video-poster.png';
// import Poster from "Images/filecover.png";
import Plyr from "plyr";
import { bool, string } from "prop-types";
import React, { useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import "plyr/dist/plyr.css";
import { useTranslation } from "react-i18next";

const Styles = createGlobalStyle`
   :root {
      --plyr-color-main: rgb(0, 170, 88) !important;
      --plyr-control-radius: 8px !important;
   }
`;
const StyledElement = styled.div`
  & .plyr {
    -moz-border-radius: 20px !important;
    -ms-border-radius: 20px !important;
    -o-border-radius: 20px !important;
    -webkit-border-radius: 20px !important;
    border-radius: 16px !important;
    font-family: "Exo2", sans-serif;
    overflow: hidden !important;
    & .plyr__controls {
      justify-content: flex-start;
      padding: 20px 10px 10px 10px;
      & .plyr__controls__item:first-child {
        margin: 0;
      }
      & .plyr__controls__item.plyr__progress__container {
        left: 0;
        margin: 0;
        padding: 0 10px;
        position: absolute;
        top: 0;
        width: 100%;
      }
      & .plyr__progress input[type="range"],
      & .plyr__volume input[type="range"] {
        cursor: pointer;
        &::-webkit-slider-runnable-track {
          border-radius: 2px;
          height: 3px;
        }
        &::-webkit-slider-thumb {
          border-radius: 50%;
          height: 12px;
          width: 12px;
        }
      }
      & .plyr__time {
        font-family: "Exo2", sans-serif !important;
        font-size: 16px !important;
        font-weight: 600;
      }
      & .plyr__time--current {
        margin: 0 auto 0 0;
      }
    }
    & .plyr__poster {
      background-size: cover;
    }
    & .plyr__control--overlaid {
      border: 2px solid rgba(255, 255, 255, 1);
      box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 1px 8px !important;
    }
  }
`;
const Video = ({ isEncryption, source, poster }) => {
  const { i18n } = useTranslation();
  const ref = useRef(null);
  const player = useRef(null);
  useEffect(() => {
    const lang = i18n.language || "uz";
    const defaultOptions = {
      controls: [
        "play-large",
        "play",
        "mute",
        "current-time",
        "progress",
        "duration",
        "airplay",
        "capture",
        "volume",
        "settings",
        "fullscreen",
      ],
      settings: ["quality", "speed"],
      speed: {
        selected: 1,
        options: [0.5, 1, 1.5, 2],
      },
      ratio: "16:9",
      i18n: {
        normal: lang === "uz" ? "Normal" : "Нормальный",
        quality: lang === "uz" ? "Tasvir sifati" : "Качество",
        speed: lang === "uz" ? "Tasvir tezligi" : "Скорость",
      },
    };
    if (Hls.isSupported() && ref.current && isEncryption) {
      const updateQuality = (newQuality) => {
        window.hls.levels.forEach((level, levelIndex) => {
          if (level.height === newQuality) {
            window.hls.currentLevel = levelIndex;
          }
        });
      };
      const hls = new Hls();
      hls.loadSource(source);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const availableQualities = hls.levels.map(({ height }) => height);
        defaultOptions.quality = {
          default: availableQualities[0],
          forced: true,
          onChange: (e) => updateQuality(e),
          options: availableQualities,
        };
        player.current = new Plyr(ref.current, defaultOptions);
      });
      hls.attachMedia(ref.current);
      window.hls = hls;
    } else {
      player.current = new Plyr(ref.current, defaultOptions);
    }
  }, [source, isEncryption]);
  return (
    <StyledElement>
      <video
        controls
        crossOrigin="true"
        playsInline
        poster={poster}
        preload="none"
        ref={ref}
        src={source}
        width="100%"
      />
      <Styles />
    </StyledElement>
  );
};
Video.defaultProps = {
  isEncryption: false,
  source: "/videos/video.mp4",
  poster: "/images/poster.png",
};
Video.propTypes = { isEncryption: bool, source: string, poster: string };
export default Video;
