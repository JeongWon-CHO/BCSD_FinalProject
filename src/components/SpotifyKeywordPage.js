import React, { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

function ArtistSearchPage() {

    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");

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
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (

    <div>

        <div className='mainLoge2'>
            <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png' className='centerImageLogo'/>
        </div>

        <Container>
            <InputGroup className='mb-3' size='1g'>
                <FormControl
                className="searchInput"
                placeholder="Search For KeyWord"
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

    </div>
    );
}

export default ArtistSearchPage;
