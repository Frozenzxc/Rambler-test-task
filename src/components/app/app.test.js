import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import photos from "../../test-mocks/test-photos";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`Should App component render correctly`, () => {

  const store = mockStore({
    [NameSpace.PHOTOS]: {
      isLoading: false,
      photos,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            isLoading={false}
            photos={photos}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
