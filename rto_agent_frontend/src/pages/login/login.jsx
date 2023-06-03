import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './login.css';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { login } from '../../action/userAction';
import CryptoJS from 'crypto-js';
import rtoLogo from '../../rto_logo.png';
import Alert from '@mui/material/Alert';


import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from "@mui/material/FormControl";

const decryptData = (text) => {
    const key = process.env.REACT_APP_AES_KEY;
    const bytes = CryptoJS.AES.decrypt(text, key);
    const data = bytes.toString(CryptoJS.enc.Utf8) ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : 0;
    return (data);
};

function LoginPage() {
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // const { loading, success, error } = useSelector((state) => state.userLogin.state);
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'))
        const role = user && user.isAdminrights ? decryptData(user.isAdminrights) : '';
        // const role = '1'
        if (userInfo && role == '1') {
            navigate('/list');
        }
        else if (userInfo && role == '0') {
            navigate('/dashboard');
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };


    return (
        <div>
            <div className="grid grid-cols-12">
                <div className="col-span-6">
                    <img src={rtoLogo} />
                </div>
                <div className="col-span-6">
                    <div className="grid grid-cols-12">
                        <div className="col-span-8 col-start-2">
                            <div className="loginCard">
                                <div className="loginHeader flex items-center ">
                                    <div className="grid justify-items-center w-full">
                                        <div className="header_text">
                                            Log In
                                        </div>
                                    </div>
                                </div>
                                <div className='textFieldWrapper'>
                                    <form onSubmit={submitHandler}>
                                        {error &&
                                            <div className='textField err'>
                                                <Alert severity="error">{error}</Alert>
                                            </div>
                                        }
                                        <div className='textField'>
                                            <TextField
                                                required
                                                onChange={(e) => setEmail(e.target.value)}
                                                // onChange={onChange}
                                                // value={formData.agentFirstName}
                                                name="agentFirstName"
                                                id="outlined-required"
                                                label="User Name"
                                                InputProps={{ style: { fontSize: 18 } }}
                                                InputLabelProps={{ style: { fontSize: 18 } }}
                                                fullWidth
                                            />
                                        </div>
                                        <div className='textField'>
                                            {/* <TextField
                                                required
                                                type="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                // onChange={onChange}
                                                // value={formData.agentFirstName}
                                                name="agentFirstName"
                                                id="outlined-required"
                                                label="Password"
                                                InputProps={{ style: { fontSize: 18 } }}
                                                InputLabelProps={{ style: { fontSize: 18 } }}
                                                fullWidth
                                            /> */}
                                            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                                                <InputLabel htmlFor="outlined-adornment-password">
                                                    Password
                                                </InputLabel>
                                                <OutlinedInput
                                                    name="agentFirstName"
                                                    label="Password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    InputProps={{ style: { fontSize: 18 } }}
                                                    InputLabelProps={{ style: { fontSize: 18 } }}
                                                    fullWidth
                                                    id="outlined-adornment-password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </div>
                                        <div className="buttonWrapper flex justify-around">
                                            <button className="loginBtn" type="submit">
                                                Login In
                                            </button>
                                            {/* {error && <span>{error}</span>} */}
                                        </div>
                                    </form>
                                    <div className='forgetPwd'>
                                        Forget Password ? <button className='forgetPwdBtn'>reset it ..!</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LoginPage;