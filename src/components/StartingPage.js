import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectButton from './SelectButton';
import ArtistSearchPage from './ArtistSearchPage';
import AlbumDetailPage from './AlbumDetailPage';
import MusicSearchPage from './MusicSearchPage';
import SpotifyKeywordPage from './SpotifyKeywordPage';
import MyPage from './MyPage';

function StartingPage() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SelectButton />} />
                <Route path="/artist-search" element={<ArtistSearchPage />} />
                <Route path="/album-detail/:albumId" element={<AlbumDetailPage />} />
                <Route path="/spotify-main" element={<MusicSearchPage />} />
                <Route path="/spotify-keyword" element={<SpotifyKeywordPage />} />
                <Route path="/spotify-myPage" element={<MyPage />} />
            </Routes>
        </Router>
    );
}

export default StartingPage;