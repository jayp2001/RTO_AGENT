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
    AGENT_DELETE_FAIL,RESET_STATE
    } from "../../type/adminTypes/adminTypes";
    import axios from "axios";
    import {BACKEND_BASE_URL} from '../../type/url'
    
    //Add Agent Detail
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
      
//Display Agent List
      export const agentList = (page,numPerPage) => async (
        dispatch,
        getState
      ) => {
        try {
          dispatch({
            type: AGENT_LIST_REQUEST,
          });
      
          const userInfo = JSON.parse(localStorage.getItem('userInfo'))
          
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          const {data} = await axios.get(
            `${BACKEND_BASE_URL}agentrouter/getAgentDetails?page=${page}&numPerPage=${numPerPage}`,
            config
          );
          console.log('>>>',data)
          dispatch({
            type: AGENT_LIST_SUCCESS,
            payload: data,
          });
        } catch (error) {
          const message =
            error.response && error.response.data
              ? error.response.data
              : error.message;
          dispatch({
            type: AGENT_LIST_FAIL,
            payload: message,
          });
        }
      };

      //State list

      export const getStateList = () => async (
        dispatch,
        getState
      ) => {
        try {
          dispatch({
            type: STATE_LIST_REQUEST,
          });
      
          const userInfo = JSON.parse(localStorage.getItem('userInfo'))
          
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          const {data} = await axios.get(
            `${BACKEND_BASE_URL}stateCityrouter/getstateDetails`,
            config
          );
          console.log('>>>',data)
          dispatch({
            type: STATE_LIST_SUCCESS,
            payload: data,
          });
        } catch (error) {
          const message =
            error.response && error.response.data
              ? error.response.data
              : error.message;
          dispatch({
            type: STATE_LIST_FAIL,
            payload: message,
          });
        }
      };

      //city list

      export const getCityList = () => async (
        dispatch,
        getState
      ) => {
        try {
          dispatch({
            type: CITY_LIST_REQUEST,
          });
      
          const userInfo = JSON.parse(localStorage.getItem('userInfo'))
          
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          const {data} = await axios.get(
            `${BACKEND_BASE_URL}stateCityrouter/getcityDetails`,
            config
          );
          console.log('>>>',data)
          dispatch({
            type: CITY_LIST_SUCCESS,
            payload: data,
          });
        } catch (error) {
          const message =
            error.response && error.response.data
              ? error.response.data
              : error.message;
          dispatch({
            type: CITY_LIST_FAIL,
            payload: message,
          });
        }
      };

      // delete agent

      export const deleteAgent = (id) => async (
        dispatch,
        getState
      ) => {
        try {
          dispatch({
            type: AGENT_DELETE_REQUEST,
          });
      
          const userInfo = JSON.parse(localStorage.getItem('userInfo'))
          
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          const { data } = await axios.post(
            `${BACKEND_BASE_URL}agentrouter/removeAgentDetails`,
            {agentId:id},
            config
          );
      
          dispatch({
            type: AGENT_DELETE_SUCCESS,
            payload: data,
          });
        } catch (error) {
          const message =
            error.response && error.response.data
              ? error.response.data
              : error.message;
          dispatch({
            type: AGENT_DELETE_FAIL,
            payload: message,
          });
        }
      };


    export const resetAddAgent = () => async (dispatch)=>{
      console.log("LKT")
      dispatch({
        type: RESET_STATE,
      })
    };