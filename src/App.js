import React, { useState } from 'react';
import axios from 'axios';

// Mock API function
const mockApiLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const envUsername = process.env.REACT_APP_USERNAME;
      const envPassword = process.env.REACT_APP_PASSWORD;

      if (username === envUsername && password === envPassword) {
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
  const [newsArticles, setNewsArticles] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await mockApiLogin(username, password);
      if (response.success) {
        setIsLoggedIn(true);
        fetchNews(); // Call fetchNews after successful login
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setNewsArticles([]); // Clear news articles on logout
  };

  const fetchNews = async () => {
    try {
      const apiKey = process.env.REACT_APP_NEWS_API_KEY; // Ensure this is set in your .env
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
      setNewsArticles(response.data.articles);
    } catch (err) {
      setError('Failed to fetch news articles: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{isLoggedIn ? 'Welcome!' : 'Login'}</h2>
      {isLoggedIn ? (
        <>
          <h3>Welcome, {username}!</h3>
          <button onClick={handleLogout}>Logout</button>
          <h2>News Articles</h2>
          {newsArticles.length > 0 ? (
            <ul>
              {newsArticles.map((article, index) => (
                <li key={index}>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading news articles...</p>
          )}
        </>
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
