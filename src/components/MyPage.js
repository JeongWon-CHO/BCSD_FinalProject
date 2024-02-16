import React from 'react';
import { useNavigate } from 'react-router-dom';
import spotifyGreenLogo from '../images/Spotify_Logo_RGB_Green.png';
import useStore from './useStore'; // Zustand 스토어 임포트

function MyPage() {
    const favoriteTracks = useStore(state => state.favoriteTracks); // 즐겨찾기한 트랙 상태 가져오기
    const favoriteAlbums = useStore(state => state.favoriteAlbums); // 즐겨찾기한 앨범 상태 가져오기

    const navigate = useNavigate();

    const userName = localStorage.getItem('userName');

    const handleImageClick = () => {
        navigate('/');
    };

    return (
        <div>

            <div className='mainLoge2'>
                <img
                    src={spotifyGreenLogo}
                    className='centerImageLogo'
                    onClick={handleImageClick}
                    alt='Logo'
                />
            </div>

            <h1 className='myFavorAlbums'>{userName}'s Favorites</h1>

            <div className="favoritesContainer">
                <div className="favoriteTracks">
                    
                    <h1 className='favoriteTracksText'>Favorite Tracks</h1>

                    {favoriteTracks.length === 0 ? (
                        <p className='emptyText'>비어있습니다!</p>
                    ) : (
                        <div>
                            <div className='emptySpace'></div>
                            <ul className='trackUl'>
                                {favoriteTracks.map((track, index) => (
                                    <li className='trackLi' key={index}>
                                        {track.name} - {track.artists[0].name}
                                    </li> 
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="favoriteAlbums">

                    <h1 className='favoriteAlbumsText'>Favorite Albums</h1>
                    
                    {favoriteAlbums.length === 0 ? (
                        <p className='emptyText'>비어있습니다!</p>
                    ) : (
                        favoriteAlbums.map((album, index) => (
                            <div className='myFavorMusic-myPage' key={index}>
                                
                                <div className='albumImgDiv-myPage'>
                                    <img className='albumImg-myPage' src={album.imageURL} alt={album.name} />
                                </div>

                                <h3 className='albumName-myPage'>★ {album.name} ★</h3>

                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
}

export default MyPage;