import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import spotifyGreenLogo from '../images/Spotify_Logo_RGB_Green.png';
import emptyHeartImage from '../images/emptyHartImg.png';
import fillHeartImage from '../images/FillHartImg.png';
import useStore from './useStore'; // Zustand 스토어 임포트

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export default function MusicSearchPage() {
    const [token, setToken] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    // 트랙 즐겨찾기 상태와 액션 가져오기
    const favoriteTracks = useStore((state) => state.favoriteTracks);
    const addFavoriteTrack = useStore((state) => state.addFavoriteTrack);
    const removeFavoriteTrack = useStore((state) => state.removeFavoriteTrack);

    useEffect(() => {
        const getToken = async () => {
            const result = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded', 
                    'Authorization' : 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
                },
                body: 'grant_type=client_credentials'
            });
            const data = await result.json();
            setToken(data.access_token);
        };
        getToken();
    }, []);

    const searchTracks = async () => {
        if (!searchQuery || !token) return;
    
        const result = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token }
        });
        const data = await result.json();
        setSearchResults(data.tracks.items.map(item => ({
            ...item,
            isFavorite: favoriteTracks.some(track => track.id === item.id)
        })));
    };
    
    const toggleFavorite = (track) => {
        const isFavorite = favoriteTracks.some(favTrack => favTrack.id === track.id);
        if (isFavorite) {
            removeFavoriteTrack(track.id);
        } else {
            addFavoriteTrack(track);
        }
    };


    // 확인용 useEffect. 지워도 됨.
    useEffect(() => {
        console.log('Current favorite tracks:', favoriteTracks);
    }, [favoriteTracks]);
    
    const handleSearch = () => {
        searchTracks();
    };



    useEffect(() => {
        // searchResults 내의 각 트랙에 대해 즐겨찾기 상태를 업데이트
        const updatedSearchResults = searchResults.map(track => ({
            ...track,
            isFavorite: favoriteTracks.some(favTrack => favTrack.id === track.id)
        }));
        setSearchResults(updatedSearchResults);
    }, [favoriteTracks]); // favoriteTracks 변경 시 useEffect 트리거


    const handleImageClick = () => {
        // 이미지를 클릭하여 다른 페이지로 이동
        navigate('/');
    };


    return (
        <div>

            <div className='mainLoge2'>
                <img src={spotifyGreenLogo} className='centerImageLogo' onClick={handleImageClick} />
            </div>

            <div className='musicSearch-center'>
                <h1 className='musicSearch'>Music Search</h1>
            </div>

            <div className='inputBtn-center'>
                <input 
                    className='inputBtn-music' 
                    type="text"
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearch}
                    placeholder="Search for Music"
                />
                <button className='searchBtn' onClick={handleSearch}>🔍︎</button>
            </div>
            
            <div className='emptySpace-music'>

            </div>


            <ul>
                {searchResults.map(track => (
                    <li className='musicList-music' key={track.id}>
                        <span>{track.name} - {track.artists.map(artist => artist.name).join(', ')}</span>
                        <button className='favorMusic-music' onClick={() => toggleFavorite(track)}>
                            {track.isFavorite ?(
                                    <img className='fillHartImg' src={fillHeartImage} alt="Liked" />
                                ) : (
                                    <img className='emptyHartImg' src={emptyHeartImage} alt="Not Liked" />
                            )}
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}