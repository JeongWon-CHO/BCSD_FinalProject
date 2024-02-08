import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

// 가수 검색 페이지 컴포넌트
import ArtistSearchPage from './components/ArtistSearchPage';

// 앨범 상세 페이지 컴포넌트
import AlbumDetailPage from './components/AlbumDetailPage';

// 스포티파이 메인 화면
import Spotify from './components/Spotify';


function ArtistSearchButton() {
  return (
    <div>

        <div className='mainLoge'>
          <br></br>
          <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png' />
          <br></br><br></br><br></br>
        </div>


      <div className='artistSearch'>
        {/* 가수 검색 페이지로 이동할 링크 */}
        <Link to="/artist-search">가수 검색</Link>
      </div>
      
      <br></br>

      <div className='spotifySearch'>
        {/* 가수 검색 페이지로 이동할 링크 */}
        <Link to="/spotify-main">스포티파이</Link>
      </div>
      

    </div>
  );
}

function App() {

  return (

    <Router>
      <Routes>
        {/* ArtistSearchPage 컴포넌트와 연결된 라우트 */}
        <Route path="/artist-search" element={<ArtistSearchPage />} />

        {/* AlbumDetailPage 컴포넌트와 연결된 라우트 */}
        <Route path="/album-detail/:albumId" element={<AlbumDetailPage />} /> {/* AlbumDetailPage 라우트 추가 */}

        {/* 가수 검색 버튼이 있는 페이지도 라우트로 처리 */}
        <Route path="/" element={<ArtistSearchButton />} />

        {/* Spotify 컴포넌트와 연결된 라우트 */}
        <Route path="/spotify-main" element={<Spotify />} />
      </Routes>
    </Router>
    
  );
}


export default App;