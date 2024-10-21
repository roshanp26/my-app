import React, { useState } from 'react';

// Mock API function
const mockApiLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    // Simulating an API call
    setTimeout(() => {
      if (username === 'user' && password === 'password') {
        resolve({ success: true, token: 'mock_token' });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await mockApiLogin(username, password);
      if (response.success) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      {isLoggedIn ? (
        <h3>Welcome, {username}!</h3>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default App;
