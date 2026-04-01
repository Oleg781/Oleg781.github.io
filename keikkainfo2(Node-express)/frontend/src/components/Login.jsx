import React, { useState } from "react";
import axios from 'axios';
import './Login.css'

function Login() {
    const [username, setUsername] = useState('');   // ctrl + backspace ottaa pois vasemmalta | ctrl + delete ottaa pois oikealta
    const [password, setPassword] = useState('');   // backspace ottaa pois vasemmalta | delete ottaa pois oikealta
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/auth/login', {username, password});
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
        } catch (err) {
            setError('Wrong username or password');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="login-form">
            <h3>Kirjautuminen</h3>
                <input 
                    type="text"
                    placeholder="Käyttäjänimi"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Salasana"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Kirjaudu</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Login;