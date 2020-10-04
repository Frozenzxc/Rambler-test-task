import {reducer, ActionType} from "./photos";
import notParsedPhotos from "../../test-mocks/not-parsed-photos";
import photos from "../../test-mocks/test-photos";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    photos: [],
    isLoading: true,
  });
});

it(`Reducer should update photos by load photos`, () => {
  expect(reducer({
    photos: [],
    isLoading: true,
  }, {
    type: ActionType.LOAD_PHOTOS,
    payload: notParsedPhotos.photos.photo,
  })).toEqual({
    isLoading: false,
    photos,
  });
});
