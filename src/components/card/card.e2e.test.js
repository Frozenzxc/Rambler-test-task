import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "./card.jsx";
import photos from "../../test-mocks/test-photos";

configure({adapter: new Adapter()});

const photo = photos[0];

it(`should click on heart appears in the handler`, function () {
  window.alert = jest.fn();

  const card = shallow(<Card
    photo={photo}
  />);

  const heart = card.find(`span.gallery__likes-icon`);

  heart.simulate(`click`);

  expect(window.alert).toHaveBeenCalledTimes(1);
});
