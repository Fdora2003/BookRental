import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    
    if (username === '' || password === '') {
      setError('Kérjük, töltse ki az összes mezőt!');
      return;
    }

    setIsLoading(true); 

    try {
      
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), 
      });

      const data = await response.json();

      if (response.ok) {
        
        alert('Sikeres bejelentkezés!');
        console.log('Token:', data.token); 
        setError('');
        
        localStorage.setItem('authToken', data.token);
      } else {
        
        setError(data.message || 'Valami hiba történt.');
      }
    } catch (error) {
      
      setError('Hálózati hiba történt.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="login-container">
      <h2>Bejelentkezés</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label htmlFor="username">Felhasználónév:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Írd be a felhasználóneved"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Jelszó:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Írd be a jelszavad"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Bejelentkezés...' : 'Bejelentkezés'}
        </button>
      </form>
    </div>
  );
}

export default Login;
