// ArtistSearchPage.js
import React, { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import emptyHeartImage from '../images/emptyHartImg.png';
import fillHeartImage from '../images/FillHartImg.png';
import spotifyGreenLogo from '../images/Spotify_Logo_RGB_Green.png';
import useStore from './useStore';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

function ArtistSearchPage() {
    
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albumInfo, setAlbumInfo] = useState([]);
    const navigate = useNavigate();
    const favoriteAlbums = useStore(state => state.favoriteAlbums); // 즐겨찾기 앨범 목록
    const addFavoriteAlbum = useStore(state => state.addFavoriteAlbum); // 즐겨찾기 앨범 추가
    const removeFavoriteAlbum = useStore(state => state.removeFavoriteAlbum); // 즐겨찾기 앨범 제거
    
    useEffect(() => {
        const authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        };
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token));
    }, []);

    async function search() {
        console.log("Search for " + searchInput);
        const searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        };
        try {
            const searchResponse = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters);
            const searchData = await searchResponse.json();
            console.log("Search data:", searchData);
            const artistIDResponse = searchData.artists.items[0].id;
            const albumsResponse = await fetch('https://api.spotify.com/v1/artists/' + artistIDResponse + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters);
            const albumsData = await albumsResponse.json();
            const newAlbumInfo = [];
            if (Array.isArray(albumsData.items)) {
                for (const albumData of albumsData.items) {
                    const albumID = albumData.id;
                    const albumName = albumData.name;
                    const albumImageURL = albumData.images[0].url;
                    const albumReleaseDate = albumData.release_date;
                    const albumTracksResponse = await fetch(`https://api.spotify.com/v1/albums/${albumID}/tracks`, searchParameters);
                    const albumTracksData = await albumTracksResponse.json();
                    const albumTracks = albumTracksData.items.map(track => track.name);
                    newAlbumInfo.push({
                        id: albumID,
                        name: albumName,
                        imageURL: albumImageURL,
                        releaseDate: albumReleaseDate,
                        tracks: albumTracks,
                        favorite: false
                    });
                }
            }
            setAlbumInfo(newAlbumInfo);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        console.log(albumInfo);
    }, [albumInfo]);


    const handleImageClick = () => {
        navigate('/');
    };

    const handleAlbumClick = (album) => {
        localStorage.setItem(`albumInfo_${album.id}`, JSON.stringify(album));
        navigate(`/album-detail/${album.id}`);
    };

    return (
        <div>
            <div className='mainLoge2'>
                <img
                    src={spotifyGreenLogo}
                    className='centerImageLogo'
                    onClick={handleImageClick}
                    alt='logo'
                />
            </div>

            <div className='musicSearch-center'>
                <h1 className='musicSearch'>Artist Search</h1>
            </div>

            <Container>
                <InputGroup className='mb-3' size='1g'>
                    <FormControl
                        className="searchInput"
                        placeholder="Search For Artist"
                        type="input"
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                search();
                            }
                        }}
                        onChange={event => setSearchInput(event.target.value)}
                    />
                    <Button onClick={search} className="searchInputBtn">
                        🔍︎
                    </Button>
                </InputGroup>
            </Container>

            <div className='emptySpace-search'>
                
            </div>

            <Container className="albumsGrid">
                {albumInfo.map((album, i) => (
                    <div key={i} className="albumContainer">
                        <div className="albumInfo-searchPage">
                        <Link to={`/album-detail/${album.id}`} className='albumLink-artistSearch' onClick={() => handleAlbumClick(album)}>
                            <div className='albumImgContain-SearchPage'>
                                <img src={album.imageURL} alt='img' className='albumImg-SearchPage'></img>
                            </div>
                        </Link>
                            <p className='albumName-renew'>{album.name}</p>
                            <Button className='likeBtn' onClick={() => {
                                const isFavorite = favoriteAlbums.some((favAlbum) => favAlbum.id === album.id);
                                if (isFavorite) {
                                    removeFavoriteAlbum(album.id);
                                } else {
                                    addFavoriteAlbum(album);
                                }
                            }}>
                                {favoriteAlbums.some((favAlbum) => favAlbum.id === album.id) ? (
                                    <img src={fillHeartImage} alt="Liked" />
                                ) : (
                                    <img src={emptyHeartImage} alt="Not Liked" />
                                )}
                            </Button>
                        </div>
                    </div>
                ))}
            </Container>
        </div>
    );
}

export default ArtistSearchPage;