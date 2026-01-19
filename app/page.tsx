'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [view, setView] = useState<'SOCIAL' | 'PROTOCOL'>('SOCIAL');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function syncBasecaster() {
      setLoading(true);
      try {
        const res = await fetch('https://searchcaster.xyz/api/search?text=base%20alpha&count=15');
        const json = await res.json();
        
        if (json.casts && json.casts.length > 0) {
          setData(json.casts.map((c: any) => ({
            id: c.hash,
            category: 'SOCIAL',
            author: `@${c.author.username}`,
            content: c.text,
            // Deep link for Base App / Farcaster clients
            url: `https://warpcast.com/${c.author.username}/${c.hash.slice(0, 10)}`,
          })));
        } else {
          throw new Error("No data");
        }
      } catch (e) {
        setData([
          { id: 'b1', category: 'SOCIAL', author: '@Base', content: "Tap to see the latest Base ecosystem updates.", url: "https://warpcast.com/~/channel/base" },
          { id: 'b2', category: 'PROTOCOL', author: 'Base_Dev', content: "Protocol signals are live. Tap for technical drips.", url: "https://base.mirror.xyz" }
        ]);
      }
      setLoading(false);
    }
    syncBasecaster();
  }, []);

  const filteredData = data.filter(item => item.category === view);

  return (
    <main style={{ backgroundColor: '#000814', minHeight: '100vh', color: 'white', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '900', margin: 0, letterSpacing: '-1.5px' }}>
            BASE<span style={{ color: '#0052FF' }}>CASTER</span>
          </h1>
          <p style={{ color: '#475569', fontSize: '14px', marginTop: '10px' }}>
            Discover Base alpha directly within your wallet.
          </p>
        </header>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <button onClick={() => setView('SOCIAL')} style={{ flex: 1, padding: '16px', borderRadius: '14px', border: 'none', cursor: 'pointer', fontWeight: '900', color: 'white', backgroundColor: view === 'SOCIAL' ? '#0052FF' : '#0a1020' }}>Social Alpha</button>
          <button onClick={() => setView('PROTOCOL')} style={{ flex: 1, padding: '16px', borderRadius: '14px', border: 'none', cursor: 'pointer', fontWeight: '900', color: 'white', backgroundColor: view === 'PROTOCOL' ? '#0052FF' : '#0a1020' }}>Protocol Alpha</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#475569' }}>Loading Base Feed...</p>
          ) : (
            filteredData.map((item) => (
              <a key={item.id} href={item.url} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#0a1020', border: '1px solid #ffffff10', borderRadius: '20px', padding: '24px' }}>
                  <span style={{ color: '#0052FF', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>{item.author}</span>
                  <p style={{ color: '#cbd5e1', margin: 0, fontSize: '15px' }}>{item.content}</p>
                </div>
              </a>
            ))
          )}
        </div>

        <footer style={{ marginTop: '80px', textAlign: 'center', paddingTop: '40px' }}>
          <p style={{ fontSize: '13px', color: '#475569', fontWeight: 'bold' }}>
            Built by <span style={{ color: 'white' }}>Jowci</span>
          </p>
        </footer>

      </div>
    </main>
  );
}
