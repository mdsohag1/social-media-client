import React, { useState } from 'react';
import './Auth.css';
import Logo from '../../img/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { login, signUp } from '../../actions/AuthAction.js';


const Auth = () => {
    const loading = useSelector((state) => state.authReducer.loading)
    const [newUser, setNewUser] = useState(true);
    const dispatch = useDispatch();
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmpass: ""
    })
    const [confirmPass, setConfirmPass] = useState(true);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (newUser) {
            data.password === data.confirmpass ? dispatch(signUp(data)) : setConfirmPass(false)
        }
        else {
            dispatch(login(data))
        }
    }
    const resetForm = () => {
        setConfirmPass(true)
        setData({
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmpass: ""
        })
    }

    return (
        <div className='auth'>
            {/* left side */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="webName">
                    <h1>AS Media</h1>
                    <h6>Explore the Ideas throughtout the world</h6>
                </div>
            </div>
            {/* right side */}
            <div className="a-right">
                <form className="infoForm auth-form" onSubmit={handleSubmit}>
                    <h4 style={{ marginTop: "10px" }}>{newUser ? "Sign Up" : "Login"}</h4>
                    {newUser && <div>
                        <input
                            type="text"
                            className="infoInput"
                            placeholder='First Name'
                            name='firstname'
                            onChange={handleChange}
                            value={data.firstname}
                        />
                        <input
                            type="text"
                            className="infoInput"
                            placeholder='Last Name'
                            name='lastname'
                            onChange={handleChange}
                            value={data.lastname}
                        />
                    </div>}
                    <div>
                        <input
                            type="text"
                            className="infoInput"
                            placeholder='UserName'
                            name='username'
                            onChange={handleChange}
                            value={data.username}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            id=""
                            placeholder='Password'
                            className='infoInput'
                            onChange={handleChange}
                            value={data.password}
                        />
                        {newUser && <input
                            type="password"
                            name="confirmpass"
                            id=""
                            placeholder='Confirm Password'
                            className='infoInput'
                            onChange={handleChange}
                            value={data.confirmpass}
                        />}
                    </div>
                    <span style={{ display: confirmPass ? "none" : "block", color: "red", fontSize: "12px", alignSelf: "flex-end", marginRight: "5px" }}>*confirm password is not same</span>
                    <div>
                        <spam onClick={() => {
                            setNewUser(!newUser)
                            resetForm()
                        }} style={{ fontSize: "14px", cursor: "pointer", color: "red)" }}>{newUser ? "Already have an account! Login" : "Dont have An account! Sign Up"}</spam>
                    </div>
                    <button className="button infoButton" type='submit' disabled={loading}>{loading ? "Loading..." : newUser ? "Sign Up" : "Login"}</button>
                </form>
            </div>
        </div>
    );
};


export default Auth;