import React from 'react';

function AlbumDetailPage() {

    // 이전 페이지에서 전달된 데이터 읽어오기
    const artistName = localStorage.getItem('artistName');
    
    const albumName = localStorage.getItem('albumNameNum');

    // 앨범 정보가 있으면 앨범 세부 정보 표시
    return (
        <div>
            <div className='artistName'>
                가수 이름 : {artistName}
            </div>

            <div className='albumName'>
                앨범 이름 : {albumName}
            </div>

            <div>
                왜 안될까 진차 ..
            </div>
        </div>
    );
}

export default AlbumDetailPage;