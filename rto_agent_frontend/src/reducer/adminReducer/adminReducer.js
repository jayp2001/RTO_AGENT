import {
    AGENT_CREATE_REQUEST,
    AGENT_CREATE_SUCCESS,
    AGENT_CREATE_FAIL,
    } from "../../type/adminTypes/adminTypes";

export const agentCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case AGENT_CREATE_REQUEST:
        return { loading: true };
      case AGENT_CREATE_SUCCESS:
        return { loading: false, success: true };
      case AGENT_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };