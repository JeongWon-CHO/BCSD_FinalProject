import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartingPage from './components/StartingPage';
import './App.css';
import './css/MusicSearchPage.css'
import './css/MyPage.css'
import './css/RecommendPage.css'

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleSubmit(e) {

      e.preventDefault();

      if (username === 'a' && password === '1234') {
          localStorage.setItem('userName', username);
          setIsLoggedIn(true);
      } else {
          alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
  }

  return isLoggedIn ? <StartingPage /> : (
      <form className="login-form" onSubmit={handleSubmit}>

          <div className='login'>
            <h1>Login</h1>
          </div>

          <div className='input-center'>
            <div className='input-container'>
                <input
                  className='idBtn'
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
          </div>
            
            <div className='input-center'>
              <div className='input-container'>
                <input
                className='pwBtn'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
              </div>
            </div>
            
            <div className='input-center'>
              <div>
                <button className='loginBtn' type="submit">Login</button>
              </div> 
            </div>

          
      </form>
  );
}

export default App;