import styled from "styled-components";

export const LayoutContainer = styled.div`
  width: 100% !important;
  box-sizing: border-box !important;
  padding: 0 calc(50% - 640px) !important;
  min-height: 90vh;
  @media (max-width: 900px) {
    margin-top: 30px;
  }
  & > .main {
    padding: 0 20px;
    @media (max-width: 576px) {
      padding: 0;
    }
  }
  & .animated__section {
    transition: padding-bottom 0.5s ease;
    padding-bottom: 1px;
    /* padding-bottom: 200px; */
  }
  & .animated__active {
    transition: padding-bottom 0.5s ease;
    padding-bottom: 1px;
  }
`;
export const HeaderContainer = styled.header`
  width: 100% !important;
  box-sizing: border-box !important;
  padding: 0 calc(50% - 640px) !important;
  & > .navs {
    padding: 20px 20px 0 20px;
    @media screen and (max-width: 900px) {
      display: none;
    }
    & > .navs1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > .nav_l {
        display: flex;
        align-items: center;
        & > .logo {
          margin-right: 20px;
          & > img {
            width: 165px;
            height: 39px;
          }
        }
        & > .links {
          & > .link {
            color: #353434;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 14.2px; /* 107.059% */
            letter-spacing: 0.85px;
            padding: 4px 8px;
            border-bottom: 2px solid #d9dbdb;
            display: inline-block;
            &.active {
              color: #00aa58;
              border-color: #00aa58;
            }
            &:hover {
              color: #00237e;
              border-color: #00237e;
            }
          }
        }
      }
      & > .nav_r {
        display: flex;
        align-items: center;
        justify-content: right;
        & > .lan {
          margin-left: 5px;
        }
        & > .icon_btn {
          min-width: 41px;
          height: 41px;
          width: 41px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          border-radius: 50%;
          margin-left: 5px;
          cursor: pointer;
          &:hover {
            background: #d0d8e3;
          }
        }
        & > .select_btn {
          cursor: pointer;
          &:hover {
            & circle {
              fill: orange;
            }
          }
        }
      }
    }
    & > .navs2 {
      margin-top: 28px;
      border-radius: 10px;
      background: #00237e;
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      & .l_links {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        overflow: hidden;
        height: 54px;
        transition: height 0.5s ease;
        & .link_t {
          padding: 15px 0;
          & .link {
            padding: 0px 20px;
            color: #fff;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 16.2px; /* 91% */
            letter-spacing: 1px;
            border-right: 1px dashed rgba(255, 255, 255, 0.6);
            /* &:last-child {
              border: none;
            } */
            &.active {
              color: #0f0;
            }
          }
          &:hover {
            background: #0034bc;
            border-radius: 10px;
            & .link {
              &.active {
                color: #fff;
              }
            }
            & .menu {
              visibility: visible !important;
              opacity: 1;
            }
          }
          &:first-child {
            /* border-radius: 10px 0 0 10px; */
          }
          & .menu {
            visibility: hidden;
            opacity: 0.8;
            position: absolute;
            z-index: 99;
            padding-top: 20px;
            /* left: auto; */
            & .menu_target {
              border-radius: 10px;
              border-top: 3px solid #00237e;
              background: #fff;
              box-shadow: 0px 0px 20px 0px rgba(0, 34, 125, 0.3);
              padding: 20px 10px;
              cursor: default;
              max-width: 450px;
              display: flex;
              align-items: stretch;
              flex-wrap: wrap;

              & .m_item {
                width: 215px;
                padding: 8px 10px;
                border-radius: 10px;
                & .m_link {
                  color: #00237e;
                  font-family: Noah;
                  font-size: 17px;
                  font-style: normal;
                  font-weight: 700;
                  line-height: normal;
                }
                & .body {
                  color: #353434;
                  font-family: Noah;
                  font-size: 15px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: normal;
                  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                  padding-bottom: 16px;
                  transition: border-bottom 0.5s ease;
                }
                &:hover,
                &.active {
                  & .m_link {
                    color: #00aa58;
                  }
                  & .body {
                    border-bottom: 1px solid transparent;
                  }
                }
              }
            }
          }
        }
      }
      & > .r_links {
        display: flex;
        align-items: center;
        & .all_nav {
          height: 44px;
          width: 44px;
          display: flex;
          align-items: center;
          border-radius: 10px;
          justify-content: center;
          color: #fff;
          padding: 0 10px;
          font-size: 24px;
          cursor: pointer;
          &:hover {
            background-color: #0034bc;
          }
        }
        & .sos_target {
          background: #fff;
          display: flex;
          /* flex-wrap: wrap; */
          align-items: center;
          margin: 5px;
          border-radius: 10px;
          height: 42px;
          cursor: pointer;
          & .link_t {
            padding: 0 8px;
            text-align: center;
            & .link {
              /* padding: 0px 30px; */
              color: #00237e;
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: 16.2px; /* 91% */
              letter-spacing: 1px;
              & .sos_text {
                white-space: nowrap;
                @media screen and (max-width: 1100px) {
                  display: none;
                }
              }
              & .sos {
                background: #00237e;
                font-size: 14px;
                line-height: 14px;
                color: #fff;
                border-radius: 5px;
                padding: 5px;
                margin: 2px 10px 0 0;
                @media screen and (max-width: 1100px) {
                  margin: 2px 0px 0 0;
                }
              }
            }
          }
          &:hover {
            .link {
              color: #00aa58;
              & .sos {
                background: #00aa58;
              }
            }
          }
        }
      }
    }
  }
  & > .mobile_nav {
    display: none;
    @media screen and (max-width: 900px) {
      display: block;
    }
  }
`;

