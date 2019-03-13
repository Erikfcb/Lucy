import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";
import { data } from "./data";

const initial = {
  diamonds: data.slice(0, 20),
  category: {
    name: "",
    filters: [
      { name: "1", chosen: false },
      { name: "2", chosen: false },
      { name: "3", chosen: false },
      { name: "4", chosen: false },
      { name: "5", chosen: false },
      { name: "6", chosen: false },
      { name: "8", chosen: false },
      { name: "9", chosen: false }
    ],
    opened: false
  }
};

const store = createStore(
  reducers,
  initial,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
