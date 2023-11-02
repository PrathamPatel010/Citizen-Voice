/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import Header from './Header';
import axios from 'axios';

const Login = () => {
    const base_url = import.meta.env.VITE_BACKEND_URL;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [acknowledgment, setAcknowledgment] = useState('');
    const [userInfo, setUserInfo] = useState([]);

    // method for handling login event
    const handleLogin = async (e) => {
        e.preventDefault();
        const dataToBeSend = { username, password };
        const response = await axios.post(`${base_url}/api/login`, dataToBeSend, { withCredentials: true });
        setUserInfo({ username, password });
        setAcknowledgment(response.data.message);
    }

    return (
        <section className="login-page">
            <Header />
            <section>
                <div className="d-flex justify-content-center">
                    <h2>Login</h2>
                </div>
                <form onSubmit={handleLogin} className="form-login" method="post">
                    <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" placeholder="Username" />
                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="text" placeholder="Password" />
                    <button type="submit" className="btn btn-success mt-3">Login</button>
                </form>
                <div className="text-center my-3">
                    <h5>{acknowledgment}</h5>
                </div>
                <div className="col-12 text-center mt-4">
                    <h5>Don't have account yet?</h5>
                    <h6><a href="/register">Click here to Register</a></h6>
                </div>
            </section>
        </section>
    );
}

export default Login;