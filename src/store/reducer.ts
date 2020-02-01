import { combineReducers } from "redux-immutable";
import { reducer as finalReducer } from "./reducers";

export default combineReducers({
  final: finalReducer
});
