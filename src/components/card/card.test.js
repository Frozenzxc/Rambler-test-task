import React from 'react';
import renderer from 'react-test-renderer';
import Card from "./card";
import photos from "../../test-mocks/test-photos";

const photo = photos[0];

it(`Card is rendered correctly`, () => {
  const tree = renderer.create(
      <Card
        photo={photo}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
