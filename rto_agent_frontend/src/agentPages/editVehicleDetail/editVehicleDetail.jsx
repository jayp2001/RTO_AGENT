import "../addBook/addBook.css"
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
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';
import Checkbox from '@mui/material/Checkbox';
import { dealerDropdown, insuranceCompany, resetEditbook, resetEditBookError, bookEdit, serviceAuthority, vehicleCategories, vehicleClass } from '../../action/agentAction/agentAction'
import { containerClasses } from "@mui/system";
import { getStateList, getCityList } from '../../action/adminAction/adminAction';
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from '../../type/url';
import { useParams } from 'react-router-dom';

function EditBook() {
    const { loading, success, error } = useSelector((state) => state.bookEditReducer);
    console.log(loading, success, error)
    const states = useSelector((state) => state.stateList.state);
    const citys = useSelector((state) => state.cityList.state);
    const dealerDropdownList = useSelector((state) => state.dealerDropdown.state);
    const insuranceCompanyList = useSelector((state) => state.insuranceCompanyL.state);
    const serviceAuthorityList = useSelector((state) => state.serviceAuthority.state);
    const vehicleCategoriesList = useSelector((state) => state.vehicleCategories.state);
    const vehicleClassList = useSelector((state) => state.vehicleClass.state);
    const dispatch = useDispatch();
    let { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState()
    const regex = /^[0-9\b]+$/;

    React.useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const fetching = async (dealerId) => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.get(
                `${BACKEND_BASE_URL}vehicleRegistrationrouter/fillUpdateDetailForVehicle?vehicleRegistrationId=${dealerId}`,
                config
            );
            setFormData(data)
        };
        fetching(id)

        dispatch(getStateList());
        dispatch(getCityList())
        dispatch(dealerDropdown());
        dispatch(insuranceCompany());
        dispatch(serviceAuthority());
        dispatch(vehicleCategories());
        dispatch(vehicleClass());
    }, [dispatch])

    // console.log(":::", agentAddRes)

    const [formDataError, setFormDataError] = useState(
        {
            vehicleRegistrationNumber: false,
            vehicleChassisNumber: false,
            vehicleEngineNumber: false,
            vehicleModel: false,
            vehicleMake: false,
            dealerId: false,
            privateCustomerName: false,
            sellerAddress: false,
            sellerFirstName: false,
            sellerMiddleName: false,
            sellerLastName: false,
            buyerCity: false,
            buyerState: false,
            buyerAddressLine1: false,
            buyerAddressLine2: false,
            buyerAddressLine3: false,
            buyerFirstName: false,
            buyerMiddleName: false,
            buyerLastName: false,
            clientWhatsAppNumber: false,
            buyerPincode: false,
            serviceAuthority: false

        }
    )

    const [fields, setFields] = useState(
        [
            "vehicleRegistrationNumber",
            "vehicleChassisNumber",
            "vehicleEngineNumber",
            "vehicleModel",
            "vehicleMake",
            "dealerId",
            "privateCustomerName",
            "sellerAddress",
            "sellerFirstName",
            "sellerMiddleName",
            "sellerLastName",
            "buyerCity",
            "buyerState",
            "buyerAddressLine1",
            "buyerAddressLine2",
            "buyerAddressLine3",
            "buyerFirstName",
            "buyerMiddleName",
            "buyerLastName",
            "clientWhatsAppNumber",
            "buyerPincode",
            "serviceAuthority"

        ]
    )

    const [buyerFields, setBuyerFields] = useState(
        [
            "buyerCity",
            "buyerState",
            "buyerAddressLine1",
            "buyerAddressLine2",
            "buyerAddressLine3",
            "buyerFirstName",
            "buyerMiddleName",
            "buyerLastName",
            "buyerPincode",

        ]
    )

    const [workFields, setWorkFields] = useState(
        [
            "TO",
            "HPT",
            "DRC",
            "HPA",
            "HPC",
            "RRF",
            "NOC",
            "AV",
            "addressChange"
        ]
    )

    const handleVehicleRegistrationDate = (date) => {
        setFormData((prevState) => ({
            ...prevState,
            ["vehicleRegistrationDate"]: date && date['$d'] ? date['$d'] : null,
        }))
    };
    const handleInsuranceStartDate = (date) => {
        setFormData((prevState) => ({
            ...prevState,
            ["insuranceStartDate"]: date && date['$d'] ? date['$d'] : null,
        }))

        var d = new Date(date && date['$d'] ? date['$d'] : null);
        (d.setDate(d.getDate() - 1));
        console.log(">>>", d.toString());
        var a = new Date(d)
        a.setFullYear(a.getFullYear() + 1);
        console.log("???", a.toString());
        const s = a.toString();
        setFormData((prevState) => ({
            ...prevState,
            ["insuranceEndDate"]: s && date && date['$d'] ? s : null,
        }))
    };
    const handleInsuranceEndDate = (date) => {
        setFormData((prevState) => ({
            ...prevState,
            ["insuranceEndDate"]: date && date['$d'] ? date['$d'] : null,
        }))
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const handleCheckbox = (e) => {
        if (e.target.name === 'TO' && formData[e.target.name] === true) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: !formData[e.target.name],
                ["buyerCity"]: '',
                ["buyerState"]: '',
                ["buyerAddressLine1"]: '',
                ["buyerAddressLine2"]: '',
                ["buyerAddressLine3"]: '',
                ["buyerFirstName"]: '',
                ["buyerMiddleName"]: '',
                ["buyerLastName"]: '',
                ["buyerPincode"]: '',
            }))
        }
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: !formData[e.target.name],
        }))
    }

    if (loading) {
        toast.loading("Please wait...", {
            toastId: 'loading'
        })
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
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        dispatch(resetEditbook())
        setTimeout(() => {
            navigate(`/vehicleDetail/${id}`)
        }, 2000)
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
        dispatch(resetEditBookError())
    }

    const handleInsuranceChange = (event, value) => {
        console.log(event)
        const id = value?.insuranceId
        setFormData((prevState) => ({
            ...prevState,
            ['insuranceCompanyNameId']: id
        }))
        console.log('>>', formData.insuranceCompanyNameId);
    }
    const handleVehicleClassChange = (event, value) => {
        console.log(event)
        console.log("LLLLL", value)
        const id = value?.vehicleClassId
        setFormData((prevState) => ({
            ...prevState,
            ['vehicleClass']: id
        }))
        console.log('>>', formData.insuranceCompanyNameId);
    }
    const handleVehicleCategoryChange = (event, value) => {
        console.log(event)
        const id = value?.vehicleCategoryId
        setFormData((prevState) => ({
            ...prevState,
            ['vehicleCategory']: id
        }))
        console.log('>>', formData.insuranceCompanyNameId);
    }
    const handleDealerChange = (event, value) => {
        console.log(event)
        const id = value?.dealerId
        setFormData((prevState) => ({
            ...prevState,
            ['dealerId']: id
        }))
        console.log('>>', formData.insuranceCompanyNameId);
    }
    // if (dealerDropdownList) {
    //     dealerDropdownList.unshift({ dealerId: 100, dealerDisplayName: 'PRIVATE' });
    // }
    const submit = () => {
        console.log('>>>>>>>>>>', formData)
        const isWorkSelected = workFields.filter(element => {
            if (formData[element]) {
                return true
            }
        })
        const isValidate = fields.filter(element => {
            console.log("formDataError", formDataError[element]);
            console.log("formData", formData[element]);
            if (formDataError[element] === true || formData[element] === '' || formData[element] === null) {
                console.log("KKKK")
                console.log("isvalidate", formData.TO === false && (buyerFields.includes(element)))
                if (formData.TO === false && (buyerFields.includes(element))) {
                    setFormDataError((perv) => ({
                        ...perv,
                        [element]: false
                    }))
                    return null;
                } else if (formData.dealerId !== '100' && element === "privateCustomerName") {
                    setFormDataError((perv) => ({
                        ...perv,
                        [element]: false
                    }))
                    return null;
                }
                else {
                    setFormDataError((perv) => ({
                        ...perv,
                        [element]: true
                    }))
                    return element;
                }

            }
            else {
                console.log("LLLL")
            }
        })
        console.log('????', isValidate);
        console.log('??/>>', isWorkSelected);
        if (isValidate.length > 0 || isWorkSelected.length === 0) {
            alert(
                "Please Fill All Field"
            )
        } else {
            dispatch(bookEdit(id, formData))
        }


    }
    const handleCancleClick = () => {
        navigate(`/bookList`)
    }



    if (!formData) {
        return null
    }
    console.log(vehicleClassList ? vehicleClassList.find(obj => obj.vehicleClassId === formData.vehicleClass) : null)
    return (
        <>
            <div className="addAdmin_wrapper flex items-center">
                <div className="grid justify-items-center addAdmin_inner_wrapper">

                    <div className="admin_container">
                        <div className="header flex items-center ">
                            <div className="grid justify-items-center w-full">
                                <div className="header_text">
                                    Edit Book
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
                                        onBlur={(e) => {
                                            if (e.target.value.length < 9) {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    vehicleRegistrationNumber: true
                                                }))
                                            }
                                            else {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    vehicleRegistrationNumber: false
                                                }))
                                            }
                                        }}
                                        onChange={(e) => {
                                            if (e.target.value.length < 11) {
                                                onChange(e)
                                            }
                                        }}
                                        value={formData.vehicleRegistrationNumber}
                                        error={formDataError.vehicleRegistrationNumber}
                                        helperText={formDataError.vehicleRegistrationNumber ? "Please Enter Vehicle Number (GJXXABXXXX)" : ''}
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
                                        onBlur={(e) => {
                                            if (e.target.value.length < 5) {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    vehicleChassisNumber: true
                                                }))
                                            }
                                            else {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    vehicleChassisNumber: false
                                                }))
                                            }
                                        }}
                                        onChange={onChange}
                                        value={formData.vehicleChassisNumber}
                                        error={formDataError.vehicleChassisNumber}
                                        helperText={formDataError.vehicleChassisNumber ? "Please Enter Chassis Number (5 Character)" : ''}
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
                                        onBlur={(e) => {
                                            if (e.target.value.length < 5) {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    vehicleEngineNumber: true
                                                }))
                                            }
                                            else {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    vehicleEngineNumber: false
                                                }))
                                            }
                                        }}
                                        onChange={onChange}
                                        value={formData.vehicleEngineNumber}
                                        error={formDataError.vehicleEngineNumber}
                                        helperText={formDataError.vehicleEngineNumber ? "Please Enter Engine Number (5 Character)" : ''}
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
                                        {/* <InputLabel id="demo-simple-select-label">Vehicle Class</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.vehicleClass}
                                            label="Vehicle Class"
                                            name="vehicleClass"
                                            onChange={onChange}
                                        >
                                            {vehicleClassList && vehicleClassList.map((row) => (
                                                <MenuItem value={row.vehicleClassId}>{row.vehicleClassName}</MenuItem>
                                            ))}
                                        </Select> */}
                                        <Autocomplete
                                            disablePortal
                                            sx={{ width: '100%' }}
                                            id="vehicleClass"
                                            value={vehicleClassList ? vehicleClassList.find(obj => obj.vehicleClassId === formData.vehicleClass) : null}
                                            onChange={handleVehicleClassChange}
                                            options={vehicleClassList ? vehicleClassList : []}
                                            getOptionLabel={(options) => options.vehicleClassName}
                                            renderInput={(params) => <TextField {...params} label="Vehicle Class" />}
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-span-4">
                                    {/* <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Vehicle Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.vehicleCategory}
                                            label="Vehicle Category"
                                            name="vehicleCategory"
                                            onChange={onChange}
                                        >
                                            {vehicleCategoriesList?.map((row) => (
                                                <MenuItem value={row.vehicleCategoryId}>{row.vehicleCategoryName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl> */}
                                    <Autocomplete
                                        disablePortal
                                        id="vehicleCategoriesList"
                                        value={vehicleCategoriesList ? vehicleCategoriesList.find(obj => obj.vehicleCategoryId === formData.vehicleCategory) : null}
                                        onChange={handleVehicleCategoryChange}
                                        options={vehicleCategoriesList ? vehicleCategoriesList : []}
                                        sx={{ width: '100%' }}
                                        getOptionLabel={(options) => options.vehicleCategoryName}
                                        renderInput={(params) => <TextField {...params} label="Vehicle Category" />}
                                    />
                                </div>
                                <div className="col-span-4">
                                    <TextField
                                        onBlur={(e) => {
                                            if (e.target.value.length < 2) {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    vehicleMake: true
                                                }))
                                            }
                                            else {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    vehicleMake: false
                                                }))
                                            }
                                        }}
                                        onChange={onChange}
                                        value={formData.vehicleMake}
                                        error={formDataError.vehicleMake}
                                        helperText={formDataError.vehicleMake ? "Please Enter Make" : ''}
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
                                        onBlur={(e) => {
                                            if (e.target.value.length < 2) {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    vehicleModel: true
                                                }))
                                            }
                                            else {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    vehicleModel: false
                                                }))
                                            }
                                        }}
                                        onChange={onChange}
                                        value={formData.vehicleModel}
                                        error={formDataError.vehicleModel}
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
                                <div className="col-span-4">
                                    <FormControl fullWidth>
                                        <InputLabel required error={formDataError.serviceAuthority} id="demo-simple-select-label">Service Authority</InputLabel>
                                        <Select
                                            onBlur={(e) => {
                                                if (e.target.value.length < 2) {
                                                    setFormDataError((perv) => ({
                                                        ...perv,
                                                        serviceAuthority: true
                                                    }))
                                                }
                                                else {
                                                    setFormDataError((perv) => ({
                                                        ...perv,
                                                        serviceAuthority: false
                                                    }))
                                                }
                                            }}
                                            labelId="demo-simple-select-label"
                                            value={formData.serviceAuthority}
                                            error={formDataError.serviceAuthority}
                                            id="demo-simple-select"
                                            label="Service Authority"
                                            name="serviceAuthority"
                                            onChange={onChange}
                                        >
                                            {serviceAuthorityList?.map((row) => (
                                                <MenuItem value={row.RTOcityId}>{row.cityRTOName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div className="formHeader2">
                            Work To be done
                        </div>
                        <div className="grid gird-rows-10 gap-y-6">
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-4">
                                    <FormControlLabel control={<Checkbox checked={formData.TO} name="TO" onClick={handleCheckbox} />} label="Transfer Of Ownership" />
                                </div>
                                <div className="col-span-4">
                                    <FormControlLabel control={<Checkbox checked={formData.HPT} name='HPT' onClick={handleCheckbox} />} label="Termination of Hypothecation" />
                                </div>
                                <div className="col-span-4">
                                    <FormControlLabel control={<Checkbox checked={formData.DRC} name='DRC' onClick={handleCheckbox} />} label="Duplicate RC" />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-4">
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
                                <div className="col-span-4">
                                    <FormControlLabel control={<Checkbox checked={formData.RRF} name='RRF' onClick={handleCheckbox} />} label="Renewal Of Registration" />
                                </div>
                                <div className="col-span-4">
                                    <FormControlLabel control={<Checkbox checked={formData.AV} name='AV' onClick={handleCheckbox} />} label="Alteration of Vehicle" />
                                </div>
                                <div className="col-span-4">
                                    <FormControlLabel control={<Checkbox checked={formData.NOC} name='NOC' onClick={handleCheckbox} />} label="Application for NOC" />
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
                                        {/* <InputLabel id="demo-simple-select-label">Dealer Code</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.dealerId}
                                            label="Dealer Code"
                                            name="dealerId"
                                            onChange={onChange}
                                        >
                                            <MenuItem value={100}>private</MenuItem>
                                            {dealerDropdownList ? dealerDropdownList.map((row) => (
                                                <MenuItem value={row.dealerId}>{row.dealerDisplayName}</MenuItem>
                                            )) : null}
                                        </Select> */}
                                        <Autocomplete
                                            onBlur={(e) => {
                                                if (e.target.value.length < 2) {
                                                    setFormDataError((perv) => ({
                                                        ...perv,
                                                        dealerId: true
                                                    }))
                                                }
                                                else {
                                                    setFormDataError((perv) => ({
                                                        ...perv,
                                                        dealerId: false
                                                    }))
                                                }
                                            }}
                                            disablePortal
                                            id="dealerDropdownList"
                                            value={dealerDropdownList ? dealerDropdownList.find(obj => obj.dealerId === formData.dealerId) : null}
                                            onChange={handleDealerChange}
                                            options={dealerDropdownList ? dealerDropdownList : []}
                                            sx={{ width: '100%' }}
                                            getOptionLabel={(options) => options.dealerDisplayName}
                                            renderInput={(params) => <TextField {...params} required error={formDataError.dealerId} label="Dealer Code" />}
                                        />
                                    </FormControl>
                                </div>
                                {formData?.dealerId == '100' &&
                                    <>
                                        <div className="col-span-4">
                                            <TextField
                                                onBlur={(e) => {
                                                    if (e.target.value.length < 2) {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            privateCustomerName: true
                                                        }))
                                                    }
                                                    else {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            privateCustomerName: false
                                                        }))
                                                    }
                                                }}
                                                onChange={onChange}
                                                value={formData.privateCustomerName}
                                                error={formDataError.privateCustomerName}
                                                helperText={formDataError.privateCustomerName ? "Please Enter Customer Name" : ''}
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
                                {(formData?.dealerId == '100' || (formData.dealerId != '100' && !formData.TO)) &&
                                    <>
                                        <div className="col-span-4">
                                            <TextField
                                                onBlur={(e) => {
                                                    if (e.target.value.length < 2) {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            clientWhatsAppNumber: true
                                                        }))
                                                    }
                                                    else {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            clientWhatsAppNumber: false
                                                        }))
                                                    }
                                                }}
                                                onChange={(e) => {
                                                    if ((regex.test(e.target.value) || e.target.value === '') && e.target.value.length < 11) {
                                                        onChange(e)
                                                    }
                                                }}
                                                value={formData.clientWhatsAppNumber}
                                                error={formDataError.clientWhatsAppNumber}
                                                helperText={formDataError.clientWhatsAppNumber ? "Please Enter WhatsApp Number" : ''}
                                                name="clientWhatsAppNumber"
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
                                        onBlur={(e) => {
                                            if (e.target.value.length < 2) {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    sellerFirstName: true
                                                }))
                                            }
                                            else {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    sellerFirstName: false
                                                }))
                                            }
                                        }}
                                        onChange={onChange}
                                        value={formData.sellerFirstName}
                                        error={formDataError.sellerFirstName}
                                        helperText={formDataError.sellerFirstName ? "Please Enter Owner Name" : ''}
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
                                        onBlur={(e) => {
                                            if (e.target.value.length < 2) {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    sellerMiddleName: true
                                                }))
                                            }
                                            else {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    sellerMiddleName: false
                                                }))
                                            }
                                        }}
                                        onChange={onChange}
                                        value={formData.sellerMiddleName}
                                        error={formDataError.sellerMiddleName}
                                        helperText={formDataError.sellerMiddleName ? "Please Enter Owner Name" : ''}
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
                                        onBlur={(e) => {
                                            if (e.target.value.length < 2) {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    sellerLastName: true
                                                }))
                                            }
                                            else {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    sellerLastName: false
                                                }))
                                            }
                                        }}
                                        onChange={onChange}
                                        value={formData.sellerLastName}
                                        error={formDataError.sellerLastName}
                                        helperText={formDataError.sellerLastName ? "Please Enter Owner Name" : ''}
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
                                <div className="col-span-4">
                                    <TextField
                                        onBlur={(e) => {
                                            if (e.target.value.length < 2) {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    sellerAddress: true
                                                }))
                                            }
                                            else {
                                                setFormDataError((perv) => ({
                                                    ...perv,
                                                    sellerAddress: false
                                                }))
                                            }
                                        }}
                                        onChange={(e) => {
                                            if (e.target.value.length < 13) {
                                                onChange(e)
                                            }
                                        }}
                                        error={formDataError.sellerAddress}
                                        helperText={formDataError.sellerAddress ? "Please Enter Only City Name" : ''}
                                        id="outlined-required"
                                        label="Town/City"
                                        value={formData.sellerAddress}
                                        name="sellerAddress"
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
                                                onBlur={(e) => {
                                                    if (e.target.value.length < 2) {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            buyerFirstName: true
                                                        }))
                                                    }
                                                    else {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            buyerFirstName: false
                                                        }))
                                                    }
                                                }}
                                                onChange={onChange}
                                                value={formData.buyerFirstName}
                                                error={formDataError.buyerFirstName}
                                                helperText={formDataError.buyerFirstName ? "Please Enter Buyer Name" : ''}
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
                                                onBlur={(e) => {
                                                    if (e.target.value.length < 2) {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            buyerMiddleName: true
                                                        }))
                                                    }
                                                    else {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            buyerMiddleName: false
                                                        }))
                                                    }
                                                }}
                                                onChange={onChange}
                                                value={formData.buyerMiddleName}
                                                error={formDataError.buyerMiddleName}
                                                helperText={formDataError.buyerMiddleName ? "Please Enter Buyer Name" : ''}
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
                                                onBlur={(e) => {
                                                    if (e.target.value.length < 2) {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            buyerLastName: true
                                                        }))
                                                    }
                                                    else {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            buyerLastName: false
                                                        }))
                                                    }
                                                }}
                                                onChange={onChange}
                                                value={formData.buyerLastName}
                                                error={formDataError.buyerLastName}
                                                helperText={formDataError.buyerLastName ? "Please Enter Buyer Name" : ''}
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
                                        <div className="col-span-4">
                                            <TextField
                                                onBlur={(e) => {
                                                    if (e.target.value.length < 2) {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            buyerAddressLine1: true
                                                        }))
                                                    }
                                                    else {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            buyerAddressLine1: false
                                                        }))
                                                    }
                                                }}
                                                onChange={(e) => {
                                                    if (e.target.value.length < 30) {
                                                        onChange(e)
                                                    }
                                                }}
                                                error={formDataError.buyerAddressLine1}
                                                helperText={formDataError.buyerAddressLine1 ? "Please Enter Buyer Address" : ''}
                                                id="outlined-required"
                                                label="House no & Street name"
                                                value={formData.buyerAddressLine1}
                                                name="buyerAddressLine1"
                                                InputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{ style: { fontSize: 14 } }}
                                                fullWidth
                                            />
                                        </div>
                                        <div className="col-span-4">
                                            <TextField
                                                onBlur={(e) => {
                                                    if (e.target.value.length < 2) {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            buyerAddressLine2: true
                                                        }))
                                                    }
                                                    else {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            buyerAddressLine2: false
                                                        }))
                                                    }
                                                }}
                                                onChange={(e) => {
                                                    if (e.target.value.length < 30) {
                                                        onChange(e)
                                                    }
                                                }}
                                                value={formData.buyerAddressLine2}
                                                error={formDataError.buyerAddressLine2}
                                                helperText={formDataError.buyerAddressLine2 ? "Please Enter Buyer Address" : ''}
                                                name="buyerAddressLine2"
                                                id="outlined-required"
                                                label="Landmark / Police station"
                                                InputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{ style: { fontSize: 14 } }}
                                                fullWidth
                                            />
                                        </div>
                                        <div className="col-span-4">
                                            <TextField
                                                onBlur={(e) => {
                                                    if (e.target.value.length < 2) {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            buyerAddressLine3: true
                                                        }))
                                                    }
                                                    else {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            buyerAddressLine3: false
                                                        }))
                                                    }
                                                }}
                                                onChange={(e) => {
                                                    if (e.target.value.length < 30) {
                                                        onChange(e)
                                                    }
                                                }}
                                                value={formData.buyerAddressLine3}
                                                error={formDataError.buyerAddressLine3}
                                                helperText={formDataError.buyerAddressLine3 ? "Please Enter Buyer Address" : ''}
                                                name="buyerAddressLine3"
                                                id="outlined-required"
                                                label="Village/Town/City"
                                                InputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{ style: { fontSize: 14 } }}
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-x-5">
                                        <div className="col-span-4">
                                            <FormControl style={{ minWidth: '100%' }}>
                                                <InputLabel required error={formDataError.buyerState} id="demo-simple-select-label">State</InputLabel>
                                                <Select
                                                    onBlur={(e) => {
                                                        if (e.target.value.length < 2) {
                                                            setFormDataError((perv) => ({
                                                                ...perv,
                                                                buyerState: true
                                                            }))
                                                        }
                                                        else {
                                                            setFormDataError((perv) => ({
                                                                ...perv,
                                                                buyerState: false
                                                            }))
                                                        }
                                                    }}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    error={formDataError.buyerState}
                                                    value={formData.buyerState}
                                                    name="buyerState"
                                                    label="State"
                                                    onChange={onChange}
                                                >
                                                    {
                                                        states ? states.map((state) => (
                                                            <MenuItem value={state.stateId}>{state.stateName}</MenuItem>
                                                        )) : <></>
                                                    }

                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col-span-4">
                                            <FormControl style={{ minWidth: '100%' }}>
                                                <InputLabel required error={formDataError.buyerCity} id="demo-simple-select-label">City</InputLabel>
                                                <Select
                                                    onBlur={(e) => {
                                                        if (e.target.value.length < 2) {
                                                            setFormDataError((perv) => ({
                                                                ...perv,
                                                                buyerCity: true
                                                            }))
                                                        }
                                                        else {
                                                            setFormDataError((perv) => ({
                                                                ...perv,
                                                                buyerCity: false
                                                            }))
                                                        }
                                                    }}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={formData.buyerCity}
                                                    error={formDataError.buyerCity}
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
                                                onBlur={(e) => {
                                                    if (e.target.value.length < 2) {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            buyerPincode: true
                                                        }))
                                                    }
                                                    else {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            buyerPincode: false
                                                        }))
                                                    }
                                                }}
                                                onChange={(e) => {
                                                    if ((regex.test(e.target.value) || e.target.value === '') && e.target.value.length < 7) {
                                                        onChange(e)
                                                    }
                                                }}
                                                value={formData.buyerPincode}
                                                error={formDataError.buyerPincode}
                                                helperText={formDataError.buyerPincode ? "Please Enter Pincode" : ''}
                                                name="buyerPincode"
                                                id="outlined-required"
                                                label="PIN Code"
                                                InputProps={{ style: { fontSize: 16 } }}
                                                InputLabelProps={{ style: { fontSize: 16 } }}
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-x-5">
                                        <div className="col-span-4">
                                            <TextField
                                                onBlur={(e) => {
                                                    if (e.target.value.length < 2) {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            clientWhatsAppNumber: true
                                                        }))
                                                    }
                                                    else {
                                                        setFormDataError((perv) => ({
                                                            ...perv,
                                                            clientWhatsAppNumber: false
                                                        }))
                                                    }
                                                }}
                                                onChange={(e) => {
                                                    if ((regex.test(e.target.value) || e.target.value === '') && e.target.value.length < 11) {
                                                        onChange(e)
                                                    }
                                                }}
                                                value={formData.clientWhatsAppNumber}
                                                error={formDataError.clientWhatsAppNumber}
                                                helperText={formDataError.clientWhatsAppNumber ? "Please Enter WhatsApp Number" : ''}
                                                name="clientWhatsAppNumber"
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
                                        {/* <InputLabel id="demo-simple-select-label">Insurance Company Name</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.insuranceCompanyNameId}
                                            label="Insurance Company Name"
                                            name="insuranceCompanyNameId"
                                            onChange={onChange}
                                        >
                                            {
                                                insuranceCompanyList?.map((insurance) => (
                                                    < MenuItem value={insurance.insuranceId} > {insurance.insuranceCompanyName}</MenuItem>
                                                ))
                                            }
                                        </Select> */}
                                        <Autocomplete
                                            disablePortal
                                            id="insuranceCompanyList"
                                            value={insuranceCompanyList ? insuranceCompanyList.find(obj => obj.insuranceId === formData.insuranceCompanyNameId) : null}
                                            onChange={handleInsuranceChange}
                                            options={insuranceCompanyList ? insuranceCompanyList : []}
                                            sx={{ width: '100%' }}
                                            getOptionLabel={(options) => options.insuranceCompanyName}
                                            renderInput={(params) => <TextField {...params} label="Insurance Company Name" />}
                                        />
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
                                            inputFormat="DD/MM/YYYY"
                                            value={formData.insuranceEndDate}
                                            minDate={formData.insuranceStartDate}
                                            onChange={handleInsuranceEndDate}
                                            name="insuranceEndDate"
                                            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                                        />
                                    </LocalizationProvider>
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
                <ToastContainer />
            </div>
        </>
    )
}

export default EditBook;