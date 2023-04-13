import {BACKEND_BASE_URL} from '../../type/url';
import axios from "axios";
import { saveAs } from 'file-saver';
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

    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_FAIL,
    DELETE_BOOK_RESET,
    DELETE_BOOK_RESET_ERROR,
    DELETE_BOOK_REQUEST

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

  export const dealerBookList = (page,numPerPage,filter,workStatus,id) => async (
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
        `${BACKEND_BASE_URL}vehicleRegistrationrouter/getListOfVehicleRegistrationDetails?page=${page}&numPerPage=${numPerPage}&startDate=${filter && filter.startDate?filter.startDate:''}&endDate=${filter && filter.endDate?filter.endDate:''}&dealerId=${id && id?id:''}&workStatus=${workStatus != 10 || !workStatus ? workStatus === 0 ? 'PENDING' : workStatus === 2 ? 'APPOINTMENT': workStatus === 3 ? 'COMPLETE':'PENDING':''}&workCategory=${filter && filter.type?filter.type:''}&searchOption=${filter && filter.searchOption === 'lastUpdated'?'lastUpdated':''}`,
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
      bookData.vehicleRegistrationDate = bookData.vehicleRegistrationDate.toString().slice(4,15);
      bookData.insuranceStartDate = bookData.insuranceStartDate.toString().slice(4,15);
      bookData.insuranceEndDate = bookData.insuranceEndDate.toString().slice(4,15);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${BACKEND_BASE_URL}vehicleRegistrationrouter/addVehicleRegistrationDetails`,
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

  
  export const vehicleClass = () => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: VEHICLE_CLASS_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {data} = await axios.get(
        `${BACKEND_BASE_URL}ddlVehiclePagerouter/getVehicleClass`,
        config
      );
      console.log('>>>',data)
      dispatch({
        type: VEHICLE_CLASS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: VEHICLE_CLASS_FAIL,
        payload: message,
      });
    }
  };

  export const vehicleCategories = () => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: VEHICLE_CATEGORIES_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {data} = await axios.get(
        `${BACKEND_BASE_URL}ddlVehiclePagerouter/getVehicleCategory`,
        config
      );
      console.log('>>>',data)
      dispatch({
        type: VEHICLE_CATEGORIES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: VEHICLE_CATEGORIES_FAIL,
        payload: message,
      });
    }
  };

  export const serviceAuthority = () => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: SERVICE_AUTHORITY_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {data} = await axios.get(
        `${BACKEND_BASE_URL}stateCityrouter/getRTOcityDetails`,
        config
      );
      console.log('>>>',data)
      dispatch({
        type: SERVICE_AUTHORITY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: SERVICE_AUTHORITY_FAIL,
        payload: message,
      });
    }
  };

  export const insuranceCompany = () => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: INSURANCE_COMPANY_NAME_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {data} = await axios.get(
        `${BACKEND_BASE_URL}ddlVehiclePagerouter/getInsuranceDetails`,
        config
      );
      console.log('>>>',data)
      dispatch({
        type: INSURANCE_COMPANY_NAME_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: INSURANCE_COMPANY_NAME_FAIL,
        payload: message,
      });
    }
  };

  export const dealerDropdown = () => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: DEALER_LIST_DROPDOWN_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {data} = await axios.get(
        `${BACKEND_BASE_URL}dealerrouter/ddlDealerByAgentId`,
        config
      );
      console.log('>>>',data)
      data.unshift({ dealerId: 100, dealerDisplayName: 'PRIVATE' });
      dispatch({
        type: DEALER_LIST_DROPDOWN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: DEALER_LIST_DROPDOWN_FAIL,
        payload: message,
      });
    }
  };


  export const bookDetail = (id) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: BOOK_DETAIL_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {data} = await axios.get(
        `${BACKEND_BASE_URL}vehicleRegistrationrouter/getVehicleRegistrationDetailsById?vehicleRegistrationId=${id}`,
        config
      );
      console.log('>>>',data)
      dispatch({
        type: BOOK_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: BOOK_DETAIL_FAIL,
        payload: message,
      });
    }
  };


  export const bookList = (page,numPerPage,filter,type,workStatus) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: BOOK_LIST_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      console.log('<><><><>',workStatus ? workStatus === 0 ? 'PENDING' : workStatus === 2 ? 'APPOINTMENT': workStatus === 3 ? 'COMPLETE':'PENDING':'PENDING');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {data} = await axios.get(
        `${BACKEND_BASE_URL}vehicleRegistrationrouter/getListOfVehicleRegistrationDetails?page=${page}&numPerPage=${numPerPage}&startDate=${filter && filter.startDate?filter.startDate:''}&endDate=${filter && filter.endDate?filter.endDate:''}&dealerId=${filter && filter.dealerId?filter.dealerId:''}&workStatus=${workStatus ? workStatus === 0 ? 'PENDING' : workStatus === 2 ? 'APPOINTMENT': workStatus === 3 ? 'COMPLETE':'PENDING':'PENDING'}&workCategory=${type?type:''}&searchOption=${filter && filter.searchOption === 'lastUpdated'?'lastUpdated':''}`,
        config
      );
      console.log('>>>',data)
      dispatch({
        type: BOOK_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: BOOK_LIST_FAIL,
        payload: message,
      });
    }
  };

  export const allBookList = (page,numPerPage,filter,workStatus) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: ALL_BOOK_LIST_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      // console.log('<><><><>',workStatus);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {data} = await axios.get(
        `${BACKEND_BASE_URL}vehicleRegistrationrouter/getListOfVehicleRegistrationDetails?page=${page}&numPerPage=${numPerPage}&startDate=${filter && filter.startDate?filter.startDate:''}&endDate=${filter && filter.endDate?filter.endDate:''}&dealerId=${filter && filter.dealerId?filter.dealerId:''}&workStatus=${workStatus != 10 || !workStatus ? workStatus === 0 ? 'PENDING' : workStatus === 2 ? 'APPOINTMENT': workStatus === 3 ? 'COMPLETE':'PENDING':''}&workCategory=${filter && filter.type?filter.type:''}&searchOption=${filter && filter.searchOption === 'lastUpdated'?'lastUpdated':''}`,
        config
      );
      console.log('>>>',data)
      dispatch({
        type: ALL_BOOK_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: ALL_BOOK_LIST_FAIL,
        payload: message,
      });
    }
  };

  export const exportExcel = (filter,workStatus) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: EXPORT_EXCAL_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const config = {
        headers: {
          // 'Content-Disposition': "attachment;filename=report.xls",
          // 'Content-type': "application/vnd.ms-excel",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      axios({
        url: `${BACKEND_BASE_URL}vehicleRegistrationrouter/exportExcelSheetForVehicleDetails?startDate=${filter && filter.startDate?filter.startDate:''}&endDate=${filter && filter.endDate?filter.endDate:''}&dealerId=${filter && filter.dealerId?filter.dealerId:''}&workStatus=${workStatus != 10 || !workStatus ? workStatus === 0 ? 'PENDING' : workStatus === 2 ? 'APPOINTMENT': workStatus === 3 ? 'COMPLETE':'PENDING':''}&workCategory=${filter && filter.type?filter.type:''}&searchOption=${filter && filter.searchOption === 'lastUpdated'?'lastUpdated':''}`,
        method: 'GET',
        headers: {Authorization: `Bearer ${userInfo.token}`},
        responseType: 'blob', // important
        }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);
        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'file.xlsx'); //or any other extension
        document.body.appendChild(link);
        link.click();
    
        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);

        dispatch({
          type: EXPORT_EXCAL_SUCCESS,
          payload: response.data,
        });
    });
  
      
    } catch (error) {
      console.log(error)
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: EXPORT_EXCAL_FAIL,
        payload: message,
      });
    }
  };

  export const resetExport = () => async (dispatch)=>{
    dispatch({
      type: EXPORT_EXCAL_RESET,
    })
  };
  export const resetExportError = () => async (dispatch)=>{
    dispatch({
      type: EXPORT_EXCAL_ERROR,
    })
  };

  export const resetReciept = () => async (dispatch)=>{
    dispatch({
      type: RECIEPT_UPLOAD_RESET,
    })
  };
  export const resetRecieptError = () => async (dispatch)=>{
    dispatch({
      type: RECIEPT_UPLOAD_ERROR,
    })
  };


  export const recieptUpload = (file,date,id) => async (
    dispatch,
    getState
  ) => {
    console.log(">>>HELLO")
    try {
      dispatch({
        type: RECIEPT_UPLOAD_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      console.log('HEllo',file)
      console.log('???', file)
      const { data } = await axios.post(
        `${BACKEND_BASE_URL}vehicleRegistrationrouter/uploadReceipt`,
        {
          files:file,
          appointmentDate:date,
          vehicleRegistrationId:id,
        },
        config
      );
  
      dispatch({
        type: RECIEPT_UPLOAD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: RECIEPT_UPLOAD_FAIL,
        payload: message,
      });
    }
  };



  export const deleteBook = (id) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type:DELETE_BOOK_REQUEST,
      });
      console.log("book")
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(
        `${BACKEND_BASE_URL}vehicleRegistrationrouter/removeVehicleRegistrationDetails?vehicleRegistrationId=${id}`,
        config
      );
  
      dispatch({
        type: DELETE_BOOK_SUCCESS,
      });
    } catch (error) {
      console.log(error)
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: DELETE_BOOK_FAIL,
        payload: message,
      });
    }
  };

  export const resetDeleteBook = () => async (dispatch)=>{
    dispatch({
      type: DELETE_BOOK_RESET,
    })
  };