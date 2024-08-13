import Header from "./Header";
import Axios from "../../utils/httpClient";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s);
  // useEffect(() => {
  //   if (!user?.id) getUser();
  // }, []);
  // // // const getUser = () => {
  // // //   Axios()
  // // //     .get(`api/v1/auth/me`)
  // // //     .then((r) => {
  // // //       dispatch({ type: "SET_USER", payload: r?.data?.user ?? {} });
  // // //     })
  // // //     .catch((e) => {})
  // // //     .finally(() => {});
  // // };
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
