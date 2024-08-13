import React from "react";
import { Provider } from "react-redux";
import createStore from "./utils/store";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers/Routers";
import WebProvider from "./utils/WebProvider";
import "swiper/css";


const App = () => {
  const store = createStore();
  return (
    <Provider store={store}>
      <WebProvider>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </WebProvider>
    </Provider>
  );
};
export default App;
