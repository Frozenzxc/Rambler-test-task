import {ActionCreator, ActionType} from "./actions";
import {extend, parsePhoto} from "../../util";

const initialState = {
  photos: [],
  isLoading: true,
};

const Operation = {
  loadPhotos: () => (dispatch, getState, api) => {
    return api.get(`/?method=flickr.interestingness.getList&api_key=b59f451ed922b064e74caf00fa3df0c4&extras=description%2C+license%2C+date_upload%2C+date_taken%2C+owner_name%2C+icon_server%2C+original_format%2C+last_update%2C+geo%2C+tags%2C+machine_tags%2C+o_dims%2C+views%2C+media%2C+path_alias%2C+url_n&per_page=20&page=1&format=json&nojsoncallback=1`)
            .then((response) => {
              dispatch(ActionCreator.loadPhotos(response.data));
            });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_PHOTOS:
      let parsedPhotos = action.payload.map((photo) => parsePhoto(photo));
      return extend(state, {
        isLoading: false,
        photos: parsedPhotos,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
