import axios from "axios"; 
import { API_URL } from "./api";
import { removeToken } from "./tokenStorge";

axios.interceptors.request.use(
  (config) => config,
  (e) => Promise.reject(e)
);
axios.interceptors.response.use(
  (response) => response,
  (e) => {
    if (typeof e?.toJSON === "function") {
      const error = e?.toJSON();

      if (error?.status === 401) {
        removeToken();
        // window.location.href = "/?auth_open=1";
      }
      if (error?.message === "Network Error") {
        // toast.warning(
        //   localStorage.getItem("i18nextLng") === "uz"
        //     ? "Internetingiz uzildi!"
        //     : "Нет подключения к Интернету!"
        // );
      }
      if (process.env.NODE_ENV === "development") {
        // console.log(error);
      }
    }
    return Promise.reject(e);
  }
);
const Axios = (access_token = "") => {
  const token = access_token ? access_token : localStorage.getItem("token");
  const defaultOptions = {
    baseURL: API_URL,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
          lang: localStorage.getItem("i18nextLng") || "uz",
        }
      : { lang: localStorage.getItem("i18nextLng") || "uz" },
    // params: { lan: localStorage.getItem('i18nextLng') || 'uz', }
  };
  const instance = axios.create(defaultOptions);
  return {
    get: (url, options = {}) =>
      instance.get(url, { ...defaultOptions, ...options }),
    post: (url, data, options = {}) =>
      instance.post(url, data, { ...defaultOptions, ...options }),
    put: (url, data, options = {}) =>
      instance.put(url, data, { ...defaultOptions, ...options }),
    delete: (url, options = {}) =>
      instance.delete(url, { ...defaultOptions, ...options }),
  };
};
export default Axios;
