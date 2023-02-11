import {
    AGENT_CREATE_REQUEST,
    AGENT_CREATE_SUCCESS,
    AGENT_CREATE_FAIL,
    AGENT_LIST_REQUEST,
    AGENT_LIST_SUCCESS,
    AGENT_LIST_FAIL,
    STATE_LIST_REQUEST,
    STATE_LIST_SUCCESS,
    STATE_LIST_FAIL,
    CITY_LIST_REQUEST,
    CITY_LIST_SUCCESS,
    CITY_LIST_FAIL,
    AGENT_DELETE_REQUEST,
    AGENT_DELETE_SUCCESS,
    AGENT_DELETE_FAIL

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

export const agentListReducer = (state = [],action) =>{
  switch (action.type) {
    case AGENT_LIST_REQUEST:
      return { loading: true };
    case AGENT_LIST_SUCCESS:
      return { state: action.payload.rows,totalRows: action.payload.numRows};
    case AGENT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}

export const stateListReducer = (state = [],action) =>{
  switch (action.type) {
    case STATE_LIST_REQUEST:
      return { loading: true };
    case STATE_LIST_SUCCESS:
      return { state: action.payload};
    case STATE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}

export const cityListReducer = (state = [],action) =>{
  switch (action.type) {
    case CITY_LIST_REQUEST:
      return { loading: true };
    case CITY_LIST_SUCCESS:
      return { state: action.payload};
    case CITY_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}

//delete agent

export const agentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case AGENT_DELETE_REQUEST:
      return { loading: true };
    case AGENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case AGENT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
