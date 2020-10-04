import moment from "moment";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const parsePhoto = (data) => {
  let photo = {};
  photo.date = data[`dateupload`];
  photo.description = data[`description`][`_content`];
  photo.iconfarm = data[`iconfarm`];
  photo.iconserver = data[`iconserver`];
  photo.id = data[`id`];
  photo.owner = data[`owner`];
  photo.ownername = data[`ownername`];
  photo.secret = data[`secret`];
  photo.server = data[`server`];
  photo.src = data[`url_n`];
  photo.title = data[`title`];
  photo.views = data[`views`];
  return photo;
};

export const formatDate = (date) => {
  return moment.unix(date).toNow();
};

export const clearText = (text) => {
  return text.replace( /(<([^>]+)>)/ig, '');
};
