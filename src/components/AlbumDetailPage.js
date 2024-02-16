import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AlbumDetailPage() {
    const { albumId } = useParams();
    const [albumInfo, setAlbumInfo] = useState(null);

    useEffect(() => {
        const albumInfoString = localStorage.getItem(`albumInfo_${albumId}`);
        
        if (albumInfoString) {
            const albumInfo = JSON.parse(albumInfoString);
            setAlbumInfo(albumInfo);
        }
    }, [albumId]);

    if (!albumInfo) {
        console.log({albumInfo});
        return <div>Loading...</div>;
    }

    return (
        <div>

            <div className='albumInfoName'>
                <h1 className='albumInfoNameText'>{albumInfo.name}</h1>
            </div>
            

            <div className='allSorted-detailPage'>

                <div className='albumInfoImg'>
                    <img src={albumInfo.imageURL} alt={albumInfo.name} className='albumCover' />
                </div>
                

                <div className='info-track-detailPage'>
                    <div className='albumInfo'>
                        <h2>Info</h2>
                    </div>

                    <div className='releaseDate'>
                        발매일 : {albumInfo.releaseDate}
                    </div>
                    
                    <div className='albumInfoTrack'>
                        <h2>Tracks</h2>
                    </div>
                    
                    <div>
                        <ul className='albumInfoTrackList'>
                            {albumInfo.tracks.map((track, index) => (
                                <li className='trakcList-detailPage' key={index}>{track}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default AlbumDetailPage;