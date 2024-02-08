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
    }



    // 요청에 변수를 추가하기 위해 '?'를 사용
    const artistIDResponse = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
            .then(response => response.json())
            .then(data => { return data.artists.items[0].id });

    console.log("Artist ID is " + artistIDResponse);
    localStorage.setItem('artistName', artistIDResponse);
    setArtistID(artistIDResponse);


    const artistName = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
            .then(response => response.json())
            .then(data => { return data.artists.items[0].name });


    console.log("Artist Name is " + artistName);
    localStorage.setItem('artistName', artistName);


    const albumName = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
            .then(response => response.json())
            .then(data => { return data.artists.name });

    console.log("Album Name is " + albumName);
    localStorage.setItem('albumName', albumName);
    


    // Get request with Arist ID grab all the albums from that artist
    const albumsResponse = await fetch('https://api.spotify.com/v1/artists/' + artistIDResponse + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setAlbums(data.items);
    });

    // Save artistID and albums to local storage
    localStorage.setItem('artistID', artistIDResponse);
    localStorage.setItem('albums', JSON.stringify(albumsResponse));

    }


    console.log(albums);


    const albumNameArr = [];
    const albumNameNumArr = [];

    return (

    <div>

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

                {albums.map((album, i) => {

                console.log(album);
                albumNameArr.push(album.name)
                albumNameNumArr.push(i)

                // 개비효율적인데 ...
                localStorage.setItem('albumName', albumNameArr);
                localStorage.setItem('albumNameNum', albumNameNumArr);

                return (
                    <div onClick={ () => console.log("Click!") }>

                        <Link to={`/album-detail/${album.id}`}>
                            
                            <Card>
                                <Card.Img src={album.images[0].url} />
                                <Card.Body>
                                    <Card.Title>{album.name}</Card.Title>
                                </Card.Body>
                                <br></br>
                            </Card>
                        </Link>
                    </div>
                    
                    )
                })}

            </Row>
        </Container>
    </div>
    );
}

export default ArtistSearchPage;