'use client';

import { useState, useEffect } from 'react';

interface NowPlayingSong {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export default function NowPlaying() {
  const [song, setSong] = useState<NowPlayingSong | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/spotify/now-playing');
        if (response.status === 204 || !response.ok) {
          setSong({ isPlaying: false });
          return;
        }
        const data = await response.json();
        if (data.item) {
          setSong({
            isPlaying: data.is_playing,
            title: data.item.name,
            artist: data.item.artists.map((artist: any) => artist.name).join(', '),
            albumImageUrl: data.item.album.images[0]?.url,
            songUrl: data.item.external_urls.spotify,
          });
        } else {
          setSong({ isPlaying: false });
        }
      } catch (error) {
        console.error('Error fetching now playing data:', error);
        setSong({ isPlaying: false });
      }
    };

    // Initial fetch, then poll every 5s
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <h2 className="mb-5 text-xl font-semibold tracking-tight">Now Playing</h2>

      {song && song.isPlaying ? (
        <a
          href={song.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-md p-3 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
        >
          {song.albumImageUrl ? (
            <img
              src={song.albumImageUrl}
              alt={`${song.title} album art`}
              width={56}
              height={56}
              className="h-14 w-14 flex-none rounded-md object-cover shadow"
            />
          ) : (
            <div className="h-14 w-14 flex-none rounded-md bg-neutral-200 dark:bg-neutral-700" />
          )}
          <div className="min-w-0">
            <span className="block truncate font-medium text-neutral-900 dark:text-neutral-100">
              {song.title}
            </span>
            <span className="block truncate text-sm text-neutral-500 dark:text-neutral-400">
              {song.artist}
            </span>
          </div>
        </a>
      ) : (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Not currently listening to anything.
        </p>
      )}
    </section>
  );
}