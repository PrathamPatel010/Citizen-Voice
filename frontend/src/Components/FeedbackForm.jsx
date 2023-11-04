/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from 'axios';
import QRContainerClass from "./QRContainer";

const FeedbackForm = ({ result }) => {
    const base_url = import.meta.env.VITE_BACKEND_URL;
    const [username, SetUsername] = useState('');
    const [district, setDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [review, setReview] = useState('');
    const [ack, setAck] = useState('');

    useEffect(() => {
        checkAuth();
    }, []);

    // method for checking Auth
    const checkAuth = async () => {
        const response = await axios.get(`${base_url}/api/checkAuth`, { withCredentials: true });
        if (response.data.status !== 200) {
            window.location.href = "/";
            return;
        }
        console.log(response.data);
        SetUsername(response.data.username);
    }

    // method for logout
    const logout = async () => {
        const response = await axios.get(`${base_url}/api/logout`, { withCredentials: true });
        console.log(response.data);
        checkAuth();
    }

    // method for handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToBeSend = { district, address, review };
        const response = await axios.post(`${base_url}/api/addReview`, dataToBeSend, { withCredentials: true });
        if (response.data.status !== 200) {
            setAck(response.data.message);
            return;
        }
        setAck('Success!!');
        window.location.href = "/success";
    }

    useEffect(() => {
        if (result) {
            // When 'result' changes, update the 'address' state
            setAddress(result.text || ''); // Assuming 'text' property holds the address
        }
    }, [result]);

    return (
        <section className="dashboard-sec pt-4">
            <div className="d-flex justify-content-center gap-3">
                <h3>Logged in as {username}</h3>
                <button onClick={logout} className="btn btn-danger" type="button">Logout</button>
            </div>
            <article>
                <span className="text-center">
                    <h3>Fill this feedback form</h3>
                </span>
                <form onSubmit={handleSubmit} method="post" className="feedback-form">
                    <select value={district} onChange={(e) => { setDistrict(e.target.value) }}>
                        <option value=""></option>
                        <option value="Anand">Anand</option>
                        <option value="Baroda">Baroda</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Surat">Surat</option>
                        <option value="Nadiad">Nadiad</option>
                    </select>
                    <input
                        value={address}
                        onChange={(e) => {
                            if (!result) {  // Check if 'result' is not set
                                setAddress(e.target.value);  // Allow input only if 'result' is not set
                            }
                        }}
                        type="text"
                        placeholder="Full address of police station"
                        disabled={!!result} // Disable the input field if 'result' is set
                    />
                    <textarea
                        value={review}
                        onChange={(e) => { setReview(e.target.value) }}
                        placeholder="Write your review"
                    ></textarea>
                    <button type="submit" className="btn btn-success">Submit</button>
                    <h5>{ack}</h5>
                </form>
            </article>
        </section>
    )
}

export default FeedbackForm;
