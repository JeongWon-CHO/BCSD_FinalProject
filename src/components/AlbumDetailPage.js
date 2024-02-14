import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AlbumDetailPage() {
    const { albumId } = useParams();
    const [albumInfo, setAlbumInfo] = useState(null);

    useEffect(() => {
        // 로컬 스토리지에서 앨범 정보를 가져옴
        const albumInfoString = localStorage.getItem(`albumInfo_${albumId}`);
        if (albumInfoString) {
            const albumInfo = JSON.parse(albumInfoString);
            setAlbumInfo(albumInfo);
        }
    }, [albumId]);

    if (!albumInfo) {
        return <div>Loading...</div>;
    }


    const followers = localStorage.getItem('artistFollowers');
    const artisName = localStorage.getItem('artistName');


    return (
        <div>
            {/* 앨범 정보를 표시하는 UI 코드 */}
            <div className='albumInfoName'>
                <h1>{albumInfo.name}</h1>
            </div>
            
            <div className='albumInfoImg'>
                <img src={albumInfo.imageURL} alt={albumInfo.name} className='albumCover' />
            </div>
            
            <div className='albumInfo'>
                <h2>Info</h2>
            </div>

            <div className='releaseDate'>
                가수 : {artisName}
                <br></br>
                발매일 : {albumInfo.releaseDate}
                <br></br>
                Followers : {followers}
                <br></br>

            </div>

            <br></br>
            
            <div className='albumInfoTrack'>
                <h2>Tracks</h2>
            </div>
            
            <div>
                <ul className='albumInfoTrackList'>
                    {albumInfo.tracks.map((track, index) => (
                        <li key={index}>{track}</li>
                    ))}
                </ul>
            </div>
            
        </div>
    );
}

export default AlbumDetailPage;