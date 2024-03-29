import React from 'react';
import { Link } from 'react-router-dom';
import spotifyGreenLogo from '../images/Spotify_Logo_RGB_Green.png';

function SelectButton() {
    return (
        <div>

            <br />

            <div className='mainLoge'>
                <br />
                <img src={spotifyGreenLogo} className='centerImage' />
            </div>

            <div className='dividingLine'></div>


            <div id='link-group'>

                <div className='artistSearchWrapper'>
                    <div className='artistSearch'>
                        <Link to="/artist-search" className='artistSearchLink'>Search Artist</Link>
                    </div>
                </div>

                <div className='spotifySearchWrapper'>
                    <div className='spotifySearch'>
                        <Link to="/spotify-main" className='spotifySearchLink'>Search Music</Link>
                    </div>
                </div>

                <div className='spotifyKeywordWrapper'>
                    <div className='spotifyKeyword'>
                        <Link to="/spotify-keyword" className='spotifyKeywordLink'>Genre Search</Link>
                    </div>
                </div>

                <div className='recommendWrapper'>
                    <div className='recommend'>
                        <Link to="/spotify-recommend" className='recommendLink'>Recommend</Link>
                    </div>
                </div>

                <div className='myPageWrapper'>
                    <div className='myPage'>
                        <Link to="/spotify-myPage" className='myPageLink'>My Page</Link>
                    </div>
                </div>

                <div className="extraSpace"></div>

                <div className='footer'>
                    @2023-2 BCSD FrontEnd Beginner Final Project
                </div>

            </div>

        </div>
    );
}

export default SelectButton;