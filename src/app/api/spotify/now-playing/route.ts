import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/lib/spotify'; 

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  try {
    const data = await getNowPlaying();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch now playing data.' },
      { status: 500 }
    );
  }
}