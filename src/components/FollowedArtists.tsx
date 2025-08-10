'use client';

import { useState, useEffect } from 'react';

interface Artist {
  id: string;
  name: string;
  url: string;
  imageUrl: string;
}

export default function FollowedArtists() {
  const [artists, setArtists] = useState<Artist[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFollowedArtists = async () => {
      try {
        const response = await fetch('/api/spotify/followed-artists');
        if (!response.ok) throw new Error('Failed to load followed artists.');
        const data = await response.json();

        const artistData: Artist[] = data.artists.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          url: item.external_urls.spotify,
          imageUrl: item.images[0]?.url,
        }));

        setArtists(artistData);
      } catch (err: any) {
        setError(err.message ?? 'Unexpected error.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowedArtists();
  }, []);

  if (isLoading) {
    return <div className="text-sm text-neutral-500">Loading followed artists...</div>;
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/30">
        <p className="text-sm text-red-700 dark:text-red-300">Error: {error}</p>
      </div>
    );
  }

  const list = (artists ?? []).slice(0, 10);
  const col1 = list.slice(0, 5);
  const col2 = list.slice(5, 10);

  const Item = ({ artist }: { artist: Artist }) => (
    <a
      key={artist.id}
      href={artist.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
    >
      <img
        src={artist.imageUrl}
        alt={artist.name}
        width={56}
        height={56}
        className="h-14 w-14 flex-none rounded-full object-cover shadow"
      />
      <div className="min-w-0">
        <span className="block truncate font-medium text-neutral-900 dark:text-neutral-100">
          {artist.name}
        </span>
        <span className="block text-sm text-neutral-500 dark:text-neutral-400">Artist</span>
      </div>
    </a>
  );

  return (
    <section>
      <h2 className="mb-5 text-xl font-semibold tracking-tight">Artists I Follow</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <ol className="space-y-3">{col1.map((a) => <li key={a.id}><Item artist={a} /></li>)}</ol>
        <ol className="space-y-3">{col2.map((a) => <li key={a.id}><Item artist={a} /></li>)}</ol>
      </div>
    </section>
  );
}