const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQCfocBPwL6kp_hke41xD1Inm3atPoam3y2aX5qqihiNIOiKs3uK23rNC-_RvJT9w7nVd-KQ-oU4bubb-G1QwL5dOUylvrUWskcw5MLaeZIMzK2-72cVKHo-VA3-Jj62H71Gvr12rNxIoi_4K9cqIAmOxuyPSNIeU0X1r7xhdWhu7QK0GAFFKh2c9epK50oFHd8yLjxSnJR0od5nVFqpgSoB01cFQRJ1NfhDaCEXHL3HrRzrSWmNDU1tD0tnAyEaY0-uwE2XzDg5PEP33M9lxeIX';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);