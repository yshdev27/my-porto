'use client';

import { useState, useEffect } from 'react';

interface Track {
  id: string;
  name: string;
  artist: string;
  url: string;
  albumImageUrl: string;
}

export default function TopTracks() {
  const [tracks, setTracks] = useState<Track[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await fetch('/api/spotify/top-tracks');
        if (!response.ok) {
          throw new Error('Please log in with Spotify first.');
        }
        const data = await response.json();

        const trackData: Track[] = data.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          artist: item.artists.map((artist: any) => artist.name).join(', '),
          url: item.external_urls.spotify,
          albumImageUrl: item.album.images[0]?.url,
        }));

        setTracks(trackData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopTracks();
  }, []);

  if (isLoading) {
    return <div className="text-sm text-neutral-500">Loading your top tracks...</div>;
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/30">
        <p className="mb-3 text-sm text-red-700 dark:text-red-300">Error: {error}</p>
        <a href="/api/spotify/login">
          <button className="inline-flex items-center rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200">
            Login with Spotify
          </button>
        </a>
      </div>
    );
  }

  const top10 = (tracks ?? []).slice(0, 10);
  const col1 = top10.slice(0, 5);
  const col2 = top10.slice(5, 10);

  const renderItem = (track: Track) => (
    <li
      key={track.id}
      className="flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
    >
      <img
        src={track.albumImageUrl}
        alt={`${track.name} album art`}
        width={50}
        height={50}
        className="h-[50px] w-[50px] flex-none rounded-md object-cover shadow"
      />
      <div className="min-w-0">
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block truncate font-medium text-neutral-900 hover:underline dark:text-neutral-100"
        >
          {track.name}
        </a>
        <p className="truncate text-sm text-neutral-500 dark:text-neutral-400">{track.artist}</p>
      </div>
    </li>
  );

  return (
    <section>
      <h2 className="mb-5 text-xl font-semibold tracking-tight">My Top 10 Spotify Tracks</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <ol className="space-y-3">
          {col1.map(renderItem)}
        </ol>
        <ol className="space-y-3">
          {col2.map(renderItem)}
        </ol>
      </div>
    </section>
  );
}