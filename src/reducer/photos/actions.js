const ActionType = {
  LOAD_PHOTOS: `LOAD_PHOTOS`,
  LOAD_PHOTO_INFO: `LOAD_PHOTO_INFO`,
};

const ActionCreator = {
  loadPhotos: (photos) => {
    return {
      type: ActionType.LOAD_PHOTOS,
      payload: photos.photos.photo,
    };
  },

  loadPhotoInfo: (photo) => {
    return {
      type: ActionType.LOAD_PHOTO_INFO,
      payload: photo.photo,
    }
  }
};

export {ActionType, ActionCreator};
