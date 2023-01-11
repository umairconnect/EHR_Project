import { createStore } from "redux";
import rootReducer from "./reducers/progressBarReducer";
//import rootReducer from "./reducers/combineReducer";

const store= createStore(rootReducer);

export default store