export const FooterContainer = styled.footer`
  width: 100% !important;
  box-sizing: border-box !important;
  padding: 0 calc(50% - 640px) !important;
  background: #2d374d;
  color: #ffffff;
  margin-top: 75px;
  @media (max-width: 900px) {
    padding-bottom: 60px !important;
  }
  & > .footer {
    padding: 36px 20px 46px 20px;
    display: flex;
    /* justify-content: space-between; */
    flex-wrap: wrap;
    @media (max-width: 576px) {
      padding: 36px 16px 46px 16px;
    }
    & > .block {
      width: 18%;
      padding-right: 10px;

      @media (max-width: 1100px) {
        width: 24%;
      }
      @media (max-width: 900px) {
        width: 33.33%;
      }
      @media (max-width: 576px) {
        width: 50%;
      }
      & > .img_t {
        & > img {
          width: 165px;
          min-width: 165px;
          height: 39px;
          @media (max-width: 900px) {
            width: 140px;
            min-width: 140px;
            height: 33px;
          }
        }
      }
      & > .word {
        color: #d3d3d3;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 18.2px; /* 121.333% */
        letter-spacing: 0.75px;
        margin: 15px 0 25px 0;
      }
      & > .apps {
        display: flex;
        justify-content: center;
        max-width: 210px;
        @media (max-width: 900px) {
          display: none;
        }
        & > a {
          width: 24px;
          height: 24px;
          margin: 5px;
          &:hover {
            opacity: 0.7;
          }
        }
      }
      & > .m_apps {
        display: none;
        @media (max-width: 900px) {
          display: flex;
          margin: 18px auto 0 auto;
        }
      }
      & > .links {
        & > a {
          display: block;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: 18.2px; /* 101.111% */
          letter-spacing: 0.9px;
          margin-bottom: 20px;
          &:hover {
            color: #00aa58;
          }
        }
        & > .m_link {
          display: none;
          @media (max-width: 576px) {
            display: block;
          }
        }
      }
      & .phone {
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 18.2px; /* 101.111% */
        letter-spacing: 0.9px;
        margin: 5px 0 20px 0;
      }
      & .phone_t {
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 18.2px;
        letter-spacing: 0.8px;
        margin: 5px 0;
      }
      & > .mail {
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 18.2px; /* 101.111% */
        letter-spacing: 0.9px;
      }
    }
    & > .logo_block {
      /* margin-right: 80px; */
      width: 25%;
      @media (max-width: 900px) {
        width: 100%;
        margin-bottom: 16px;
        justify-content: space-between;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 0 0 16px 0;
        & > .word {
          margin: 0 0 0 10px;
        }
      }
    }
    & > .contact {
      @media (max-width: 1100px) {
        width: 100%;
        text-align: center;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        /* margin-top: 16px; */
        padding: 16px 0;
      }
    }
    & > .m_block {
      @media (max-width: 576px) {
        display: none;
      }
    }
    & > .link_block {
      width: 57%;
      @media (max-width: 1100px) {
        width: 75%;
      }
      @media (max-width: 900px) {
        width: 100%;
      }
      & > .f_links {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 100%;
        & a {
          width: 33%;
          @media (max-width: 500px) {
            width: 50%;
          }
          @media (max-width: 370px) {
            width: 100%;
          }
          display: block;
          font-size: 18px;
          font-style: normal;
          font-weight: 500;
          line-height: 18.2px; /* 101.111% */
          letter-spacing: 0.9px;
          margin-bottom: 20px;
          padding: 0 4px;
          &:hover {
            color: #00aa58;
          }
        }
      }
    }
  }
`;

