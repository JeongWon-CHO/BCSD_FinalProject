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

    return (
        <div>
            {/* 앨범 정보를 표시하는 UI 코드 */}
            <h1>{albumInfo.name}</h1>
            <img src={albumInfo.imageURL} alt={albumInfo.name} />
            <p>Release Date: {albumInfo.releaseDate}</p>
            <h2>Tracks</h2>
            <ul>
                {albumInfo.tracks.map((track, index) => (
                    <li key={index}>{track}</li>
                ))}
            </ul>
        </div>
    );
}

export default AlbumDetailPage;