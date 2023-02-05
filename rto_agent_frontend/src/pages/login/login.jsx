import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './login.css';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { login } from '../../action/userAction'

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate('/list')
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
                                            <TextField
                                                required
                                                onChange={(e) => setPassword(e.target.value)}
                                                // onChange={onChange}
                                                // value={formData.agentFirstName}
                                                name="agentFirstName"
                                                id="outlined-required"
                                                label="Password"
                                                InputProps={{ style: { fontSize: 18 } }}
                                                InputLabelProps={{ style: { fontSize: 18 } }}
                                                fullWidth
                                            />
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