export const HeaderMobileContainer = styled.header`
  padding: 20px 20px 0px 20px;
  width: 100%;
  top: 0;
  background: rgb(239, 242, 251);
  @media (max-width: 576px) {
    padding: 16px 0px 0px 0px;
  }
  & > .m_container {
    padding: 20px 50px;
    position: fixed;
    z-index: 100;
    width: 100%;
    background: rgb(239, 242, 251);
    left: 0;
    top: 0;
    @media (max-width: 576px) {
      padding: 16px;
    }
    & > .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > .logo {
        & > img {
          width: 120px;
          height: auto;
        }
      }
      & > .m_links {
        display: inline-flex;
        align-items: center;
        & > .location {
          color: #353434;
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: 27px;
        }
        & > .lan {
          padding-left: 10px;
        }
      }
    }
  }
  & > .bar {
    position: fixed;
    z-index: 100;
    padding: 16px;
    border-radius: 10px;
    background: rgb(255, 255, 255);
    box-shadow: rgba(32, 117, 146, 0.2) 0px 0px 6px 2px;
    width: 100%;
    left: 0;
    /* top: calc(100vh - 84px); */
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > .bar_link {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 4px;
      cursor: pointer;
      &.active {
        & g {
          opacity: 1 !important;
        }
        & path {
          fill: #00aa58 !important;
          stroke: #00aa58 !important;
        }
        & circle {
          stroke: #00aa58 !important;
        }
      }
      & > .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 25px;
      }
      & > .title {
        color: #556c82;
        text-align: center;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 27px;
      }
    }
  }
  & > .m_menu {
    visibility: hidden;
    top: 1000px;
    position: fixed;
    width: 100%;
    background: #eff2fb;
    height: calc(100vh - 45px);
    z-index: 99;
    /* opacity: 0; */
    transition: visibility 0.5s, z-index 0s, top 0.5s linear;
    left: 0;
    overflow-y: auto;
    padding-bottom: 80px;
    & > .head {
      position: fixed;
      width: 100%;
      background: #00237e;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      & > .t_back {
        & > .back_btn {
          display: flex;
          align-items: center;
          & > .back {
            color: #fff;
            text-align: center;
            font-size: 17px;
            font-style: normal;
            font-weight: 700;
            line-height: 18.2px;
            letter-spacing: 0.85px;
            margin-left: 10px;
          }
        }
      }
    }
    & > .select_btns {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px 0 14px 0;
    }
    & > .links {
      padding: 16px;
      & > .l_card {
        border-radius: 10px;
        background: #f7f9fd;
        padding: 20px 30px;
        margin-bottom: 10px;
        & > .l_link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          & > .item {
            color: #000;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 18.2px; /* 91% */
            letter-spacing: 1px;
            &:hover {
              color: #00aa58;
            }
          }
          & > .childs {
            cursor: pointer;
          }
        }
        & > .desc {
          color: #353434;
          font-size: 15px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          margin-top: 10px;
        }
      }
    }
  }
  & > .show_menu {
    visibility: visible;
    top: 60px;
    opacity: 1;
    z-index: 99;
  }
`;
