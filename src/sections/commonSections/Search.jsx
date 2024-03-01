import React from "react";
import { SearchContainer } from "../../styleComponents/sections/commonStyle/SearchStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Search = ({ data = {} }) => {
  const { t } = useTranslation();
  return (
    <>
      <SearchContainer>
        <div className="card">
          <div className="section1">
            <img src={data?.image} alt="Search Inson" />
          </div>
          <div className="section2">
            <TitelBlack word={data?.title ?? ""} />
            <form className="search">
              <input
                className="input"
                type="text"
                name="search"
                placeholder="Например: ОСАГО"
              />
              <button className="btn">{t("info2.search")}</button>
            </form>
            <div className="items">
              {data?.items?.map((item, index) => (
                <Link
                  to={item?.link ?? "#"}
                  key={index}
                  className="item"
                  dangerouslySetInnerHTML={{ __html: item?.title }}
                />
              ))}
            </div>
          </div>
        </div>
      </SearchContainer>
    </>
  );
};

export default Search;
