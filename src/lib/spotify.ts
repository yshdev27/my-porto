// lib/spotify.ts
import axios from 'axios';
import querystring from 'querystring';

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?limit=10`;

// This function gets a new access token from Spotify using your refresh token
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

// This function fetches your top tracks
export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  const response = await axios.get(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.data;
};