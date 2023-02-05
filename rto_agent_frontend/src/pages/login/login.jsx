import './login.css';
import TextField from '@mui/material/TextField';

function LoginPage() {
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
                                    <div className='textField'>
                                        <TextField
                                            required
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
                                        <button className="loginBtn">
                                            Login In
                                        </button>
                                    </div>
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