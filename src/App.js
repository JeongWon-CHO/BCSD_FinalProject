import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

// 가수 검색 페이지 컴포넌트
import ArtistSearchPage from './components/ArtistSearchPage';

// 앨범 상세 페이지 컴포넌트
import AlbumDetailPage from './components/AlbumDetailPage';

// 스포티파이 메인 화면
import Spotify from './components/Spotify';

import SpotifyKeywordPage from './components/SpotifyKeywordPage';


function ArtistSearchButton() {
  return (
    <div>
        <br></br>
        <div className='mainLoge'>
          <br></br>
          <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png' className='centerImage'/>
          <br></br><br></br><br></br>
        </div>


        <div className='artistSearchWrapper'>
          <div className='artistSearch'>
            <Link to="/artist-search">가수 검색</Link>
          </div>
        </div>
      
      <br></br>
      <br></br>

        <div className='spotifySearchWrapper'>
          <div className='spotifySearch'>
            <Link to="/spotify-main">스포티파이</Link>
          </div>
        </div>

      <br></br>
      <br></br>

        <div className='spotifyKeywordWrapper'>
          <div className='spotifyKeyword'>
            <Link to="/spotify-keyword">키워드 검색</Link>
          </div>
        </div>

        <div className="extraSpace"></div>

        <div className='footer'>
          @2023-2 BCSD FrontEnd Beginner Final Project
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

        {/* 키워드 검색 컴포넌트와 연결된 라우트 */}
        <Route path="/spotify-keyword" element={<SpotifyKeywordPage />} />
      </Routes>
    </Router>
    
  );
}


export default App;