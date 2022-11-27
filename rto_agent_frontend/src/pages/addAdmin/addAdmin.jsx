import "./addAdmin.css"
import React from "react";
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';


function AddAdminPage(){

    const [value, setValue] = React.useState(dayjs(new Date()));
    const [city, setCity] = React.useState('');

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
    return(
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
                                        id="outlined-required"
                                        label="Name"
                                        defaultValue=""
                                        InputProps={{style:{ fontSize: 20 } }}
                                        InputLabelProps={{style: {fontSize: 20}}}
                                        fullWidth
                                    />
                                </div>
                                <div className="col-span-5">
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Surname"
                                        defaultValue=""
                                        InputProps={{style:{ fontSize: 20 } }}
                                        InputLabelProps={{style: {fontSize: 20}}}
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
                                        id="outlined-required"
                                        label="Middle Name"
                                        defaultValue=""
                                        InputProps={{style:{ fontSize: 20 } }}
                                        InputLabelProps={{style: {fontSize: 20}}}
                                        fullWidth
                                    />
                                </div>
                                
                                <div className="col-span-5">
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Mobile Number"
                                        defaultValue=""
                                        InputProps={{style:{ fontSize: 20 } }}
                                        InputLabelProps={{style: {fontSize: 20}}}
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
                                        id="outlined-required"
                                        label="Email"
                                        defaultValue=""
                                        InputProps={{style:{ fontSize: 20 } }}
                                        InputLabelProps={{style: {fontSize: 20}}}
                                        fullWidth
                                    />
                                </div>
                                <div className="col-span-3">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        textFieldStyle={{width: '100%'}}
                                        InputProps={{style:{ fontSize: 20,width:'100%'} }}
                                        InputLabelProps={{style: {fontSize: 20}}}
                                        label="Date Of Birth"
                                        required
                                        inputFormat="MM/DD/YYYY"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} sx={{width: '100%'}}/>}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="col-span-3">
                                    <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    </RadioGroup>
                                    </FormControl>
                                </div>
                               
                            </div>
                            {/* <div className="grid grid-cols-12">
                                <div className="col-span-1">

                                </div>
                                <div className="col-span-2">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        textFieldStyle={{width: '100%'}}
                                        InputProps={{style:{ fontSize: 20,width:'100%'} }}
                                        InputLabelProps={{style: {fontSize: 20}}}
                                        label="Date Of Birth"
                                        required
                                        inputFormat="MM/DD/YYYY"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} sx={{width: '100%'}}/>}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div> */}
                            <div className="grid grid-cols-12">
                                <div className="col-span-1">

                                </div>
                                <div className="col-span-10">
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Address Line 1"
                                        defaultValue=""
                                        InputProps={{style:{ fontSize: 20 } }}
                                        InputLabelProps={{style: {fontSize: 20}}}
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
                                        id="outlined-required"
                                        label="Address Line 1"
                                        defaultValue=""
                                        InputProps={{style:{ fontSize: 20 } }}
                                        InputLabelProps={{style: {fontSize: 20}}}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-1">

                                </div>
                                <div className="col-span-3">
                                    <FormControl style={{minWidth: '100%'}}>
                                        <InputLabel id="demo-simple-select-label">City</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={city}
                                        label="City"
                                        input={<OutlinedInput sx={{fontSize: '20px'}} label="Tag" />}
                                        onChange={handleCityChange}
                                        >
                                        <MenuItem value={10}>Rajkot</MenuItem>
                                        <MenuItem value={20}>Jamnagar</MenuItem>
                                        <MenuItem value={30}>Morbi</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-span-3">
                                    <FormControl style={{minWidth: '100%'}}>
                                        <InputLabel id="demo-simple-select-label">City</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={city}
                                        label="City"
                                        input={<OutlinedInput sx={{fontSize: '20px'}} label="Tag" />}
                                        onChange={handleCityChange}
                                        >
                                        <MenuItem value={10}>Rajkot</MenuItem>
                                        <MenuItem value={20}>Jamnagar</MenuItem>
                                        <MenuItem value={30}>Morbi</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-span-4">
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="PIN Code"
                                        defaultValue=""
                                        InputProps={{style:{ fontSize: 20 } }}
                                        InputLabelProps={{style: {fontSize: 20}}}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-x-5">
                                <div className="col-span-4 col-start-5">
                                    <button className="addAgent_button">
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