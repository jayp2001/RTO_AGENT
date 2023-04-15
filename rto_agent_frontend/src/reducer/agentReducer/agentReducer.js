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

    ADD_BOOK_RESET_ERROR,
    BOOK_DETAIL_REQUEST,
    BOOK_DETAIL_SUCCESS,
    BOOK_DETAIL_FAIL,

    BOOK_LIST_REQUEST,
    BOOK_LIST_SUCCESS,
    BOOK_LIST_FAIL,

    ALL_BOOK_LIST_REQUEST,
    ALL_BOOK_LIST_SUCCESS,
    ALL_BOOK_LIST_FAIL,

    EXPORT_EXCAL_REQUEST,
    EXPORT_EXCAL_SUCCESS,
    EXPORT_EXCAL_FAIL,
    EXPORT_EXCAL_RESET,
    EXPORT_EXCAL_ERROR,

    RECIEPT_UPLOAD_REQUEST,
    RECIEPT_UPLOAD_SUCCESS,
    RECIEPT_UPLOAD_FAIL,
    RECIEPT_UPLOAD_RESET,
    RECIEPT_UPLOAD_ERROR,

    DELETE_BOOK_REQUEST,
    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_FAIL,
    DELETE_BOOK_RESET,
    DELETE_BOOK_RESET_ERROR,

    MOVE_TO_COMPLETE_REQUEST,
    MOVE_TO_COMPLETE_SUCCESS,
    MOVE_TO_COMPLETE_FAIL,
    MOVE_TO_COMPLETE_RESET,
    MOVE_TO_COMPLETE_ERROR,

    DELETE_DEALER_REQUEST,
    DELETE_DEALER_SUCCESS,
    DELETE_DEALER_FAIL,
    DELETE_DEALER_RESET,
    DELETE_DEALER_RESET_ERROR,

    DEALER_DETAIL_EDIT_REQUEST,
    DEALER_DETAIL_EDIT_SUCCESS,
    DEALER_DETAIL_EDIT_FAIL,
    EDIT_DEALER_RESET,
    EDIT_DEALER_RESET_ERROR,

    BOOK_EDIT_REQUEST,
    BOOK_EDIT_SUCCESS,
    BOOK_EDIT_FAIL,
    BOOK_EDIT_RESET,
    BOOK_EDIT_RESET_ERROR

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
        return { state: action.payload.rows,totalRows: action.payload.numRows,loading: false};
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

  export const bookDetailReducer = (state = [],action) =>{
    switch (action.type) {
      case BOOK_DETAIL_REQUEST:
        return { loading: true };
      case BOOK_DETAIL_SUCCESS:
        return { state: action.payload};
      case BOOK_DETAIL_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  }

  export const ttoBookListReducer = (state = [],action) =>{
    switch (action.type) {
      case BOOK_LIST_REQUEST:
        return { loading: true };
      case BOOK_LIST_SUCCESS:
        return { state: action.payload.rows,totalRows: action.payload.numRows};
      case BOOK_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  }

  export const rrfBookListReducer = (state = [],action) =>{
    switch (action.type) {
      case BOOK_LIST_REQUEST:
        return { loading: true };
      case BOOK_LIST_SUCCESS:
        return { state: action.payload.rows,totalRows: action.payload.numRows};
      case BOOK_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  }

  export const otherBookListReducer = (state = [],action) =>{
    switch (action.type) {
      case BOOK_LIST_REQUEST:
        return { loading: true };
      case BOOK_LIST_SUCCESS:
        return { state: action.payload.rows,totalRows: action.payload.numRows};
      case BOOK_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  }

  export const allBookListReducer = (state = [],action) =>{
    switch (action.type) {
      case ALL_BOOK_LIST_REQUEST:
        return { loading: true };
      case ALL_BOOK_LIST_SUCCESS:
        return { state: action.payload.rows,totalRows: action.payload.numRows};
      case ALL_BOOK_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  }

  export const exportExcal = (state = {}, action) => {
    switch (action.type) {
      case EXPORT_EXCAL_REQUEST:
        return { loading: true };
      case EXPORT_EXCAL_SUCCESS:
        return { loading: false, success: true };
      case EXPORT_EXCAL_FAIL:
        return { loading: false, error: action.payload };
      case EXPORT_EXCAL_RESET:
          return {}
      case EXPORT_EXCAL_ERROR:
          return {}
      default:
        return state;
    }
  };


  export const recieptUploadReducer = (state = {}, action) => {
    switch (action.type) {
      case RECIEPT_UPLOAD_REQUEST:
        return { loading: true };
      case RECIEPT_UPLOAD_SUCCESS:
        return { loading: false, success: true };
      case RECIEPT_UPLOAD_FAIL:
        return { loading: false, error: action.payload };
      case RECIEPT_UPLOAD_RESET:
          return {}
      case RECIEPT_UPLOAD_ERROR:
          return {}
      default:
        return state;
    }
  };

  export const deleteBookReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_BOOK_REQUEST:
        return { loading: true };
      case DELETE_BOOK_SUCCESS:
        return { loading: false, success: true };
      case DELETE_BOOK_FAIL:
        return { loading: false, error: action.payload };
      case DELETE_BOOK_RESET:
          return {}
      case DELETE_BOOK_RESET_ERROR:
          return {}
      default:
        return state;
    }
  };

  export const moveToCompleteReducer = (state = {}, action) => {
    switch (action.type) {
      case MOVE_TO_COMPLETE_REQUEST:
        return { loading: true };
      case MOVE_TO_COMPLETE_SUCCESS:
        return { loading: false, success: true };
      case MOVE_TO_COMPLETE_FAIL:
        return { loading: false, error: action.payload };
      case MOVE_TO_COMPLETE_RESET:
          return {}
      case MOVE_TO_COMPLETE_ERROR:
          return {}
      default:
        return state;
    }
  };

  export const deleteDealerReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_DEALER_REQUEST:
        return { loading: true };
      case DELETE_DEALER_SUCCESS:
        return { loading: false, success: true };
      case DELETE_DEALER_FAIL:
        return { loading: false, error: action.payload };
      case DELETE_DEALER_RESET:
          return {}
      case DELETE_DEALER_RESET_ERROR:
          return {}
      default:
        return state;
    }
  };

  export const dealerDetailEditReducer = (state = [],action) =>{
    switch (action.type) {
      case DEALER_DETAIL_EDIT_REQUEST:
        return { loading: true };
      case DEALER_DETAIL_EDIT_SUCCESS:
        return { loading: false, success: true };
      case DEALER_DETAIL_EDIT_FAIL:
        return { loading: false, error: action.payload };
        case EDIT_DEALER_RESET:
          return {}
      case EDIT_DEALER_RESET_ERROR:
          return {}
      default:
        return state;
    }
  }

  export const bookEditReducer = (state = [],action) =>{
    switch (action.type) {
      case BOOK_EDIT_REQUEST:
        return { loading: true };
      case BOOK_EDIT_SUCCESS:
        return { loading: false, success: true };
      case BOOK_EDIT_FAIL:
        return { loading: false, error: action.payload };
        case BOOK_EDIT_RESET:
          return {}
      case BOOK_EDIT_RESET_ERROR:
          return {}
      default:
        return state;
    }
  }