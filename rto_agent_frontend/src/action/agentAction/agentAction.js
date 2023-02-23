import {BACKEND_BASE_URL} from '../../type/url';
import axios from "axios";
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

//Display dealer List
export const dealerList = (page,numPerPage) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: DEALER_LIST_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {data} = await axios.get(
        `${BACKEND_BASE_URL}dealerrouter/getDealerDetailsByAgentId?page=${page}&numPerPage=${numPerPage}`,
        config
      );
      console.log('>>>',data)
      dispatch({
        type: DEALER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: DEALER_LIST_FAIL,
        payload: message,
      });
    }
  };

  export const dealerDetail = (id) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: DEALER_DETAIL_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {data} = await axios.get(
        `${BACKEND_BASE_URL}dealerrouter/getDealerDetailsById?dealerId=${id}`,
        config
      );
      console.log('>>>',data)
      dispatch({
        type: DEALER_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: DEALER_DETAIL_FAIL,
        payload: message,
      });
    }
  };

  export const createDealer = (dealerData) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: ADD_DEALER_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${BACKEND_BASE_URL}dealerrouter/addDealerDetails`,
        dealerData,
        config
      );
  
      dispatch({
        type: ADD_DEALER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: ADD_DEALER_FAIL,
        payload: message,
      });
    }
  };

  export const resetAddDealer = () => async (dispatch)=>{
    dispatch({
      type: DEALER_RESET,
    })
  };

  export const dealerBookList = (page,numPerPage,id) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: DEALER_BOOK_LIST_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {data} = await axios.get(
        `${BACKEND_BASE_URL}vehicleRegisterrouter/getVehicleRegistrationDetailsBydealerId?page=${page}&numPerPage=${numPerPage}&dealerId=${id}`,
        config
      );
      console.log('>>>',data)
      dispatch({
        type: DEALER_BOOK_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: DEALER_BOOK_LIST_FAIL,
        payload: message,
      });
    }
  };

  export const addBook = (bookData) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: ADD_BOOK_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${BACKEND_BASE_URL}dealerrouter/addDealerDetails`,
        bookData,
        config
      );
  
      dispatch({
        type: ADD_BOOK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: ADD_BOOK_FAIL,
        payload: message,
      });
    }
  };

  export const resetAddBook = () => async (dispatch)=>{
    dispatch({
      type: ADD_BOOK_RESET,
    })
  };

