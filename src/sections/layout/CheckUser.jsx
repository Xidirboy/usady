import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../../utils/httpClient";
import { removeToken } from "../../utils/tokenStorge";

const CheckUser = ({ is_requaried = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.user);
  useEffect(() => {
    if (is_requaried && !user?.id) {
      getUser();
    }
  }, []);
  const getUser = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    Axios()
      .get("api/v1/auth/me")
      .then((r) => {
        if (r?.data?.user?.id) {
          dispatch({ type: "SET_USER", payload: r?.data?.user });
        } else {
          removeToken();
          dispatch({ type: "SET_USER", payload: {} });
          dispatch({ type: "SET_LOADING", payload: false });
          dispatch({ type: "SET_AUTH_MODAL", payload: true });
          navigate("/");
        }
      })
      .catch((e) => {
        removeToken();
        dispatch({ type: "SET_USER", payload: {} });
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "SET_AUTH_MODAL", payload: true });
        navigate("/");
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
  return <></>;
};

export default CheckUser;
