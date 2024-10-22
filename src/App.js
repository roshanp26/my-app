import './App.css';
import { useState } from "react";
import axios from 'axios';

const App = () => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY; // Update this to your environment variable
  const [newsArticles, setNewsArticles] = useState([]);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === process.env.REACT_APP_USERNAME && password === process.env.REACT_APP_PASSWORD) {
      setIsLoggedIn(true);
      fetchNews();
    } else {
      setError('Invalid credentials');
    }
  };

  const fetchNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`);
      setNewsArticles(response.data.articles);
    } catch (err) {
      setError('Failed to fetch news articles: ' + err.message);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setNewsArticles([]);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <form onSubmit={handleLogin} style={{ padding: '20px' }}>
          <h2>Login</h2>
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
      ) : (
        <div style={{ padding: '20px' }}>
          <h3>Welcome, {username}!</h3>
          <button onClick={handleLogout}>Logout</button>
          <h2>News Articles</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
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
        </div>
      )}
    </div>
  );
};

export default App;
