const Spotify = require("spotify-api.js");

// async 함수를 사용하여 비동기 작업 수행
const fetchTrackData = async (token, trackId) => {
    const client = new Spotify.Client({ token });
    return await client.tracks.get(trackId);
};

module.exports = {
    fetchTrackData,
};