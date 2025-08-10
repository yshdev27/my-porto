import { NextResponse } from 'next/server';
import querystring from 'querystring';

const client_id = process.env.SPOTIFY_CLIENT_ID as string;
const app_url = process.env.NEXT_PUBLIC_APP_URL as string;

const redirect_uri = `${app_url}/api/spotify/callback`;

export async function GET(): Promise<NextResponse> {
  const scope = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-follow-read',
  ].join(' ');

  const params = querystring.stringify({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
  });

  return NextResponse.redirect(`https://accounts.spotify.com/authorize?${params}`);
}