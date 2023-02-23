import{
    DEALER_LIST_REQUEST,
    DEALER_LIST_SUCCESS,
    DEALER_LIST_FAIL,
    DEALER_DETAIL_REQUEST,
    DEALER_DETAIL_SUCCESS,
    DEALER_DETAIL_FAIL,
    ADD_DEALER_REQUEST,
    ADD_DEALER_SUCCESS,
    ADD_DEALER_FAIL,
    DEALER_BOOK_LIST_REQUEST,
    DEALER_BOOK_LIST_SUCCESS,
    DEALER_BOOK_LIST_FAIL,
    DEALER_RESET,
    ADD_BOOK_REQUEST,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAIL,
    ADD_BOOK_RESET
    } from '../../type/agentTypes/agentTypes'


export const dealerListReducer = (state = [],action) =>{
    switch (action.type) {
      case DEALER_LIST_REQUEST:
        return { loading: true };
      case DEALER_LIST_SUCCESS:
        return { state: action.payload.rows,totalRows: action.payload.numRows};
      case DEALER_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  }

  export const dealerBookListReducer = (state = [],action) =>{
    switch (action.type) {
      case DEALER_BOOK_LIST_REQUEST:
        return { loading: true };
      case DEALER_BOOK_LIST_SUCCESS:
        return { state: action.payload.rows,totalRows: action.payload.numRows};
      case DEALER_BOOK_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  }

  export const dealerDetailReducer = (state = [],action) =>{
    switch (action.type) {
      case DEALER_DETAIL_REQUEST:
        return { loading: true };
      case DEALER_DETAIL_SUCCESS:
        return { state: action.payload};
      case DEALER_DETAIL_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  }

  export const dealerCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_DEALER_REQUEST:
        return { loading: true };
      case ADD_DEALER_SUCCESS:
        return { loading: false, success: true };
      case ADD_DEALER_FAIL:
        return { loading: false, error: action.payload };
        case DEALER_RESET:
          return {}
      default:
        return state;
    }
  };

  export const addBookReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_BOOK_REQUEST:
        return { loading: true };
      case ADD_BOOK_SUCCESS:
        return { loading: false, success: true };
      case ADD_BOOK_FAIL:
        return { loading: false, error: action.payload };
        case ADD_BOOK_RESET:
          return {}
      default:
        return state;
    }
  };