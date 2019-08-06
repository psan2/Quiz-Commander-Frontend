import { createStore } from "redux";
import quizCommanderReducer from "./Reducer";

const qcStore = createStore(quizCommanderReducer);

dispatch = action => {
  state = changeState(state, action);
};
