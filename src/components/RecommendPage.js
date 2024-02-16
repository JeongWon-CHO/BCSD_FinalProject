import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RecommendPage() {

    const [token, setToken] = useState('');
    const [selectedMood, setSelectedMood] = useState('');
    const [tracks, setTracks] = useState([]);
    const navigate = useNavigate();

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

    const moods = [
        { label: '신남', value: 'happy' },
        { label: '차분함', value: 'calm' },
        { label: '즐거운', value: 'enjoy' },
        { label: '우울한', value: 'sad' },
        { label: '화난', value: 'angry' },
        { label: '놀란', value: 'amazed' },
        { label: '발랄한', value: 'cheer' },
    ];

    useEffect(() => {
        const getToken = async () => {
            
            const result = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
                },
                body: 'grant_type=client_credentials'
            });
            const data = await result.json();
            setToken(data.access_token);
        };

        getToken();
    }, []);

    const handleMoodChange = async (e) => {
        const mood = e.target.value;
        setSelectedMood(mood);
    
        if (!mood || !token) return;
    
        // 여기에서 각 기분에 따른 검색 키워드를 정의합니다.
        let searchQuery;
        switch (mood) {
            case 'happy':
                searchQuery = 'happy';
                break;
            case 'calm':
                searchQuery = 'calm';
                break;
            case 'enjoy':
                searchQuery = 'enjoy';
                break;
            case 'sad':
                searchQuery = 'sad';
                break;
            case 'angry':
                searchQuery = 'angry';
                break;
            case 'amazed':
                searchQuery = 'amazed';
                break;
            case 'cheer':
                searchQuery = 'cheer';
                break;
            default:
                searchQuery = '';
        }
    
        if (!searchQuery) return;
    
        const result = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=10`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json();
        if (data.tracks && data.tracks.items) {
            setTracks(data.tracks.items);
        }
    };

    const handleImageClick = () => {
        navigate('/');
    };

    return (
        <div>

            <div className='mainLoge2'>
                <img
                    src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png'
                    className='centerImageLogo'
                    onClick={handleImageClick}
                    alt='Logo'
                />
            </div>

            <h1 className='musicRecommendTitle'>Music Recommendations</h1>
            <h1 className='musicRecommendTitle'>by Mood</h1>
            
            <div className='select-center'>
                <select className='selectMood' onChange={handleMoodChange} value={selectedMood}>
                <option value="">Select your mood</option>
                {moods.map((mood, index) => (
                    <option key={index} value={mood.value}>{mood.label}</option>
                ))}
                </select>
            </div>
            
            {selectedMood && (
                <div className='trackList-board-recommend'>
                    <ul className='trackList-recommend-ul'>
                        {tracks.map(track => (
                            <li className='trackList-recommend-li' key={track.id}>{track.name} - {track.artists.map(artist => artist.name).join(', ')}</li>
                        ))}
                    </ul>
                </div>
            )}
            
        </div>
    );
}

export default RecommendPage;
