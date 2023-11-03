/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import OTPComponent from './OTPComponent';

const Register = () => {
    const base_url = import.meta.env.VITE_BACKEND_URL;
    const [username, setUsername] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [acknowledgment, setAcknowledgment] = useState('');
    const [showOTPForm, setShowOTPForm] = useState(false);
    const [otpcode, setOtpCode] = useState(0);
    const [userInfo, setUserInfo] = useState([]);

    // method for handling registration event
    const handleRegister = async (e) => {
        e.preventDefault();
        if (mobileNo.length !== 10) {
            setAcknowledgment('Enter correct mobile number!!');
            return;
        }
        if (role == '') {
            setAcknowledgment('Select role to proceed further!!');
            return;
        }
        setAcknowledgment('');
        const dataToBeSend = { username, mobileNo, role, password };
        const response = await axios.post(`${base_url}/api/register`, dataToBeSend, { withCredentials: true });
        if (response.data.status !== 200) {
            setAcknowledgment(response.data.message);
            return;
        }
        setUserInfo({ username, mobileNo, role, password });
        setAcknowledgment(response.data.message);
        setOtpCode(response.data.code);
        setShowOTPForm(true);
    }

    return (
        <section className="registration-page">
            <Header />
            <section>
                <div className="d-flex justify-content-center mt-3">
                    <h2>Registration</h2>
                </div>
                <form onSubmit={handleRegister} className="reg-form" method="post">
                    <input className="form-control" value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" placeholder="Username" required />
                    <input className="form-control" value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} type="number" placeholder="Mobile No" required />
                    <select className="form-control" value={role} onChange={(e) => { setRole(e.target.value) }} >
                        <option value="">You are a</option>
                        <option value='Citizen' onChange={(e) => { setRole(e.target.value) }}>Citizen</option>
                        <option value='Police Officer' onChange={(e) => { setRole(e.target.value) }}>Police Officer</option>
                    </select>
                    <input className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" required />
                    <button type="submit" className="btn btn-success mt-3">Register</button>
                </form>
                <div className="text-center my-3">
                    <h5>{acknowledgment}</h5>
                </div>
                {
                    showOTPForm ? <OTPComponent code={otpcode} userInfo={userInfo} /> : <></>
                }
                <div className="col-12 text-center mt-4">
                    <h5>Already a user?</h5>
                    <h6><a href="/">Click here to login</a></h6>
                </div>
            </section>
        </section >
    );
}

export default Register;