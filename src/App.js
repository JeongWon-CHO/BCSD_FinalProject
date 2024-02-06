//import SpotifyWebApi from 'spotify-web-api-js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CLIENT_ID = '85fab8d1d06e441daf711f3272605d41';
const CLIENT_SECRET = '18defef5ad384298830bcba877f7bd2f';

function App () {

  const [searchInput, setSerchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect( () => {
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
  }, [])


  // Search
  // Search 함수가 비동기인 점 : 함수 내부에 다양한 fetch 문이 있고, 차례를 기다려야 하기 때문
  async function search() {
    console.log("Search for " + searchInput);  // Taylor Swift

    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    // 요청에 변수를 추가하기 위해 '?'를 사용
    const artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())

      // 아티스트의 모든 앨범을 가져오기 위한 쿼리를 만드려면 아티스트의 아이디가 필요
      .then(data => { return data.artists.items[0].id })
    
    console.log("Artist ID is " + artistID);
    // Get request with Arist ID grab all the albums from that artist
    const albums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setAlbums(data.items)
    });

    // Display those albums to the user

  }

  console.log(albums);

  return (
    <div className='App'>

      <div>
        <br></br>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/1024px-Spotify_logo_with_text.svg.png' />
        <br></br><br></br><br></br>
      </div>

      <Container>
        <InputGroup className='mb-3' size='1g'>
          <FormControl
            placeholder="Search For Artist"
            type="input"
            onKeyPress={event => {
              if (event.key == "Enter") {
                search();
              }
            }}
            onChange={event => setSerchInput(event.target.value)}  
          />
          <Button onClick={search}>
            Search
          </Button>
        </InputGroup>
      </Container>

      <br></br><br></br>

      <Container>
        <Row className='mx-2 row row-cols-4'>
          {albums.map( (album, i) => {

            console.log(album);
            
            return (
              <div onClick={ () => console.log("Click!") }>
                <Card>
                <Card.Img src={album.images[0].url} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                </Card.Body>
              </Card>
              </div>
              
            )
          
          })}

          

        </Row>
      </Container>
    
    </div>
  );
};

export default App;