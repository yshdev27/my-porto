import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios, { AxiosError } from 'axios';

// A basic type for the Spotify track item.
// In a real app, you'd define this more thoroughly.
interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  external_urls: { spotify: string };
}

interface SpotifyTopTracksResponse {
  items: SpotifyTrack[];
}

export async function GET(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('spotify_access_token');

  if (!accessToken?.value) {
    return NextResponse.json({ error: 'Access token missing' }, { status: 401 });
  }

  try {
    const { data } = await axios.get<SpotifyTopTracksResponse>(
      'https://api.spotify.com/v1/me/top/tracks?limit=10', 
      {
        headers: { Authorization: `Bearer ${accessToken.value}` },
      }
    );
    return NextResponse.json(data);
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(
      axiosError.response?.data || { error: 'An unknown error occurred' },
      {
        status: axiosError.response?.status || 500,
      }
    );
  }
}