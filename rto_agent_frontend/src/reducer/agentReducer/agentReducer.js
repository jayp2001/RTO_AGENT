import{
    DEALER_LIST_REQUEST,
    DEALER_LIST_SUCCESS,
    DEALER_LIST_FAIL
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