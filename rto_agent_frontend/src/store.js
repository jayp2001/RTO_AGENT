import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer
} from "./reducer/userReducer";
import{
  agentCreateReducer,
  agentListReducer,
  stateListReducer,
  cityListReducer,
  agentDeleteReducer
} from './reducer/adminReducer/adminReducer';
import{
  dealerListReducer,
  dealerDetailReducer,
  dealerCreateReducer
} from './reducer/agentReducer/agentReducer'
const reducer = combineReducers({
  userLogin: userLoginReducer,
  agentCreate:agentCreateReducer,
  agentList:agentListReducer,
  stateList:stateListReducer,
  cityList:cityListReducer,
  agentDelete:agentDeleteReducer,
  dealerList:dealerListReducer,
  dealerDetail:dealerDetailReducer,
  dealerCreate:dealerCreateReducer
});

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

// const initialState = {
//   userLogin: { userInfo: userInfoFromStorage },
// };

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;