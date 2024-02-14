import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import spotifyGreenLogo from '../images/Spotify_Logo_RGB_Green.png';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export default function MusicSearchPage() {

    const [token, setToken] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getToken = async () => {
            const result = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded', 
                    'Authorization' : 'Basic ' + btoa( CLIENT_ID + ':' + CLIENT_SECRET)
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
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        if (!result.ok) {
            // 에러 처리
            console.error('Error fetching data:', result.statusText);
            return;
        }
        const data = await result.json();
        setSearchResults(data.tracks.items);
    };
    
    const handleSearch = () => {
        searchTracks();
    };




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
                    placeholder="Search for Music"
                />
                <button className='searchBtn' onClick={handleSearch}>🔍︎</button>
            </div>
            
            <ul>
                {searchResults.map(track => (
                    <li key={track.id}>{track.name} - {track.artists.map(artist => artist.name).join(', ')}</li>
                ))}
            </ul>
        </div>
    );
}