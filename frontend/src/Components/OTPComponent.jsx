/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';

const OTPComponent = ({ code, userInfo }) => {
    const base_url = import.meta.env.VITE_BACKEND_URL;
    const [otp, setOtp] = useState('');
    const [ack, setAck] = useState('');

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        if (parseInt(otp) === parseInt(code)) {
            setAck('Success!!');
            const response = await axios.post(`${base_url}/api/createUser`, userInfo, { withCredentials: true });
            console.log(response.data);
            window.location.href = "/login";
        } else {
            setAck('Wrong OTP!!');
        }
    }

    return (
        <section className="d-flex flex-column align-items-center text-center">
            <form method="post" onSubmit={handleOTPSubmit}>
                <small>OTP is {code}</small>
                <h6>Enter OTP:</h6>
                <input type="number" value={otp} onChange={(e) => { setOtp(e.target.value) }} /><br />
                <button className="btn btn-primary mt-3" type="submit">Submit</button>
            </form>
            <h5 className="mt-2">{ack}</h5>
        </section>
    )
}

export default OTPComponent;