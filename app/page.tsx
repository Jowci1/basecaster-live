'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [view, setView] = useState<'SOCIAL' | 'PROTOCOL'>('SOCIAL');
  const [displayCount, setDisplayCount] = useState(5);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const jowciDisplay = "jowci.farcaster.eth";

  useEffect(() => {
    async function syncBasecaster() {
      setLoading(true);
      try {
        // Simple fetch that works on all browsers/Vercel
        const res = await fetch('https://searchcaster.xyz/api/search?text=base%20alpha&count=40');
        const json = await res.json();
        
        const drips = (json.casts || []).map((c: any) => ({
          id: c.hash,
          category: 'SOCIAL',
          author: `@${c.author.username}`,
          content: c.text,
          // This makes the Alpha clickable
          url: `https://warpcast.com/${c.author.username}/${c.hash.slice(0, 10)}`,
        }));

        const protocol = [
          { id: 'p1', category: 'PROTOCOL', author: 'Base_Dev', content: "Fault Proofs are now live on Base Mainnet.", url: "https://base.mirror.xyz" },
          { id: 'p2', category: 'PROTOCOL', author: 'Base_Protocol', content: "Base throughput increased to 7.5 Mgas/s.", url: "https://base.mirror.xyz" }
        ];

        setData([...protocol, ...drips]);
      } catch (e) {
        setData([
          { id: 'f1', category: 'SOCIAL', author: '@AlphaSeeker', content: "Refreshing Basecaster...", url: "https://warpcast.com" }
        ]);
      }
      setLoading(false);
    }
    syncBasecaster();
  }, []);

  const filteredData = data.filter(item => item.category === view);
  const visibleData = filteredData.slice(0, displayCount);

  return (
    <main style={{ backgroundColor: '#000814', minHeight: '100vh', color: 'white', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '900', margin: 0, letterSpacing: '-1.5px' }}>
            BASE<span style={{ color: '#0052FF' }}>CASTER</span>
          </h1>
        </header>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <button type="button" onClick={() => setView('SOCIAL')} style={{ flex: 1, padding: '16px', borderRadius: '14px', backgroundColor: view === 'SOCIAL' ? '#0052FF' : '#0a1020', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Social Alpha</button>
          <button type="button" onClick={() => setView('PROTOCOL')} style={{ flex: 1, padding: '16px', borderRadius: '14px', backgroundColor: view === 'PROTOCOL' ? '#0052FF' : '#0a1020', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Protocol Alpha</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? <p>Loading Alphas...</p> : visibleData.map((item) => (
            <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: '#0a1020', border: '1px solid #ffffff10', borderRadius: '20px', padding: '24px' }}>
                <span style={{ color: '#0052FF', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>{item.author}</span>
                <p style={{ color: '#cbd5e1', margin: 0 }}>{item.content}</p>
                <span style={{ fontSize: '11px', color: '#475569', display: 'block', marginTop: '10px' }}>Open on Warpcast →</span>
              </div>
            </a>
          ))}
        </div>

        <footer style={{ marginTop: '80px', textAlign: 'center', paddingTop: '40px' }}>
          <p style={{ color: '#475569' }}>
            {/* FIXED: No link, no wallet, just text */}
            Built by <span style={{ color: 'white' }}>{jowciDisplay}</span>
          </p>
        </footer>

      </div>
    </main>
  );
}
