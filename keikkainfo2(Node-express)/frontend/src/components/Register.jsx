import React, { useState } from 'react';
import axios from 'axios';
import '../components/Register.css'

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ username, email, password }); 

    try {
      await axios.post('http://localhost:3001/auth/register', { username, email, password });
      window.location.href = '/login'; // Siirrytään kirjautumissivulle
    } catch (err) {
      setError('Virhe rekisteröinnissä');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='register-form'>
      <h3>Rekisteröityminen</h3>
        <input
          type="text"
          placeholder="Käyttäjänimi"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Sähköposti"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Salasana"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Rekisteröidy</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;
