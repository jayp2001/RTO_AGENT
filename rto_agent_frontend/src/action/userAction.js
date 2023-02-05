import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
  } from "../type/userType";
import {BACKEND_BASE_URL} from '../type/url'
  import axios from "axios";


  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
  
    //   const config = {
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   };
  
      const data = {
        agentEmailId:email,
        agentPassword:password
      }

      const resData  = await axios.post(`${BACKEND_BASE_URL}agentrouter/authUser`,data)
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(resData.data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      });
    }
  };
  