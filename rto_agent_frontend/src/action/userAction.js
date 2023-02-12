import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
  } from "../type/userType";
import {BACKEND_BASE_URL} from '../type/url'
  import axios from "axios";
  import CryptoJS from 'crypto-js'


  export const login = (email, password) => async (dispatch) => {
    const encryptData = (text) => {
      const key = process.env.REACT_APP_AES_KEY;
      const data = CryptoJS.AES.encrypt(
        JSON.stringify(text),
        key
      ).toString();
  
      return(data);
    };
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
      // console.log("AES_data",resData.data.isAdminrights);
      resData.data.isAdminrights = encryptData(resData.data.isAdminrights);
      // console.log("AES",resData.data.isAdminrights);
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
  