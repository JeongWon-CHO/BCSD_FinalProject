import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import spotifyGreenLogo from '../images/Spotify_Logo_RGB_Green.png';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

function SpotifyKeywordPage() {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [token, setToken] = useState('');

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

    useEffect(() => {
        const getGenres = async () => {
            const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + token}
            });
            const data = await result.json();
            setGenres(data.categories.items);
        };
        if (token) {
            getGenres();
        }
    }, [token]);

    useEffect(() => {
        const getPlaylistsByGenre = async () => {
            if (selectedGenre) {
                const result = await fetch(`https://api.spotify.com/v1/browse/categories/${selectedGenre}/playlists`, {
                    method: 'GET',
                    headers: { 'Authorization' : 'Bearer ' + token}
                });
                const data = await result.json();
                setPlaylists(data.playlists.items);
            }
        };
        getPlaylistsByGenre();
    }, [selectedGenre, token]);

    useEffect(() => {
        const getTracksByPlaylist = async () => {
            if (selectedPlaylist) {
                const result = await fetch(selectedPlaylist, {
                    method: 'GET',
                    headers: { 'Authorization' : 'Bearer ' + token}
                });
                const data = await result.json();
                setTracks(data.items);
            }
        };
        getTracksByPlaylist();
    }, [selectedPlaylist, token]);


    const handleImageClick = () => {
        // 이미지를 클릭하여 다른 페이지로 이동
        navigate('/');
    };


    console.log("Tracks: ", tracks);

    return (
        <div>

            <div className='mainLoge2'>
                <img src={spotifyGreenLogo} className='centerImageLogo' onClick={handleImageClick} />
            </div>


            <div className='keywordPageTitle'>
                <h1>Spotify Keyword Page</h1>
            </div>
            
            <br></br>

            <div className='selectDiv'>
                <span className='selectedGenreSpan'>
                    {/* 장르 선택 */}
                    <select className='selectedGenre' value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                        <option value="">Select Genre</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>
                </span>

                <span className='selectedPlaylistSpan'>
                    {/* 플레이리스트 선택 */}
                    <select className='selectedPlaylist' value={selectedPlaylist} onChange={(e) => setSelectedPlaylist(e.target.value)}>
                        <option value="">Select Playlist</option>
                        {playlists.map(playlist => (
                            <option key={playlist.id} value={playlist.tracks.href}>{playlist.name}</option>
                        ))}
                    </select>
                </span>
            </div>
            
            
            <br></br>

            {/* 트랙 목록 */}
            <ul className='trackList'>
                {tracks.map(t => (
                    <li key={t.id}>{t.track.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default SpotifyKeywordPage;