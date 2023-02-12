import {BACKEND_BASE_URL} from '../../type/url';
import axios from "axios";
import{
DEALER_LIST_REQUEST,
DEALER_LIST_SUCCESS,
DEALER_LIST_FAIL
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