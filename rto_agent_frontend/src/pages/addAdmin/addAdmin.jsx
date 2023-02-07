import "./addAdmin.css"
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
import axios from 'axios';


function AddAdminPage() {

    const [formData, setFormData] = useState(
        {
            agentFirstName: '',
            agentMiddleName: '',
            agentLastName: '',
            agentGender: '',
            agentBirthDate: '2022-11-09',
            agentAddressLine1: '',
            agentAddressLine2: '',
            agentCity: '',
            agentState: '',
            agentPincode: '',
            agentMobileNumber: '',
            agentEmailId: ''
        }
    )

    const handleChange = (date) => {
        setFormData((prevState) => ({
            ...prevState,
            ["agentBirthDate"]: new Date(date).toISOString().slice(0, 10),
        }))
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const submit = async () => {
        console.log('>>>>>>>>>>', formData)
        const res = await axios.post('http://192.168.0.104:8000/agentrouter/addAgentDetails', formData);
        if (res) {
            console.log(">>", res)
            alert("Data inserted successfully")
            setFormData({
                agentFirstName: '',
                agentMiddleName: '',
                agentLastName: '',
                agentGender: '',
                agentBirthDate: '2022-11-09',
                agentAddressLine1: '',
                agentAddressLine2: '',
                agentCity: '',
                agentState: '',
                agentPincode: '',
                agentMobileNumber: '',
                agentEmailId: ''
            })
        }
    }

    return (
        <>
            <div className="addAdmin_wrapper flex items-center">
                <div className="grid justify-items-center addAdmin_inner_wrapper">

                    <div className="admin_container">
                        <div className="header flex items-center ">
                            <div className="grid justify-items-center w-full">
                                <div className="header_text">
                                    Add Agent
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
                                        value={formData.agentFirstName}
                                        name="agentFirstName"
                                        id="outlined-required"
                                        label="Name"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>
                                <div className="col-span-5">
                                    <TextField
                                        required
                                        onChange={onChange}
                                        value={formData.agentLastName}
                                        name="agentLastName"
                                        id="outlined-required"
                                        label="Surname"
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
                                        value={formData.agentMiddleName}
                                        name="agentMiddleName"
                                        id="outlined-required"
                                        label="Middle Name"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>

                                <div className="col-span-5">
                                    <TextField
                                        required
                                        onChange={onChange}
                                        value={formData.agentMobileNumber}
                                        name="agentMobileNumber"
                                        id="outlined-required"
                                        label="Mobile Number"
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
                                        value={formData.agentEmailId}
                                        name="agentEmailId"
                                        id="outlined-required"
                                        label="Email"
                                        InputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        fullWidth
                                    />
                                </div>
                                <div className="col-span-3">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            textFieldStyle={{ width: '100%' }}
                                            InputProps={{ style: { fontSize: 14, width: '100%' } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                            label="Date Of Birth"
                                            required
                                            inputFormat="YYYY/MM/DD"
                                            value={new Date(formData.agentBirthDate)}
                                            onChange={handleChange}
                                            name="agentBirthDate"
                                            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="col-span-3">
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            onChange={onChange}
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            value={formData.agentGender}
                                            name="agentGender"
                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        </RadioGroup>
                                    </FormControl>
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
                                        value={formData.agentAddressLine1}
                                        name="agentAddressLine1"
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
                                        value={formData.agentAddressLine2}
                                        name="agentAddressLine2"
                                        id="outlined-required"
                                        label="Address Line 1"
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
                                        <InputLabel id="demo-simple-select-label">City</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.agentState}
                                            name="agentState"
                                            label="State"
                                            input={<OutlinedInput sx={{ fontSize: '20px' }} label="Tag" />}
                                            onChange={onChange}
                                        >
                                            <MenuItem value={"Gujarat"}>Gujarat</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-span-3">
                                    <FormControl style={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-label">City</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.agentCity}
                                            name="agentCity"
                                            label="City"
                                            input={<OutlinedInput sx={{ fontSize: '20px' }} label="Tag" />}
                                            onChange={onChange}
                                        >
                                            <MenuItem value={"Rajkot"}>Rajkot</MenuItem>
                                            <MenuItem value={"Jamnagar"}>Jamnagar</MenuItem>
                                            <MenuItem value={"Morrbi"}>Morbi</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-span-4">
                                    <TextField
                                        required
                                        value={formData.agentPincode}
                                        name="agentPincode"
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
                                <div className="col-span-4 col-start-5">
                                    <button className="addAgent_button" onClick={submit}>
                                        Add Agent
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddAdminPage;