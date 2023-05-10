import '../addBook/addBook.css'
import { useState, useEffect } from "react";
import React from "react";
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useDispatch, useSelector } from "react-redux";
import { createDealer, resetAddDealer, dealerDetailEdit, resetEditDealer, resetEditDealerError } from '../../action/agentAction/agentAction';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';
import { getStateList, getCityList } from '../../action/adminAction/adminAction';
import axios from "axios";
import { BACKEND_BASE_URL } from '../../type/url';
import { useNavigate } from "react-router-dom";
function EditDealer() {
    const { loading, success, error } = useSelector((state) => state.dealerCreate);
    const dealerEditRes = useSelector((state) => state.dealerDetailEditReducer);
    const states = useSelector((state) => state.stateList.state);
    const citys = useSelector((state) => state.cityList.state);
    let { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState()
    const regex = /^[0-9\b]+$/;
    const emailRegx = /^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/;

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const fetching = async (dealerId) => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.get(
                `${BACKEND_BASE_URL}dealerrouter/fillUpdateDetailForDealer?dealerId=${dealerId}`,
                config
            );
            setFormData(data)
        };
        fetching(id)
        // dispatch(dealerDetailEdit(id))
        dispatch(getStateList());
        dispatch(getCityList())
    }, [dispatch])

    const [formDataError, setFormDataError] = useState(
        {
            dealerFirstName: false,
            dealerLastName: false,
            dealerDisplayName: false,
            dealerGender: false,
            dealerFirmName: false,
            dealerFirmAddressLine1: false,
            dealerFirmAddressLine2: false,
            dealerFirmCity: false,
            dealerFirmState: false,
            dealerFirmPincode: false,
            dealerMobileNumber: false,
            dealerWhatsAppNumber: false,
            dealerEmailId: false
        }
    )

    const [fields, setFields] = useState(
        [
            "dealerFirstName",
            "dealerLastName",
            "dealerDisplayName",
            "dealerGender",
            "dealerFirmName",
            "dealerFirmAddressLine1",
            "dealerFirmAddressLine2",
            "dealerFirmCity",
            "dealerFirmState",
            "dealerFirmPincode",
            "dealerMobileNumber",
            "dealerWhatsAppNumber",
            "dealerEmailId"
        ]
    )

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
        // formData[e.target.name] = e.target.value;
        console.log('formDate', formData)
    }

    const handleChange = (date) => {
        setFormData((prevState) => ({
            ...prevState,
            ["agentBirthDate"]: new Date(date).toISOString().slice(0, 10),
        }))
    };

    const submit = () => {
        console.log('>>>>>>>>>>', formData)
        const isValidate = fields.filter(element => {
            if(element === 'dealerEmailId'){
                return null
            }else if(formDataError[element] === true || formData[element] === ''){
                console.log(element)
                setFormDataError((perv)=>({
                    ...perv,
                    [element]:true
                }))
                return element;
            }
        })
        console.log('????',isValidate);
        if(isValidate.length>0){
            alert(
                "Please Fill All Field"
            )
        }else{
            dispatch(dealerDetailEdit(id, formData))
        }
    }

    const reset = async () => {

    }
    console.log('res', dealerEditRes)
    if (dealerEditRes && dealerEditRes.loading ? true : false) {
        toast.loading("Please wait...", {
            toastId: 'loading'
        })
    }
    if (dealerEditRes && dealerEditRes.success ? true : false) {
        toast.dismiss('loading');
        toast.dismiss('error');
        toast('success',
            {
                type: 'success',
                toastId: 'success',
                position: "bottom-right",
                toastId: 'error',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        dispatch(resetEditDealer())
        setTimeout(() => {
            navigate(`/dealer/${id}`)
        }, 2000)
    }

    if (dealerEditRes && dealerEditRes.error ? true : false) {
        toast.dismiss('loading');
        toast(dealerEditRes.error, {
            type: 'error',
            position: "bottom-right",
            toastId: 'error',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        dispatch(resetEditDealerError())
    }

    const handleCancleClick = () => {
        navigate(`/dashboard`)
    }

    if (!formData) {
        return null;
    }
    // else {
    //     setFormData(Data);
    // }
    // if (!formData) {
    //     return null
    // }
    return (
        <div className="addAdmin_wrapper flex items-center">
            <div className="grid justify-items-center addAdmin_inner_wrapper">

                <div className="admin_container">
                    <div className="header flex items-center ">
                        <div className="grid justify-items-center w-full">
                            <div className="header_text">
                                Edit Dealer
                            </div>
                        </div>
                    </div>
                    <div className="grid gird-rows-10 gap-y-6">
                        <div className="grid grid-cols-12 gap-x-5">

                            <div className="col-span-1">

                            </div>
                            <div className="col-span-5">
                                <TextField
                                    onBlur={(e)=>{
                                        if(e.target.value.length < 2){
                                            setFormDataError((perv)=>({
                                                ...perv,
                                                dealerFirstName:true
                                            }))}
                                        else{
                                            setFormDataError((perv)=>({
                                                ...perv,
                                                dealerFirstName:false
                                            }))
                                        }
                                    }}
                                    onChange={onChange}
                                    value={formData.dealerFirstName}
                                    error={formDataError.dealerFirstName}
                                    helperText={formDataError.dealerFirstName?"Please Enter Firest Name":''}
                                    name="dealerFirstName"
                                    id="outlined-required"
                                    label="First Name"
                                    InputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    fullWidth
                                />
                            </div>
                            <div className="col-span-5">
                                <TextField
                                    onBlur={(e)=>{
                                        if(e.target.value.length < 2){
                                            setFormDataError((perv)=>({
                                                ...perv,
                                                dealerLastName:true
                                            }))}
                                        else{
                                            setFormDataError((perv)=>({
                                                ...perv,
                                                dealerLastName:false
                                            }))
                                        }
                                    }}
                                    onChange={onChange}
                                    value={formData.dealerLastName}
                                    error={formDataError.dealerLastName}
                                    helperText={formDataError.dealerLastName?"Please Enter Last Name":''}
                                    name="dealerLastName"
                                    id="outlined-required"
                                    label="Last Name"
                                    InputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-x-5">
                            <div className="col-span-1">

                            </div>
                            <div className="col-span-5">
                                <TextField
                                    onBlur={(e)=>{
                                        if(e.target.value.length < 2){
                                            setFormDataError((perv)=>({
                                                ...perv,
                                                dealerDisplayName:true
                                            }))}
                                        else{
                                            setFormDataError((perv)=>({
                                                ...perv,
                                                dealerDisplayName:false
                                            }))
                                        }
                                    }}
                                    onChange={onChange}
                                    value={formData.dealerDisplayName}
                                    error={formDataError.dealerDisplayName}
                                    helperText={formDataError.dealerDisplayName?"Please Enter Dealer Code":''}
                                    name="dealerDisplayName"
                                    id="outlined-required"
                                    label="Dealer Code"
                                    InputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    fullWidth
                                />
                            </div>

                            <div className="col-span-5">
                                <FormControl>
                                    <FormLabel required error={formDataError.dealerGender} id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        onBlur={(e)=>{
                                            if(e.target.value.length < 2){
                                                setFormDataError((perv)=>({
                                                    ...perv,
                                                    dealerGender:true
                                                }))}
                                            else{
                                                setFormDataError((perv)=>({
                                                    ...perv,
                                                    dealerGender:false
                                                }))
                                            }
                                        }}
                                        row
                                        onChange={(e)=>{
                                            setFormDataError((perv)=>({
                                            ...perv,
                                            dealerGender:false
                                        }))
                                            onChange(e)}}
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        value={formData.dealerGender}
                                        error={formDataError.dealerGender}
                                        name="dealerGender"
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-x-5">
                            <div className="col-span-1">

                            </div>
                            <div className="col-span-5">
                                <TextField
                                    onBlur={(e)=>{
                                        if(e.target.value.length < 2){
                                            setFormDataError((perv)=>({
                                                ...perv,
                                                dealerFirmName:true
                                            }))}
                                        else{
                                            setFormDataError((perv)=>({
                                                ...perv,
                                                dealerFirmName:false
                                            }))
                                        }
                                    }}
                                    onChange={onChange}
                                    value={formData.dealerFirmName}
                                    error={formDataError.dealerFirmName}
                                    helperText={formDataError.dealerFirmName?"Please Enter Firm Name":''}
                                    name="dealerFirmName"
                                    id="outlined-required"
                                    label="Firm Name"
                                    InputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    fullWidth
                                />
                            </div>
                            <div className="col-span-5">
                                <div className="col-span-5">
                                    <TextField
                                        onBlur={(e)=>{
                                            if(emailRegx.test(e.target.value) || e.target.value === ''){
                                                setFormDataError((perv)=>({
                                                    ...perv,
                                                    dealerEmailId:false
                                                }))}
                                            else{
                                                setFormDataError((perv)=>({
                                                    ...perv,
                                                    dealerEmailId:true
                                                }))
                                            }
                                        }}
                                        error={formDataError.dealerEmailId}
                                        helperText={formDataError.dealerEmailId?"Please Enter valid Email":''}
                                        onChange={onChange}
                                        value={formData.dealerEmailId}
                                        name="dealerEmailId"
                                        id="outlined-required"
                                        label="Email Id"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-12">
                            <div className="col-span-1">

                            </div>
                            <div className="col-span-10">
                                <TextField
                                    onBlur={(e)=>{
                                        if(e.target.value.length < 2){
                                            setFormDataError((perv)=>({
                                                ...perv,
                                                dealerFirmAddressLine1:true
                                            }))}
                                        else{
                                            setFormDataError((perv)=>({
                                                ...perv,
                                                dealerFirmAddressLine1:false
                                            }))
                                        }
                                    }}
                                    onChange={onChange}
                                    id="outlined-required"
                                    label="Address Line 1"
                                    value={formData.dealerFirmAddressLine1}
                                    error={formDataError.dealerFirmAddressLine1}
                                    helperText={formDataError.dealerFirmAddressLine1?"Please Enter Address":''}
                                    name="dealerFirmAddressLine1"
                                    InputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-1">

                            </div>
                            <div className="col-span-10">
                                <TextField
                                     onBlur={(e)=>{
                                        if(e.target.value.length < 2){
                                            setFormDataError((perv)=>({
                                                ...perv,
                                                dealerFirmAddressLine2:true
                                            }))}
                                        else{
                                            setFormDataError((perv)=>({
                                                ...perv,
                                                dealerFirmAddressLine2:false
                                            }))
                                        }
                                    }}
                                    onChange={onChange}
                                    value={formData.dealerFirmAddressLine2}
                                    error={formDataError.dealerFirmAddressLine2}
                                    helperText={formDataError.dealerFirmAddressLine2?"Please Enter Address":''}
                                    name="dealerFirmAddressLine2"
                                    id="outlined-required"
                                    label="Address Line 2"
                                    InputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-x-5">
                            <div className="col-span-1">

                            </div>
                            <div className="col-span-3">
                                <FormControl style={{ minWidth: '100%' }}>
                                    <InputLabel required error={formDataError.dealerFirmState} id="demo-simple-select-label">State</InputLabel>
                                    <Select
                                        onBlur={(e)=>{
                                            if(e.target.value.length < 2){
                                                setFormDataError((perv)=>({
                                                    ...perv,
                                                    dealerFirmState:true
                                                }))}
                                            else{
                                                setFormDataError((perv)=>({
                                                    ...perv,
                                                    dealerFirmState:false
                                                }))
                                            }
                                        }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.dealerFirmState}
                                        error={formDataError.dealerFirmState}
                                        name="dealerFirmState"
                                        label="State"
                                        input={<OutlinedInput sx={{ fontSize: '14px' }} label="Tag" />}
                                        onChange={onChange}
                                    >
                                        {
                                            states ? states.map((state) => (
                                                <MenuItem value={state.stateId}>{state.stateName}</MenuItem>
                                            ))
                                                : <></>
                                        }

                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-span-3">
                                <FormControl style={{ minWidth: '100%' }}>
                                    <InputLabel required error={formDataError.dealerFirmCity} id="demo-simple-select-label">City</InputLabel>
                                    <Select
                                        onBlur={(e)=>{
                                            if(e.target.value.length < 2){
                                                setFormDataError((perv)=>({
                                                    ...perv,
                                                    dealerFirmCity:true
                                                }))}
                                            else{
                                                setFormDataError((perv)=>({
                                                    ...perv,
                                                    dealerFirmCity:false
                                                }))
                                            }
                                        }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.dealerFirmCity}
                                        error={formDataError.dealerFirmCity}
                                        name="dealerFirmCity"
                                        label="City"
                                        input={<OutlinedInput sx={{ fontSize: '14px' }} label="Tag" />}
                                        onChange={onChange}
                                    >
                                        {
                                            citys?.map((city) => (
                                                <MenuItem value={city.cityId}>{city.cityName}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-span-4">
                                <TextField
                                    onBlur={(e)=>{
                                        if(e.target.value.length < 6){
                                            setFormDataError((perv)=>({
                                                ...perv,
                                                dealerFirmPincode:true
                                            }))}
                                        else{
                                            setFormDataError((perv)=>({
                                                ...perv,
                                                dealerFirmPincode:false
                                            }))
                                        }
                                    }}
                                    onChange={(e)=>{
                                        if((regex.test(e.target.value) || e.target.value === '') && e.target.value.length<7)
                                        {
                                                onChange(e)
                                        }
                                        }}
                                    value={formData.dealerFirmPincode}
                                    error={formDataError.dealerFirmPincode}
                                    helperText={formDataError.dealerFirmPincode?"Please Enter Pincode":''}
                                    name="dealerFirmPincode"
                                    id="outlined-required"
                                    label="PIN Code"
                                    InputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-x-5">
                            <div className="col-span-1">

                            </div>
                            <div className="col-span-5">
                                <TextField
                                    onBlur={(e)=>{
                                        if(e.target.value.length < 10){
                                            setFormDataError((perv)=>({
                                                ...perv,
                                                dealerMobileNumber:true
                                            }))}
                                        else{
                                            setFormDataError((perv)=>({
                                                ...perv,
                                                dealerMobileNumber:false
                                            }))
                                        }
                                    }}
                                    onChange={(e)=>{
                                        if((regex.test(e.target.value) || e.target.value === '') && e.target.value.length<11)
                                        {
                                                onChange(e)
                                        }
                                        }}
                                    value={formData.dealerMobileNumber}
                                    error={formDataError.dealerMobileNumber}
                                    helperText={formDataError.dealerMobileNumber?"Please Enter Mobile Number":''}
                                    name="dealerMobileNumber"
                                    id="outlined-required"
                                    label="Mobile Number"
                                    InputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    fullWidth
                                />
                            </div>
                            <div className="col-span-5">
                                <div className="col-span-5">
                                    <TextField
                                        onBlur={(e)=>{
                                            if(e.target.value.length < 10){
                                                setFormDataError((perv)=>({
                                                    ...perv,
                                                    dealerWhatsAppNumber:true
                                                }))}
                                            else{
                                                setFormDataError((perv)=>({
                                                    ...perv,
                                                    dealerWhatsAppNumber:false
                                                }))
                                            }
                                        }}
                                        onChange={(e)=>{
                                            if((regex.test(e.target.value) || e.target.value === '') && e.target.value.length<11)
                                            {
                                                    onChange(e)
                                            }
                                            }}
                                        value={formData.dealerWhatsAppNumber}
                                        error={formDataError.dealerWhatsAppNumber}
                                        helperText={formDataError.dealerWhatsAppNumber?"Please Enter WhatsApp Number":''}
                                        name="dealerWhatsAppNumber"
                                        id="outlined-required"
                                        label="Whatsapp Number"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-x-5">
                            <div className="col-span-4 col-start-3">
                                <button className="editDealer_button" onClick={() => submit()}>
                                    Save
                                </button>
                            </div>
                            <div className="col-span-4 ">
                                <button className="cancle_button" onClick={() => handleCancleClick()}>
                                    Cancle
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default EditDealer;