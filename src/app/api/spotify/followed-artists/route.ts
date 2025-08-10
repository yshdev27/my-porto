import { NextResponse } from 'next/server';
import { getFollowedArtists } from '@/lib/spotify'; // Adjust path if needed

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  try {
    const data = await getFollowedArtists();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch followed artists.' },
      { status: 500 }
    );
  }
}