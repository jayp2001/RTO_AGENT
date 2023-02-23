import './addDealer.css'
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
import { createDealer, resetAddDealer } from '../../action/agentAction/agentAction';
import { ToastContainer, toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';

function AddDealer() {
    const { loading, success, error } = useSelector((state) => state.dealerCreate);
    const states = useSelector((state) => state.stateList.state);
    const citys = useSelector((state) => state.cityList.state);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(
        {
            dealerFirstName: '',
            dealerLastName: '',
            dealerDisplayName: '',
            dealerGender: '',
            dealerFirmName: '',
            dealerFirmAddressLine1: '',
            dealerFirmAddressLine2: '',
            dealerFirmCity: '',
            dealerFirmState: '',
            dealerFirmPincode: '',
            dealerMobileNumber: '',
            dealerWhatsAppNumber: '',
            dealerEmailId: ''
        }
    )

    // useEffect(() => {
    //     dispatch(getStateList());
    //     dispatch(getCityList())
    // }, [dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleChange = (date) => {
        setFormData((prevState) => ({
            ...prevState,
            ["agentBirthDate"]: new Date(date).toISOString().slice(0, 10),
        }))
    };

    const submit = () => {
        console.log('>>>>>>>>>>', formData)
        dispatch(createDealer(formData))
    }

    const reset = async () => {
        setFormData({
            dealerFirstName: '',
            dealerLastName: '',
            dealerDisplayName: '',
            dealerGender: '',
            dealerFirmName: '',
            dealerFirmAddressLine1: '',
            dealerFirmAddressLine2: '',
            dealerFirmCity: '',
            dealerFirmState: '',
            dealerFirmPincode: '',
            dealerMobileNumber: '',
            dealerWhatsAppNumber: '',
            dealerEmailId: ''
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

        dispatch(resetAddDealer())
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
        dispatch(resetAddDealer())
    }

    return (
        <div className="addAdmin_wrapper flex items-center">
            <div className="grid justify-items-center addAdmin_inner_wrapper">

                <div className="admin_container">
                    <div className="header flex items-center ">
                        <div className="grid justify-items-center w-full">
                            <div className="header_text">
                                Add Dealer
                            </div>
                        </div>
                    </div>
                    <div className="grid gird-rows-10 gap-y-6">
                        <div className="grid grid-cols-12 gap-x-5">

                            <div className="col-span-1">

                            </div>
                            <div className="col-span-5">
                                <TextField
                                    required
                                    onChange={onChange}
                                    value={formData.dealerFirstName}
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
                                    required
                                    onChange={onChange}
                                    value={formData.dealerLastName}
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
                                    required
                                    onChange={onChange}
                                    value={formData.dealerDisplayName}
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
                                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        onChange={onChange}
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        value={formData.dealerGender}
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
                                    required
                                    onChange={onChange}
                                    value={formData.dealerFirmName}
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
                                        required
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
                                    required
                                    onChange={onChange}
                                    id="outlined-required"
                                    label="Address Line 1"
                                    value={formData.dealerFirmAddressLine1}
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
                                    required
                                    onChange={onChange}
                                    value={formData.dealerFirmAddressLine2}
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
                                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.dealerFirmState}
                                        name="dealerFirmState"
                                        label="State"
                                        input={<OutlinedInput sx={{ fontSize: '14px' }} label="Tag" />}
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
                            <div className="col-span-3">
                                <FormControl style={{ minWidth: '100%' }}>
                                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.dealerFirmCity}
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
                                        {/* <MenuItem value={30}>Rajkot</MenuItem>
                                    <MenuItem value={31}>Jamnagar</MenuItem>
                                    <MenuItem value={"Morrbi"}>Morbi</MenuItem> */}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-span-4">
                                <TextField
                                    required
                                    value={formData.dealerFirmPincode}
                                    name="dealerFirmPincode"
                                    id="outlined-required"
                                    label="PIN Code"
                                    onChange={onChange}
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
                                    required
                                    onChange={onChange}
                                    value={formData.dealerMobileNumber}
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
                                        required
                                        onChange={onChange}
                                        value={formData.dealerWhatsAppNumber}
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
                            <div className="col-span-4 col-start-5">
                                <button className="addAgent_button" onClick={submit}>
                                    Add Dealer
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

export default AddDealer;