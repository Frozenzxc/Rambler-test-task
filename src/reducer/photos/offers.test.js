import {offers} from "../../test-mocks/test-photos";
import favoriteOffers from "../../test-mocks/test-favorite-photos";
import {reviews} from "../../test-mocks/reviews";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {reducer, ActionType, Operation} from "./photos";
import notParsedOffers from "../../test-mocks/not-parsed-photos";
import notParsedReviews from "../../test-mocks/not-parsed-reviews";
import notParsedFavoriteOffers from "../../test-mocks/not-parsed-favorite-photos";
import {ReviewPostingStatus} from "../../const";
import afterAddToFavoriteOffers from "../../test-mocks/test-photos-with-added-to-favorite";

const getAvailableOffers = ((allOffers, currentCity) => allOffers.filter((offer) => offer.city.name === currentCity));

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    availableOffers: [],
    activeOffer: null,
    currentCity: `Amsterdam`,
    favoriteOffers: [],
    isFavoritesLoading: true,
    isFormBlocked: false,
    isLoading: true,
    isNearbyOffersLoading: true,
    isReviewsLoading: true,
    offers: [],
    nearbyOffers: [],
    reviews: [],
    reviewPostingStatus: null,
  });
});

it(`Reducer should update offers by load offers`, () => {
  expect(reducer({
    availableOffers: [],
    currentCity: `Amsterdam`,
    isLoading: true,
    offers: [],
  }, {
    type: ActionType.LOAD_OFFERS,
    payload: notParsedOffers,
  })).toEqual({
    availableOffers: getAvailableOffers(offers, offers[0].city.name),
    currentCity: offers[0].city.name,
    isLoading: false,
    offers,
  });
});

it(`Reducer should update offers by load favorite offers`, () => {
  expect(reducer({
    favoriteOffers: [],
    isFavoritesLoading: true,
  }, {
    type: ActionType.LOAD_FAVORITE_OFFERS,
    payload: notParsedFavoriteOffers,
  })).toEqual({
    favoriteOffers,
    isFavoritesLoading: false,
  });
});

it(`Reducer should update reviews by load reviews`, () => {
  expect(reducer({
    isReviewsLoading: true,
    reviews: [],
  }, {
    type: ActionType.LOAD_REVIEWS,
    payload: notParsedReviews,
  })).toEqual({
    isReviewsLoading: false,
    reviews,
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    apiMock
            .onGet(`/hotels`)
            .reply(200, [{fake: true}]);

    return offersLoader(dispatch, () => {}, api)
            .then(() => {
              expect(dispatch).toHaveBeenCalledTimes(1);
              expect(dispatch).toHaveBeenNthCalledWith(1, {
                type: ActionType.LOAD_OFFERS,
                payload: [{fake: true}],
              });
            });
  });

  it(`Should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadFavoriteOffers();

    apiMock
            .onGet(`/favorite`)
            .reply(200, [{fake: true}]);

    return offersLoader(dispatch, () => {}, api)
            .then(() => {
              expect(dispatch).toHaveBeenCalledTimes(1);
              expect(dispatch).toHaveBeenNthCalledWith(1, {
                type: ActionType.LOAD_FAVORITE_OFFERS,
                payload: [{fake: true}],
              });
            });
  });

  it(`Should make a correct API call to /comments/id`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = Operation.loadReviews(36);

    apiMock
            .onGet(`/comments/36`)
            .reply(200, [{fake: true}]);

    return reviewsLoader(dispatch, () => {}, api)
            .then(() => {
              expect(dispatch).toHaveBeenCalledTimes(1);
              expect(dispatch).toHaveBeenNthCalledWith(1, {
                type: ActionType.LOAD_REVIEWS,
                payload: [{fake: true}],
              });
            });
  });

  it(`Should make a correct API call to /hotels/:id/nearby`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const nearbyOffersLoader = Operation.loadNearbyOffers(4);

    apiMock
            .onGet(`/hotels/4/nearby`)
            .reply(200, [{fake: true}]);

    return nearbyOffersLoader(dispatch, () => {}, api)
            .then(() => {
              expect(dispatch).toHaveBeenCalledTimes(1);
              expect(dispatch).toHaveBeenNthCalledWith(1, {
                type: ActionType.LOAD_NEARBY_OFFERS,
                payload: [{fake: true}],
              });
            });
  });
});

it(`Reducer should change current city by a given new value`, () => {
  expect(reducer({
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  }, {
    type: ActionType.SELECT_CITY,
    payload: offers[1].city.name,
  })).toEqual({
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[1].city.name,
    offers,
  });

  expect(reducer({
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  }, {
    type: ActionType.SELECT_CITY,
    payload: offers[0].city.name,
  })).toEqual({
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  });
});

it(`Reducer should load nearby offers by a given new value`, () => {
  expect(reducer({
    nearbyOffers: [],
    isNearbyOffersLoading: true,
  }, {
    type: ActionType.LOAD_NEARBY_OFFERS,
    payload: notParsedOffers,
  })).toEqual({
    nearbyOffers: offers,
    isNearbyOffersLoading: false,
  });

  expect(reducer({
    nearbyOffers: [],
    isNearbyOffersLoading: true,
  }, {
    type: ActionType.LOAD_NEARBY_OFFERS,
    payload: [],
  })).toEqual({
    nearbyOffers: [],
    isNearbyOffersLoading: false,
  });
});

it(`Reducer should load reviews by a given new value`, () => {
  expect(reducer({
    isReviewsLoading: true,
    reviews: [],
  }, {
    type: ActionType.LOAD_REVIEWS,
    payload: notParsedReviews,
  })).toEqual({
    isReviewsLoading: false,
    reviews,
  });
});

it(`Reducer should block form on submit`, () => {
  expect(reducer({
    isFormBlocked: false,
  }, {
    type: ActionType.BLOCK_FORM,
    payload: true,
  })).toEqual({
    isFormBlocked: true,
  });

  expect(reducer({
    isFormBlocked: false,
  }, {
    type: ActionType.BLOCK_FORM,
    payload: false,
  })).toEqual({
    isFormBlocked: false,
  });
});

it(`Reducer should change active offer by a given new value`, () => {
  expect(reducer({
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  }, {
    type: ActionType.SELECT_OFFER,
    payload: offers[1],
  })).toEqual({
    activeOffer: offers[1],
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  });

  expect(reducer({
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  }, {
    type: ActionType.SELECT_OFFER,
    payload: null,
  })).toEqual({
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  });
});

it(`Reducer should change value by successful post review`, () => {
  expect(reducer({
    reviewPostingStatus: null,
  }, {
    type: ActionType.SUCCESSFUL_POST_REVIEW,
    payload: ReviewPostingStatus.POSTED,
  })).toEqual({
    reviewPostingStatus: ReviewPostingStatus.POSTED,
  });

  expect(reducer({
    reviewPostingStatus: null,
  }, {
    type: ActionType.SUCCESSFUL_POST_REVIEW,
    payload: ReviewPostingStatus.ERROR,
  })).toEqual({
    reviewPostingStatus: ReviewPostingStatus.ERROR,
  });
});

it(`Reducer should update offers by add to favorites`, () => {
  expect(reducer({
    offers,
    favoriteOffers,
  }, {
    type: ActionType.ADD_TO_FAVORITE,
    payload: notParsedFavoriteOffers[0],
  })).toEqual({
    offers: afterAddToFavoriteOffers,
    favoriteOffers,
  });
});
