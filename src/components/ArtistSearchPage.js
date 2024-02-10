import React, { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

function ArtistSearchPage() {

    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);
    const [artistID, setArtistID] = useState(""); // 로컬 스토리지에 저장하기 위한 useState
    
    // 변경된 상태 추가: 앨범 정보
    const [albumInfo, setAlbumInfo] = useState([]);


    useEffect(() => {
        // API Access Token
        const authParameters = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, []);



    // Search
    // Search 함수가 비동기인 점 : 함수 내부에 다양한 fetch 문이 있고, 차례를 기다려야 하기 때문
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
            setArtistID(artistIDResponse);
    
            const artistName = searchData.artists.items[0].name;
            localStorage.setItem('artistName', artistName);
    
            const artistFollowers = searchData.artists.items[0].followers.total;
            localStorage.setItem('artistFollowers', artistFollowers);
            setArtistID(artistFollowers);
    
            const artistGenres = searchData.artists.items[0].genres;
            localStorage.setItem('artistGenres', JSON.stringify(artistGenres));
            setArtistID(artistGenres);
    
    
            const albumsResponse = await fetch('https://api.spotify.com/v1/artists/' + artistIDResponse + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters);
            const albumsData = await albumsResponse.json();
    
            setAlbums(albumsData.items);
            localStorage.setItem('albums', JSON.stringify(albumsData));
    
            // 앨범 정보 초기화
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
                        tracks: albumTracks
                    });
                }
            }
    
            setAlbumInfo(newAlbumInfo);
    
            // 로컬스토리지에 올리기
            newAlbumInfo.forEach((album, index) => {
                localStorage.setItem(`albumInfo_${album.id}`, JSON.stringify(album));
            });
    
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        console.log(albumInfo); // albumInfo가 업데이트될 때마다 출력
    }, [albumInfo]); // albumInfo가 변경될 때마다 useEffect 실행

    // AlbumInfo가 변경될 때마다 로컬 스토리지에 저장
    useEffect(() => {
        albumInfo.forEach((album, index) => {
            localStorage.setItem(`albumInfo_${index}`, JSON.stringify(album));
        });
    }, [albumInfo]); // albumInfo가 변경될 때마다 useEffect 실행


    //console.log(albums);

    return (

    <div>



        <div className='mainLoge2'>
            <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png' className='centerImageLogo'/>
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

        <br></br><br></br>

        <Container>
                <Row className='mx-2 row row-cols-4'>
                    {albumInfo.map((album, i) => (
                        <div onClick={() => console.log("Click!")}>
                            <Link to={`/album-detail/${album.id}`}>
                                <Card>
                                    <Card.Title>
                                        <div className='albumName'>
                                            {album.name}
                                        </div>
                                        </Card.Title>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </Row>
            </Container>
    </div>
    );
}

export default ArtistSearchPage;
