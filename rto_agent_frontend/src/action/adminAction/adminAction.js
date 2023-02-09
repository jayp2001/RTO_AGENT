import {
    AGENT_CREATE_REQUEST,
    AGENT_CREATE_SUCCESS,
    AGENT_CREATE_FAIL,
    } from "../../type/adminTypes/adminTypes";
    import axios from "axios";
    import {BACKEND_BASE_URL} from '../../type/url'
    
    export const createAgent = (agentData) => async (
        dispatch,
        getState
      ) => {
        try {
          dispatch({
            type: AGENT_CREATE_REQUEST,
          });
      
          const userInfo = JSON.parse(localStorage.getItem('userInfo'))
          
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          const { data } = await axios.post(
            `${BACKEND_BASE_URL}agentrouter/addAgentDetails`,
            agentData,
            config
          );
      
          dispatch({
            type: AGENT_CREATE_SUCCESS,
            payload: data,
          });
        } catch (error) {
          const message =
            error.response && error.response.data
              ? error.response.data
              : error.message;
          dispatch({
            type: AGENT_CREATE_FAIL,
            payload: message,
          });
        }
      };
      