import { useEffect, useState } from 'react';
import axios from 'axios';
import FeedbackCard from './FeedbackCard';

const Feedbacks = () => {
    const base_url = import.meta.env.VITE_BACKEND_URL;
    const [username, SetUsername] = useState('');
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        checkAuth();
        fetchFeedbacks();
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

    // method to fetch feedbacks
    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get(`${base_url}/api/feedbacks`, { withCredentials: true });
            if (response.data.status === 200) {
                setFeedbacks(response.data.feedbacks);
            } else {
                console.error('Failed to fetch feedbacks');
            }
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    }

    // method for logout
    const logout = async () => {
        const response = await axios.get(`${base_url}/api/logout`, { withCredentials: true });
        console.log(response.data);
        checkAuth();
    }


    return (
        <section className="feedbacks-sec pt-4">
            <div className="d-flex justify-content-center gap-3">
                <h3>Logged in as {username}</h3>
                <button onClick={logout} className="btn btn-danger" type="button">Logout</button>
            </div>

            <div className="feedback-list">
                <span className="text-center">
                    <h4>Feedbacks</h4>
                </span>
                <ul>
                    {feedbacks.map((feedback) => (
                        <FeedbackCard key={feedback._id} feedback={feedback} />
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Feedbacks;