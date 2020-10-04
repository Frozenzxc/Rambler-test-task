const ActionType = {
  LOAD_PHOTOS: `LOAD_PHOTOS`,
};

const ActionCreator = {
  loadPhotos: (photos) => {
    return {
      type: ActionType.LOAD_PHOTOS,
      payload: photos.photos.photo,
    };
  },
};

export {ActionType, ActionCreator};
