import { legacy_createStore as createStore } from "redux";
import CitoyenReducer from "./reducer";

export default createStore(CitoyenReducer);

