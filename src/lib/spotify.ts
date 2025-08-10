import axios from 'axios';
import querystring from 'querystring';


const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;


const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

// Necessary Spotify API endpoints
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?limit=10`;
const FOLLOWED_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/following?type=artist`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const PLAYER_ENDPOINT = `https://api.spotify.com/v1/me/player/play`; 

/**
 * Gets a new access token from Spotify using the permanent refresh token.
 * This is the core function for our server-to-server authentication.
 */
const getAccessToken = async () => {
  const response = await axios({
    method: 'post',
    url: TOKEN_ENDPOINT,
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.data;
};

/**
 * Fetches your top tracks from Spotify.
 */
export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();
  const response = await axios.get(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.data;
};

/**
 * Fetches the artists you follow on Spotify.
 */
export const getFollowedArtists = async () => {
  const { access_token } = await getAccessToken();
  const response = await axios.get(FOLLOWED_ARTISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.data;
};

/**
 * Fetches your currently playing song from Spotify.
 */
export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();
  const response = await axios.get(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.data;
};

/**
 * Pauses the currently playing track on Spotify.
 */
export const pausePlayback = async () => {
  const { access_token } = await getAccessToken();
  // The endpoint for pause is a PUT request to the main player endpoint
  const response = await axios.put(`${PLAYER_ENDPOINT}/pause`, null, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.status;
};

/**
 * Starts or resumes playback on Spotify.
 * Can specify a track to play.
 * @param trackUri - The "spotify:track:..." URI of the song to play.
 */
export const startPlayback = async (trackUri?: string) => {
  const { access_token } = await getAccessToken();
  const body = trackUri ? { uris: [trackUri] } : {};
  
  const response = await axios.put(`${PLAYER_ENDPOINT}/play`, body, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.status;
};