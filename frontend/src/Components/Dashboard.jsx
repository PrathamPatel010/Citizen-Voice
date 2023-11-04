import Feedbacks from "./Feedbacks";
import { useEffect, useState } from "react";
import axios from 'axios';
import QRContainerClass from "./QRContainer";
const Dashboard = () => {
    const base_url = import.meta.env.VITE_BACKEND_URL;
    const [role, SetRole] = useState('');

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
        SetRole(response.data.role);
    }
    return (
        <>
            {
                (role === 'Citizen') ? <QRContainerClass /> : <Feedbacks />
            }
        </>
    )
}

export default Dashboard;