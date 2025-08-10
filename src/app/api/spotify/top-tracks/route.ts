// app/api/spotify/top-tracks/route.ts
import { NextResponse } from 'next/server';
import { getTopTracks } from '@/lib/spotify'; // Use your correct path, e.g., ../../../lib/spotify

export const dynamic = 'force-dynamic'; // This tells Next.js not to cache this route

export async function GET(): Promise<NextResponse> {
  try {
    const data = await getTopTracks();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch top tracks from Spotify.' },
      { status: 500 }
    );
  }
}