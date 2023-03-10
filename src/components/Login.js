import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        
        const json = await response.json()
        console.log(json);

        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in Succesfully", "success")
            history("/");
        }
        else {
            props.showAlert("Invalid credentials", "danger")

        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h3 className='text-center mt-3'>Login to Continue to iNotebook</h3>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} value={credentials.password} name="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
