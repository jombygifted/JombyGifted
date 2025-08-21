import React, { useMemo, useState } from 'react';
import { Home, Music, Video, Crown, User, ExternalLink, Lock, Unlock, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ======= TYPES =============================================================
interface Platform {
  name: string;
  url: string;
}

interface Socials {
  youtube: string;
  instagram: string;
  tiktok: string;
  x: string;
}

interface Artist {
  name: string;
  tagline: string;
  avatar: string;
  hero: string;
  socials: Socials;
  platforms: Platform[];
}

interface Track {
  t: string;
  d: string;
}

interface PremiumItem {
  sku: string;
  title: string;
  price: number;
  description: string;
  cover: string;
  tracks: Track[];
}

interface YouTubeConfig {
  PLAYLIST_ID?: string;
  CHANNEL_ID?: string;
  manualVideoIds: string[];
}

// ======= CONFIG (edit these) ===============================================
const ARTIST: Artist = {
  name: 'JOMBY GIFTED',
  tagline: "Rising star from Nakuru, known for 'The Streets of Moleko' in 2025",
  avatar: '/assets/jomby-avatar.jpg', // Replace with your image in /public/assets
  hero: '/assets/jomby-hero.jpg', // Replace with your image in /public/assets
  socials: {
    youtube: 'https://youtube.com/@jombygifted?si=Lpk5TZUXmYKHpqrh', // Your YouTube URL
    instagram: 'https://www.instagram.com/jombygifted?igsh=bHJ2bTU3ZmV4amNn', // Your Instagram URL
    tiktok: 'https://www.tiktok.com/@jombygifted?_t=ZM-8z48m7SkMwo&_r=1', // Your TikTok URL
    x: 'https://x.com/jombygifted', // Replace with your X URL if available
  },
  platforms: [
    { name: 'Spotify', url: 'https://open.spotify.com/artist/abc123xyz' }, // Replace with your Spotify URL
    { name: 'Apple Music', url: 'https://music.apple.com/artist/abc123xyz' }, // Replace with your Apple Music URL
    { name: 'Deezer', url: 'https://www.deezer.com/artist/abc123xyz' }, // Replace with your Deezer URL
    { name: 'Audiomack', url: 'https://audiomack.com/jombygifted' }, // Replace with your Audiomack URL
    { name: 'Boomplay', url: 'https://www.boomplay.com/artists/abc123xyz' }, // Replace with your Boomplay URL
  ],
};

const YOUTUBE: YouTubeConfig = {
  PLAYLIST_ID: 'PLDuPP0Z_jBnrY47Eo95i0Ms4FA6QRNj-r', // Your YouTube playlist ID
  CHANNEL_ID: 'UC-DEMO-CHANNEL-ID-REPLACE', // Replace with your Channel ID if needed
  manualVideoIds: [
    '3zGEGOJ4WTw', // Video ID from https://youtu.be/3zGEGOJ4WTw
    '3NKBDTwtDzE', // Video ID from https://youtu.be/3NKBDTwtDzE
    'tykT2Wp9OKM', // Video ID from https://youtu.be/tykT2Wp9OKM
  ],
};

const PREMIUM_ITEMS: PremiumItem[] = [
  {
    sku: 'unreleased-album-001',
    title: 'UNRELEASED: Moleko Tapes Vol. 1 (2025)',
    price: 5.99,
    description: 'Early access to 8 tracks, alt mixes, and cover art pack - released Aug 2025',
    cover: '/assets/moleko-tapes.jpg', // Replace with your image
    tracks: [
      { t: 'Intro (Gifted)', d: '1:05' },
      { t: 'Moleko Nights', d: '3:21' },
      { t: 'Streetwise', d: '2:58' },
    ],
  },
  {
    sku: 'unreleased-ep-002',
    title: 'UNRELEASED: Sunset EP (2025)',
    price: 3.99,
    description: '4-track EP + BTS video - available from Aug 21, 2025',
    cover: '/assets/sunset-ep.jpg', // Replace with your image
    tracks: [
      { t: 'Sunset (Demo)', d: '2:42' },
      { t: 'Golden Hour', d: '3:02' },
      { t: 'Skyline', d: '2:36' },
      { t: 'Outro', d: '1:11' },
    ],
  },
];

// ======= HELPERS ==========================================================
const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

interface TabBtnProps {
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  label: string;
  onClick: () => void;
}

const TabBtn: React.FC<TabBtnProps> = ({ icon: Icon, active, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl transition ${
      active ? 'bg-white/10' : 'hover:bg-white/5'
    }`}
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
    <span className="text-xs">{label}</span>
  </button>
);

interface SectionProps {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, right, children }) => (
  <section className="mb-8">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {right}
    </div>
    {children}
  </section>
);

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-white/10">
    {children}
  </span>
);

// ======= VIEWS ============================================================
const HomeView: React.FC = () => {
  const latestId = YOUTUBE.manualVideoIds[0];

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl mb-6">
        <img src={ARTIST.hero} alt={`${ARTIST.name} banner`} className="w-full h-48 md:h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h1 className="text-2xl md:text-3xl font-extrabold">{ARTIST.name}</h1>
          <p className="text-sm text-white/70 max-w-xl">{ARTIST.tagline}</p>
          <div className="mt-3 flex gap-2">
            <a
              className="text-xs underline flex items-center gap-1"
              href={ARTIST.socials.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="Watch on YouTube"
            >
              <Youtube className="w-4 h-4" /> Watch on YouTube
            </a>
          </div>
        </div>
      </div>

      <Section title="Featured Video" right={<Badge>auto-updates</Badge>}>
        <div className="aspect-video rounded-2xl overflow-hidden bg-black/40">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${latestId}`}
            title="Featured YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </Section>

      <Section title="Listen Everywhere" right={<Badge>official links</Badge>}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {ARTIST.platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 transition"
              aria-label={`Listen on ${p.name}`}
            >
              <div>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-[11px] opacity-60">Open platform</div>
              </div>
              <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
};

const MusicView: React.FC = () => (
  <div>
    <Section title="Streaming Platforms" right={<Badge>official</Badge>}>
      <ul className="space-y-3">
        {ARTIST.platforms.map((p) => (
          <li
            key={p.name}
            className="flex items-center justify-between bg-white/5 hover:bg-white/10 transition rounded-2xl px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 grid place-items-center text-sm">🎵</div>
              <div>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-[11px] opacity-60">/JombyGifted</div>
              </div>
            </div>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs underline flex items-center gap-1"
              aria-label={`Open ${p.name}`}
            >
              Open <ExternalLink className="w-3 h-3" />
            </a>
          </li>
        ))}
      </ul>
    </Section>

    <Section title="Latest Drop Kit" right={<Badge>press pack</Badge>}>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl overflow-hidden bg-white/5">
          <img src={ARTIST.avatar} alt="Cover art" className="w-full h-40 object-cover" />
          <div className="p-4">
            <div className="font-semibold">The Streets of Moleko</div>
            <p className="text-sm opacity-70">Single • 2025</p>
          </div>
        </div>
        <div className="md:col-span-2 rounded-2xl bg-white/5 p-4">
          <p className="text-sm opacity-80">
            Shareable links, artwork, and a 15s teaser for socials. Add your real assets here for promo.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm">
              Copy smart link
            </button>
            <button className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm">
              Download cover
            </button>
            <button className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm">
              Grab teaser
            </button>
          </div>
        </div>
      </div>
    </Section>
  </div>
);

const VideosView: React.FC = () => {
  const playlistEmbed = YOUTUBE.PLAYLIST_ID
    ? `https://www.youtube.com/embed/videoseries?list=${YOUTUBE.PLAYLIST_ID}`
    : `https://www.youtube.com/embed?listType=user_uploads&list=${YOUTUBE.CHANNEL_ID}`;

  return (
    <div>
      <Section title="Channel Feed" right={<Badge>YouTube</Badge>}>
        <div className="aspect-video rounded-2xl overflow-hidden bg-black/40">
          <iframe
            className="w-full h-full"
            src={playlistEmbed}
            title="YouTube channel feed"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </Section>

      <Section title="Video Grid" right={<Badge>manual IDs</Badge>}>
        <div className="grid md:grid-cols-3 gap-4">
          {YOUTUBE.manualVideoIds.map((id) => (
            <div key={id} className="rounded-2xl overflow-hidden bg-white/5">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`YouTube video ${id}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-sm opacity-80">Video {id.slice(0, 5)}…</span>
                <a
                  className="text-xs underline"
                  href={`https://youtu.be/${id}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open video on YouTube"
                >
                  Open
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

const PremiumView: React.FC = () => {
  const [unlocked, setUnlocked] = useState<boolean>(() => localStorage.getItem('jg_premium') === '1');
  const [processing, setProcessing] = useState<boolean>(false);

  const mockCheckout = async (item: PremiumItem) => {
    setProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      const currentDate = new Date();
      if (currentDate < new Date('2025-08-21T18:17:00')) {
        alert('Premium content unlocks at 06:17 PM EAT on Aug 21, 2025. Try again later.');
        return;
      }
      localStorage.setItem('jg_premium', '1');
      setUnlocked(true);
      alert(`Unlocked ${item.title} successfully! Enjoy your premium content.`);
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <Section title="Jomby Gifted Premium" right={<Badge>{unlocked ? 'member' : 'locked'}</Badge>}>
        {!unlocked ? (
          <div className="rounded-3xl p-6 bg-gradient-to-br from-white/10 to-white/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 grid place-items-center">
                <Crown />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Unlock unreleased albums</h3>
                <p className="text-sm opacity-80 mt-1">
                  Early access to 2025 releases, BTS videos, demos, and members-only posts. Available now!
                </p>
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  {PREMIUM_ITEMS.map((item) => (
                    <div key={item.sku} className="rounded-2xl overflow-hidden bg-white/5">
                      <img src={item.cover} alt={item.title} className="w-full h-36 object-cover" />
                      <div className="p-4">
                        <div className="font-semibold">{item.title}</div>
                        <p className="text-sm opacity-75">{item.description}</p>
                        <ul className="mt-2 text-xs opacity-70 list-disc ml-4">
                          {item.tracks.map((track, index) => (
                            <li key={index}>
                              {track.t} • {track.d}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm font-medium">{fmt.format(item.price)}</span>
                          <button
                            disabled={processing}
                            onClick={() => mockCheckout(item)}
                            className="px-3 py-2 rounded-xl bg-white/10 enabled:hover:bg-white/20 disabled:opacity-60 text-sm flex items-center gap-2"
                            aria-label={`Unlock ${item.title}`}
                          >
                            <Lock className="w-4 h-4" />
                            {processing ? 'Processing…' : 'Unlock'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl p-6 bg-gradient-to-br from-emerald-500/10 to-white/5 border border-emerald-500/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 grid place-items-center">
                <Unlock />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Welcome, Premium Member 🎉</h3>
                <p className="text-sm opacity-80 mt-1">
                  Enjoy your unlocked 2025 content. Secure files with a server/CDN for production.
                </p>
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  {PREMIUM_ITEMS.map((item) => (
                    <div key={item.sku} className="rounded-2xl overflow-hidden bg-white/5">
                      <img src={item.cover} alt={item.title} className="w-full h-36 object-cover" />
                      <div className="p-4">
                        <div className="font-semibold">{item.title}</div>
                        <audio controls className="w-full mt-2">
                          <source src="/media/secure-demo-track.mp3" type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs opacity-70">Member access since {new Date().toLocaleDateString()}</span>
                          <button
                            onClick={() => {
                              localStorage.removeItem('jg_premium');
                              window.location.reload();
                            }}
                            className="text-xs underline opacity-70 hover:opacity-100"
                            aria-label="Revoke premium access"
                          >
                            Revoke access
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Section>

      <Section title="How to hook up real payments" right={<Badge>dev note</Badge>}>
        <ol className="list-decimal ml-5 text-sm opacity-80 space-y-1">
          <li>Create products in Stripe (or use M-Pesa STK Push via a provider like Flutterwave).</li>
          <li>On click of Unlock, call your backend to create a Checkout Session (or STK request).</li>
          <li>Verify payment via webhook; mark entitlement in your DB for the user (email or device ID).</li>
          <li>Serve protected media from a signed URL (e.g., CloudFront, Supabase, Firebase).</li>
        </ol>
      </Section>
    </div>
  );
};

const ProfileView: React.FC = () => (
  <div>
    <div className="rounded-3xl overflow-hidden bg-white/5">
      <div className="p-6 flex items-start gap-4">
        <img src={ARTIST.avatar} alt={`${ARTIST.name} avatar`} className="w-16 h-16 rounded-2xl object-cover" />
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{ARTIST.name}</h3>
          <p className="text-sm opacity-80">{ARTIST.tagline}</p>
          <div className="mt-2 flex flex-wrap gap-3 text-xs">
            <a
              className="underline opacity-80 hover:opacity-100"
              href={ARTIST.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram profile"
            >
              Instagram
            </a>
            <a
              className="underline opacity-80 hover:opacity-100"
              href={ARTIST.socials.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok profile"
            >
              TikTok
            </a>
            <a
              className="underline opacity-80 hover:opacity-100"
              href={ARTIST.socials.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube profile"
            >
              YouTube
            </a>
            <a
              className="underline opacity-80 hover:opacity-100"
              href="https://www.facebook.com/profile.php?id=100008883249350"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook profile"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </div>

    <Section title="Upcoming Event" right={<Badge>Nakuru • Dec 24, 2025</Badge>}>
      <div className="rounded-2xl bg-white/5 p-4">
        <div className="font-medium">The Streets of Moleko Live</div>
        <p className="text-sm opacity-80 mt-1">
          Join Jomby Gifted for an exclusive live performance in Nakuru on Dec 24, 2025. Tickets go on sale Oct 1, 2025!
        </p>
        <div className="mt-3 flex gap-2">
          <button className="px-3 py-2 rounded-xl bg-whit
