import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import store from "./redux/store";

import AuthCheck from "./routes/AuthCheck";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AuthCheck />
      </Provider>
    </>
  );
};

export default App;
