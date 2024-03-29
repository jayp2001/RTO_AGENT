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
    DELETE_BOOK_REQUEST,

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

  export const dealerBookList = (page,numPerPage,filter,workStatus,id,searchWord) => async (
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
        `${BACKEND_BASE_URL}vehicleRegistrationrouter/getListOfVehicleRegistrationDetails?page=${page}&numPerPage=${numPerPage}&startDate=${filter && filter.startDate?filter.startDate:''}&searchWord=${searchWord ? searchWord : ''}&endDate=${filter && filter.endDate?filter.endDate:''}&dealerId=${id && id?id:''}&workStatus=${workStatus != 10 || !workStatus ? workStatus === 0 ? 'PENDING' : workStatus === 2 ? 'APPOINTMENT': workStatus === 3 ? 'COMPLETE':'':''}&workCategory=${filter && filter.type?filter.type:''}&searchOption=${filter && filter.searchOption === 'lastUpdated'?'lastUpdated':''}`,
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
      bookData.vehicleRegistrationDate = bookData.vehicleRegistrationDate ? bookData.vehicleRegistrationDate.toString().slice(4,15) : '';
      bookData.insuranceStartDate = bookData.insuranceStartDate ? bookData.insuranceStartDate.toString().slice(4,15):'';
      bookData.insuranceEndDate = bookData.insuranceEndDate ? bookData.insuranceEndDate.toString().slice(4,15):'';
      bookData.puccStartDate = bookData.puccStartDate ? bookData.puccStartDate.toString().slice(4,15):'';
      bookData.puccEndDate = bookData.puccEndDate ? bookData.puccEndDate.toString().slice(4,15):'';
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
      data.unshift({ dealerId: '100', dealerDisplayName: 'PRIVATE' });
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

  export const allBookList = (page,numPerPage,filter,workStatus,searchWord) => async (
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
        `${BACKEND_BASE_URL}vehicleRegistrationrouter/getListOfVehicleRegistrationDetails?page=${page}&numPerPage=${numPerPage}&startDate=${filter && filter.startDate?filter.startDate:''}&appointmentDate=${filter && filter.appointmentDate?filter.appointmentDate:''}&endDate=${filter && filter.endDate?filter.endDate:''}&searchWord=${searchWord ? searchWord : ''}&dealerId=${filter && filter.dealerId?filter.dealerId:''}&workStatus=${workStatus != 10 || !workStatus ? workStatus === 0 ? 'PENDING' : workStatus === 2 ? 'APPOINTMENT': workStatus === 3 ? 'COMPLETE':'':''}&workCategory=${filter && filter.type?filter.type:''}&searchOption=${filter && filter.searchOption === 'lastUpdated'?'lastUpdated':''}`,
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
        url: `${BACKEND_BASE_URL}vehicleRegistrationrouter/exportExcelSheetForVehicleDetails?startDate=${filter && filter.startDate?filter.startDate:''}&appointmentDate=${filter && filter.appointmentDate?filter.appointmentDate:''}&endDate=${filter && filter.endDate?filter.endDate:''}&dealerId=${filter && filter.dealerId?filter.dealerId:''}&workStatus=${workStatus != 10 || !workStatus ? workStatus === 0 ? 'PENDING' : workStatus === 2 ? 'APPOINTMENT': workStatus === 3 ? 'COMPLETE':'':''}&workCategory=${filter && filter.type?filter.type:''}&searchOption=${filter && filter.searchOption === 'lastUpdated'?'lastUpdated':''}`,
        method: 'GET',
        headers: {Authorization: `Bearer ${userInfo.token}`},
        responseType: 'blob', // important
        }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);
        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        const name = 'bookList'+new Date().toLocaleDateString()+'.xlsx'
        link.href = href;
        link.setAttribute('download', name); //or any other extension
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


  export const recieptUpload = (file,date,id,sendReceipt) => async (
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
        file ?
        {
          files:file,
          appointmentDate:date,
          vehicleRegistrationId:id,
          sendReceipt:sendReceipt
        }:{
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

  export const resetDeleteBookError = () => async (dispatch)=>{
    dispatch({
      type: DELETE_BOOK_RESET_ERROR,
    })
  };

  export const resetDeleteBook = () => async (dispatch)=>{
    dispatch({
      type: DELETE_BOOK_RESET,
    })
  };

  export const moveToComplete = (id) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: MOVE_TO_COMPLETE_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${BACKEND_BASE_URL}vehicleRegistrationrouter/moveToComplete?vehicleRegistrationId=${id}`,
        config
      );
  
      dispatch({
        type: MOVE_TO_COMPLETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: MOVE_TO_COMPLETE_FAIL,
        payload: message,
      });
    }
  };

  export const resetMoveToComplete = () => async (dispatch)=>{
    dispatch({
      type: MOVE_TO_COMPLETE_RESET,
    })
  };

  export const resetMoveToCompleteError = () => async (dispatch)=>{
    dispatch({
      type: MOVE_TO_COMPLETE_ERROR,
    })
  };

  export const deleteDealer = (id) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type:DELETE_DEALER_REQUEST,
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
        `${BACKEND_BASE_URL}dealerrouter/removeDealerDetails?dealerId=${id}`,
        config
      );
  
      dispatch({
        type: DELETE_DEALER_SUCCESS,
      });
    } catch (error) {
      console.log(error)
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: DELETE_DEALER_FAIL,
        payload: message,
      });
    }
  };

  export const resetDeleteDealer = () => async (dispatch)=>{
    dispatch({
      type: DELETE_DEALER_RESET,
    })
  };

  export const resetDeleteDealerError = () => async (dispatch)=>{
    dispatch({
      type: DELETE_DEALER_RESET_ERROR,
    })
  };

  export const dealerDetailEdit = (id,dealerData) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: DEALER_DETAIL_EDIT_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {data} = await axios.post(
        `${BACKEND_BASE_URL}dealerrouter/updateDealerDetails`,
        {
          dealerId:id,
          ...dealerData
        },
        config
      );
      console.log('>>>',data)
      dispatch({
        type: DEALER_DETAIL_EDIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: DEALER_DETAIL_EDIT_FAIL,
        payload: message,
      });
    }
  };

  export const resetEditDealer = () => async (dispatch)=>{
    dispatch({
      type: EDIT_DEALER_RESET,
    })
  };

  export const resetEditDealerError = () => async (dispatch)=>{
    dispatch({
      type: EDIT_DEALER_RESET_ERROR,
    })
  };

  export const bookEdit = (id,BookData) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: BOOK_EDIT_REQUEST,
      });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {data} = await axios.post(
        `${BACKEND_BASE_URL}vehicleRegistrationrouter/updateVehicleRegistrationDetails`,
        {
          vehicleRegistrationId:id,
          ...BookData
        },
        config
      );
      console.log('>>>',data)
      dispatch({
        type: BOOK_EDIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: BOOK_EDIT_FAIL,
        payload: message,
      });
    }
  };

  export const resetEditbook = () => async (dispatch)=>{
    dispatch({
      type: BOOK_EDIT_RESET,
    })
  };

  export const resetEditBookError = () => async (dispatch)=>{
    dispatch({
      type: BOOK_EDIT_RESET_ERROR,
    })
  };