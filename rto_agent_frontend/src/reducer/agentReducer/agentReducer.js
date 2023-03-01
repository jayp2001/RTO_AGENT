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
    ADD_BOOK_RESET,
    ADD_BOOK_RESET_ERROR
    } from '../../type/agentTypes/agentTypes'

    import{
      VEHICLE_CLASS_REQUEST,
      VEHICLE_CLASS_SUCCESS,
      VEHICLE_CLASS_FAIL,
        
      VEHICLE_CATEGORIES_REQUEST,
      VEHICLE_CATEGORIES_SUCCESS,
      VEHICLE_CATEGORIES_FAIL,
        
      SERVICE_AUTHORITY_REQUEST,
      SERVICE_AUTHORITY_SUCCESS,
      SERVICE_AUTHORITY_FAIL,
        
      INSURANCE_COMPANY_NAME_REQUEST,
      INSURANCE_COMPANY_NAME_SUCCESS,
      INSURANCE_COMPANY_NAME_FAIL,
        
      DEALER_LIST_DROPDOWN_REQUEST,
      DEALER_LIST_DROPDOWN_SUCCESS,
      DEALER_LIST_DROPDOWN_FAIL,
      } from '../../type/agentTypes/dropDown'

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
      case ADD_BOOK_RESET_ERROR:
          return {}
      default:
        return state;
    }
  };

  export const vehicleClass = (state = [],action) =>{
    switch (action.type) {
      case VEHICLE_CLASS_REQUEST:
        return { loading: true };
      case VEHICLE_CLASS_SUCCESS:
        return { state: action.payload};
      case VEHICLE_CLASS_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  }
  export const vehicleCategories = (state = [],action) =>{
    switch (action.type) {
      case VEHICLE_CATEGORIES_REQUEST:
        return { loading: true };
      case VEHICLE_CATEGORIES_SUCCESS:
        return { state: action.payload};
      case VEHICLE_CATEGORIES_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  }
  export const serviceAuthority = (state = [],action) =>{
    switch (action.type) {
      case SERVICE_AUTHORITY_REQUEST:
        return { loading: true };
      case SERVICE_AUTHORITY_SUCCESS:
        return { state: action.payload};
      case SERVICE_AUTHORITY_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  }
  export const insuranceCompany = (state = [],action) =>{
    switch (action.type) {
      case INSURANCE_COMPANY_NAME_REQUEST:
        return { loading: true };
      case INSURANCE_COMPANY_NAME_SUCCESS:
        return { state: action.payload};
      case INSURANCE_COMPANY_NAME_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  }
  export const dealerDropdown = (state = [],action) =>{
    switch (action.type) {
      case DEALER_LIST_DROPDOWN_REQUEST:
        return { loading: true };
      case DEALER_LIST_DROPDOWN_SUCCESS:
        return { state: action.payload};
      case DEALER_LIST_DROPDOWN_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }