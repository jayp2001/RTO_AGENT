import "./addBook.css"
import React from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useDispatch, useSelector } from "react-redux";
import { addBook, resetAddBook } from '../../action/agentAction/agentAction'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';
import Checkbox from '@mui/material/Checkbox';

function AddBook() {
    const { loading, success, error } = useSelector((state) => state.addBook);
    console.log(loading, success, error)
    const states = useSelector((state) => state.stateList.state);
    const citys = useSelector((state) => state.cityList.state);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(
        {
            vehicleRegistrationNumber: '',
            vehicleChassisNumber: '',
            vehicleEngineNumber: '',
            vehicleMake: '',
            vehicleRegistrationDate: null,
            vehicleClass: '',
            vehicleCategory: '',
            TO: false,
            HPT: false,
            DRC: false,
            HPA: false,
            HPC: false,
            RRF: false,
            NOC: false,
            AV: false,
            addressChange: false,
            insuranceStartDate: null,
            insuranceEndDate: null,
            insuranceCompanyNameld: '',
            insuranceType: '',
            policyNumber: '',
            dealerld: '',
            privateCustomerName: '',
            sellerCity: '',
            sellerState: '',
            sellerPincode: '',
            sellerAddressLine1: '',
            sellerAddressLine2: '',
            sellerFirstName: '',
            sellerMiddleName: '',
            sellerLastName: '',
            buyerCity: '',
            buyerState: '',
            buyerAddressLine1: '',
            buyerAddressLine2: '',
            buyerFirstName: '',
            buyerMiddleName: '',
            buyerLastName: '',
            clientMobileNumber: '',
            buyerPincode: ''

        }
    )

    // React.useEffect(() => {
    //     dispatch(getStateList());
    //     dispatch(getCityList())
    // }, [dispatch, formData])

    // console.log(":::", agentAddRes)

    const handleVehicleRegistrationDate = (date) => {
        setFormData((prevState) => ({
            ...prevState,
            ["vehicleRegistrationDate"]: date,
        }))
    };
    const handleInsuranceStartDate = (date) => {
        setFormData((prevState) => ({
            ...prevState,
            ["insuranceStartDate"]: date,
        }))
    };
    const handleInsuranceEndDate = (date) => {
        setFormData((prevState) => ({
            ...prevState,
            ["insuranceEndDate"]: date,
        }))
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const handleCheckbox = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: !formData[e.target.name],
        }))
    }
    const submit = (e) => {

        e.preventDefault();
        console.log('>>>>>>>>>>', formData)
        dispatch(addBook(formData))
    }

    const reset = async () => {
        setFormData({
            vehicleRegistrationNumber: '',
            vehicleChassisNumber: '',
            vehicleEngineNumber: '',
            vehicleMake: '',
            vehicleRegistrationDate: null,
            vehicleClass: '',
            vehicleCategory: '',
            TO: false,
            HPT: false,
            DRC: false,
            HPA: false,
            HPC: false,
            RRF: false,
            NOC: false,
            AV: false,
            addressChange: false,
            insuranceStartDate: null,
            insuranceEndDate: null,
            insuranceCompanyNameld: '',
            insuranceType: '',
            policyNumber: '',
            dealerld: '',
            privateCustomerName: '',
            sellerCity: '',
            sellerState: '',
            sellerPincode: '',
            sellerAddressLine1: '',
            sellerAddressLine2: '',
            sellerFirstName: '',
            sellerMiddleName: '',
            sellerLastName: '',
            sellerMobileNumber: '',
            buyerCity: '',
            buyerState: '',
            buyerAddressLine1: '',
            buyerAddressLine2: '',
            buyerFirstName: '',
            buyerMiddleName: '',
            buyerLastName: '',
            clientMobileNumber: '',
            buyerPincode: ''
        })
    }
    if (loading) {
        // toast.loading("Please wait...", {
        //     toastId: 'loading'
        // })
        // window.alert()
    }
    if (success) {
        toast.dismiss('loading');
        toast.dismiss('error');
        toast('success',
            {
                type: 'success',
                toastId: 'success',
                position: "bottom-right",
                toastId: 'error',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        dispatch(resetAddBook())
        setTimeout(() => {
            reset()
        }, 50)
    }
    if (error) {
        toast.dismiss('loading');
        toast(error, {
            type: 'error',
            position: "bottom-right",
            toastId: 'error',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
    console.log("././?", formData.insuranceStartDate);
    return (
        <>
            <div className="addAdmin_wrapper flex items-center">
                <div className="grid justify-items-center addAdmin_inner_wrapper">

                    <div className="admin_container">
                        <div className="header flex items-center ">
                            <div className="grid justify-items-center w-full">
                                <div className="header_text">
                                    Add Book
                                </div>
                            </div>
                        </div>
                        <div className="formHeader">
                            Vehicle Detail
                        </div>
                        <div className="grid gird-rows-10 gap-y-6">
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-4">
                                    <TextField
                                        required
                                        onChange={onChange}
                                        value={formData.vehicleRegistrationNumber}
                                        name="vehicleRegistrationNumber"
                                        id="outlined-required"
                                        label="Vehicle Registration Number"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>
                                <div className="col-span-4">
                                    <TextField
                                        required
                                        onChange={onChange}
                                        value={formData.vehicleChassisNumber}
                                        name="vehicleChassisNumber"
                                        id="outlined-required"
                                        label="Vehicle Chassis Number"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>
                                <div className="col-span-4">
                                    <TextField
                                        required
                                        onChange={onChange}
                                        value={formData.vehicleEngineNumber}
                                        name="vehicleEngineNumber"
                                        id="outlined-required"
                                        label="Vehicle Engine Number"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-4">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Vehicle Class</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.vehicleClass}
                                            label="Vehicle Class"
                                            name="vehicleClass"
                                            onChange={onChange}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-span-4">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Vehicle Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.vehicleCategory}
                                            label="Vehicle Category"
                                            name="vehicleCategory"
                                            onChange={onChange}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-span-4">
                                    <TextField
                                        required
                                        onChange={onChange}
                                        value={formData.vehicleMake}
                                        name="vehicleMake"
                                        id="outlined-required"
                                        label="Vehicle Make"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-4">
                                    <TextField
                                        required
                                        onChange={onChange}
                                        value={formData.vehicleModel}
                                        name="vehicleModel"
                                        id="outlined-required"
                                        label="Vehicle Model"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>
                                <div className="col-span-4">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            textFieldStyle={{ width: '100%' }}
                                            InputProps={{ style: { fontSize: 14, width: '100%' } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                            label="Vehicle Registration Date"
                                            required
                                            inputFormat="DD/MM/YYYY"
                                            value={formData.vehicleRegistrationDate}
                                            onChange={handleVehicleRegistrationDate}
                                            name="vehicleRegistrationDate"
                                            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                        <div className="formHeader2">
                            Work To be done
                        </div>
                        <div className="grid gird-rows-10 gap-y-6">
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-3">
                                    <FormControlLabel control={<Checkbox checked={formData.TO} name="TO" onClick={handleCheckbox} />} label="Transfer Of Ownership" />
                                </div>
                                <div className="col-span-4">
                                    <FormControlLabel control={<Checkbox checked={formData.HPT} name='HPT' onClick={handleCheckbox} />} label="Termination of Hypothecation" />
                                </div>
                                <div className="col-span-2">
                                    <FormControlLabel control={<Checkbox checked={formData.DRC} name='DRC' onClick={handleCheckbox} />} label="Duplicate RC" />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-3">
                                    <FormControlLabel control={<Checkbox checked={formData.addressChange} name='addressChange' onClick={handleCheckbox} />} label="Change of Address" />
                                </div>
                                <div className="col-span-4">
                                    <FormControlLabel control={<Checkbox checked={formData.HPC} name='HPC' onClick={handleCheckbox} />} label="Continuation of Hypothecation" />
                                </div>
                                <div className="col-span-4">
                                    <FormControlLabel control={<Checkbox checked={formData.HPA} name='HPA' onClick={handleCheckbox} />} label="Addition of Hypothecation" />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-3">
                                    <FormControlLabel control={<Checkbox checked={formData.RRF} name='RRF' onClick={handleCheckbox} />} label="Renewal Of Registration" />
                                </div>
                                <div className="col-span-4">
                                    <FormControlLabel control={<Checkbox checked={formData.AV} name='AV' onClick={handleCheckbox} />} label="Alteration of Vehicle" />
                                </div>
                                <div className="col-span-5">
                                    <FormControlLabel control={<Checkbox checked={formData.NOC} name='NOC' onClick={handleCheckbox} />} label="Application for No Objection Certificate" />
                                </div>
                            </div>
                        </div>
                        <div className="formHeader2">
                            Dealer
                        </div>
                        <div className="grid gird-rows-10 gap-y-6">
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-4">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Dealer Code</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.dealerld}
                                            label="Dealer Code"
                                            name="dealerld"
                                            onChange={onChange}
                                        >
                                            <MenuItem value={1}>private</MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                {formData?.dealerld == 1 &&
                                    <>
                                        <div className="col-span-4">
                                            <TextField
                                                required
                                                onChange={onChange}
                                                value={formData.privateCustomerName}
                                                name="privateCustomerName"
                                                id="outlined-required"
                                                label="Private Customer Name"
                                                InputProps={{ style: { fontSize: 16 } }}
                                                InputLabelProps={{ style: { fontSize: 16 } }}
                                                fullWidth
                                            />
                                        </div>
                                    </>
                                }
                                {(formData?.dealerld == 1 || (formData.dealerld != 1 && !formData.TO)) &&
                                    <>
                                        <div className="col-span-4">
                                            <TextField
                                                required
                                                onChange={onChange}
                                                value={formData.clientMobileNumber}
                                                name="clientMobileNumber"
                                                id="outlined-required"
                                                label="Customer Number"
                                                InputProps={{ style: { fontSize: 16 } }}
                                                InputLabelProps={{ style: { fontSize: 16 } }}
                                                fullWidth
                                            />
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="formHeader2">
                            Vehicle Owner Detail
                        </div>
                        <div className="grid gird-rows-10 gap-y-6">
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-4">
                                    <TextField
                                        required
                                        onChange={onChange}
                                        value={formData.sellerFirstName}
                                        name="sellerFirstName"
                                        id="outlined-required"
                                        label="Seller First Name"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>
                                <div className="col-span-4">
                                    <TextField
                                        required
                                        onChange={onChange}
                                        value={formData.sellerMiddleName}
                                        name="sellerMiddleName"
                                        id="outlined-required"
                                        label="Seller Middle Name"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>
                                <div className="col-span-4">
                                    <TextField
                                        required
                                        onChange={onChange}
                                        value={formData.sellerLastName}
                                        name="sellerLastName"
                                        id="outlined-required"
                                        label="Seller Last Name"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-6">
                                    <TextField
                                        required
                                        onChange={onChange}
                                        id="outlined-required"
                                        label="Address Line 1"
                                        value={formData.sellerAddressLine1}
                                        name="sellerAddressLine1"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>
                                <div className="col-span-6">
                                    <TextField
                                        required
                                        onChange={onChange}
                                        value={formData.sellerAddressLine2}
                                        name="sellerAddressLine2"
                                        id="outlined-required"
                                        label="Address Line 2"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-4">
                                    <FormControl style={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-label">State</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.sellerState}
                                            name="sellerState"
                                            label="State"
                                            onChange={onChange}
                                        >
                                            {
                                                states?.map((state) => (
                                                    <MenuItem value={state.stateId}>{state.stateName}</MenuItem>
                                                ))
                                            }

                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-span-4">
                                    <FormControl style={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-label">City</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.sellerCity}
                                            name="sellerCity"
                                            label="City"
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
                                        required
                                        value={formData.sellerPincode}
                                        name="sellerPincode"
                                        id="outlined-required"
                                        label="PIN Code"
                                        onChange={onChange}
                                        InputProps={{ style: { fontSize: 16 } }}
                                        InputLabelProps={{ style: { fontSize: 16 } }}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-4">
                                    <TextField
                                        required
                                        onChange={onChange}
                                        value={formData.sellerMobileNumber}
                                        name="sellerMobileNumber"
                                        id="outlined-required"
                                        label="Mobile Number"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </div>
                        {formData?.TO == true &&
                            <>
                                <div className="formHeader2">
                                    Vehicle Buyer Detail
                                </div>
                                <div className="grid gird-rows-10 gap-y-6">
                                    <div className="grid grid-cols-12 gap-x-5">
                                        <div className="col-span-4">
                                            <TextField
                                                required
                                                onChange={onChange}
                                                value={formData.buyerFirstName}
                                                name="buyerFirstName"
                                                id="outlined-required"
                                                label="Buyer First Name"
                                                InputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{ style: { fontSize: 14 } }}
                                                fullWidth
                                            />
                                        </div>
                                        <div className="col-span-4">
                                            <TextField
                                                required
                                                onChange={onChange}
                                                value={formData.buyerMiddleName}
                                                name="buyerMiddleName"
                                                id="outlined-required"
                                                label="Buyer Middle Name"
                                                InputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{ style: { fontSize: 14 } }}
                                                fullWidth
                                            />
                                        </div>
                                        <div className="col-span-4">
                                            <TextField
                                                required
                                                onChange={onChange}
                                                value={formData.buyerLastName}
                                                name="buyerLastName"
                                                id="outlined-required"
                                                label="Buyer Last Name"
                                                InputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{ style: { fontSize: 14 } }}
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-x-5">
                                        <div className="col-span-6">
                                            <TextField
                                                required
                                                onChange={onChange}
                                                id="outlined-required"
                                                label="Address Line 1"
                                                value={formData.buyerAddressLine1}
                                                name="buyerAddressLine1"
                                                InputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{ style: { fontSize: 14 } }}
                                                fullWidth
                                            />
                                        </div>
                                        <div className="col-span-6">
                                            <TextField
                                                required
                                                onChange={onChange}
                                                value={formData.buyerAddressLine2}
                                                name="buyerAddressLine2"
                                                id="outlined-required"
                                                label="Address Line 2"
                                                InputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{ style: { fontSize: 14 } }}
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-x-5">
                                        <div className="col-span-4">
                                            <FormControl style={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-label">State</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={formData.sellerState}
                                                    name="sellerState"
                                                    label="State"
                                                    onChange={onChange}
                                                >
                                                    {
                                                        states?.map((state) => (
                                                            <MenuItem value={state.stateId}>{state.stateName}</MenuItem>
                                                        ))
                                                    }

                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col-span-4">
                                            <FormControl style={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-label">City</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={formData.buyerCity}
                                                    name="buyerCity"
                                                    label="City"
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
                                                required
                                                value={formData.buyerPincode}
                                                name="buyerPincode"
                                                id="outlined-required"
                                                label="PIN Code"
                                                onChange={onChange}
                                                InputProps={{ style: { fontSize: 16 } }}
                                                InputLabelProps={{ style: { fontSize: 16 } }}
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-x-5">
                                        <div className="col-span-4">
                                            <TextField
                                                required
                                                onChange={onChange}
                                                value={formData.clientMobileNumber}
                                                name="clientMobileNumber"
                                                id="outlined-required"
                                                label="Mobile Number"
                                                InputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{ style: { fontSize: 14 } }}
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        <div className="formHeader2">
                            Insurance Details
                        </div>
                        <div className="grid gird-rows-10 gap-y-6">
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-4">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Insurance Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.insuranceType}
                                            label="Insurance Type"
                                            name="insuranceType"
                                            onChange={onChange}
                                        >
                                            <MenuItem value={'Comprehensive'}>Comprehensive</MenuItem>
                                            <MenuItem value={'Theft And Third Party'}>Theft And Third Party</MenuItem>
                                            <MenuItem value={'Third Party'}>Third Party</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-span-4">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Insurance Company Name</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.insuranceCompanyNameld}
                                            label="Insurance Company Name"
                                            name="insuranceCompanyNameld"
                                            onChange={onChange}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-span-4">
                                    <TextField
                                        onChange={onChange}
                                        value={formData.policyNumber}
                                        name="policyNumber"
                                        id="outlined-required"
                                        label="Policy Number"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-4">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            textFieldStyle={{ width: '100%' }}
                                            InputProps={{ style: { fontSize: 14, width: '100%' } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                            label="Insurance Start Date"
                                            required
                                            inputFormat="DD/MM/YYYY"
                                            value={formData.insuranceStartDate}
                                            onChange={handleInsuranceStartDate}
                                            name="insuranceStartDate"
                                            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="col-span-4">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            textFieldStyle={{ width: '100%' }}
                                            InputProps={{ style: { fontSize: 14, width: '100%' } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                            label="Insurance End Date"
                                            required
                                            inputFormat="DD/MM/YYYY"
                                            value={formData.insuranceEndDate}
                                            onChange={handleInsuranceEndDate}
                                            name="insuranceEndDate"
                                            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-x-5">
                            <div className="col-span-4 col-start-5">
                                <button className="addAgent_button" onClick={(event) => submit(event)}>
                                    Add Book
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default AddBook;