// MyPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from './useStore'; // Zustand 스토어 임포트

function MyPage() {
    const favoriteAlbums = useStore((state) => state.favoriteAlbums); // 즐겨찾기한 앨범 상태 가져오기


    const navigate = useNavigate();


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
                />
            </div>


            <h1 className='myFavorAlbums'>My Favorite Albums</h1>

            <div className='myFavor-myPage'>
                {favoriteAlbums.length === 0 ? (
                    <p> 텅 ! 비어있습니다! </p>
                ) : (
                    favoriteAlbums.map((album, index) => (

                        <div className='myFavorMusic-myPage' key={index}>
                            
                            <h2 className='albumName-myPage'>♥  {album.name}  ♥</h2>
                            
                            <div className='albumImgDiv-myPage'>
                                <img className='albumImg-myPage' src={album.imageURL} alt={album.name} />
                            </div>
                            
                            <p className='albumRelease-myPage'>발매일 : {album.releaseDate}</p>
                            
                            <div className='trackList-myPage'>
                                {album.tracks.map((track, trackIndex) => (
                                    <li key={trackIndex}>{track}</li>
                                ))}
                            </div>

                            <br></br><br></br>

                        </div>

                    ))
                )}
            </div>

        </div>
    );
}

export default MyPage;
