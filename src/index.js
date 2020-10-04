import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducer/reducer";
import {createAPI} from "./api";
import {Operation as DataOperation} from "./reducer/photos/photos";

export const api = createAPI();

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataOperation.loadPhotos());

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
    document.querySelector(`#root`)
);
