/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import Header from './Header';
import axios from 'axios';

const Register = () => {
    const base_url = import.meta.env.VITE_BACKEND_URL;
    const [username, setUsername] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [acknowledgment, setAcknowledgment] = useState('');
    // method for handling registration event
    const handleRegister = async (e) => {
        e.preventDefault();
        const dataToBeSend = { username, mobileNo, role, password };
        const response = await axios.post(`${base_url}/api/register`, dataToBeSend, { withCredentials: true });
        console.log(response.data);
    }

    return (
        <section className="registration-page">
            <Header />
            <section className="reg-form-sec">
                <div className="d-flex justify-content-center">
                    <h2>Registration Form</h2>
                </div>
                <form onSubmit={handleRegister} className="reg-form" method="post">
                    <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" placeholder="Username" />
                    <input value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} type="number" placeholder="Mobile No" />
                    <select value={role} onChange={(e) => { setRole(e.target.value) }}>
                        <option value="">You are registering as</option>
                        <option value='Citizen' onChange={(e) => { setRole(e.target.value) }}>Citizen</option>
                        <option value='Police Officer' onChange={(e) => { setRole(e.target.value) }}>Police Officer</option>
                    </select>
                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="text" placeholder="Password" />
                    <button type="submit" className="btn btn-success mt-3">Register</button>
                </form>
                <div className="text-center my-3">
                    <h5>{acknowledgment}</h5>
                </div>
                <div className="col-12 text-center mt-4">
                    <h5>Already a user?</h5>
                    <h6><a href="/">Click here to login</a></h6>
                </div>
            </section>
        </section>
    );
}

export default Register;