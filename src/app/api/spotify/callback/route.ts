import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';
import querystring from 'querystring';

const client_id = process.env.SPOTIFY_CLIENT_ID as string;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string;
const app_url = process.env.NEXT_PUBLIC_APP_URL as string;

const redirect_uri = `${app_url}/api/spotify/callback`;


export async function GET(request: NextRequest): Promise<NextResponse> {
  const code = request.nextUrl.searchParams.get('code');

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
    });

    const { access_token, refresh_token } = response.data;
    
    const cookieStore = await cookies();

    cookieStore.set('spotify_access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 3600, // 1 hour
      path: '/',
    });

    cookieStore.set('spotify_refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    // Redirect to your portfolio's homepage
    const origin = request.nextUrl.origin;
    return NextResponse.redirect(new URL('/', origin));

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve access token' },
      { status: 500 }
    );
  }
}