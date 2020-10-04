import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import photos from "../../test-mocks/test-photos";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`Should Main component render correctly`, () => {

  const store = mockStore({
    [NameSpace.PHOTOS]: {
      photos
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            photos={photos}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
