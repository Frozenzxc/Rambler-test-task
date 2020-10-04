import {combineReducers} from "redux";
import {reducer as photos} from "./photos/photos";
import NameSpace from "./name-space";

export default combineReducers({
  [NameSpace.PHOTOS]: photos,
});
