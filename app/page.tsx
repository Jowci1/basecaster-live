'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAlphas() {
      try {
        // We add a random number to the end to force the API to give us fresh data
        const res = await fetch(`https://searchcaster.xyz/api/search?text=base%20alpha&count=10&cacheBust=${Math.random()}`);
        const json = await res.json();
        
        if (json.casts && json.casts.length > 0) {
          setData(json.casts.map((c: any) => ({
            id: c.hash,
            author: `@${c.author.username}`,
            content: c.text,
            url: `https://warpcast.com/${c.author.username}/${c.hash.slice(0, 10)}`
          })));
        } else {
          throw new Error("Empty");
        }
      } catch (e) {
        // BACKUP DATA: If the API is down, show these so the app still works
        setData([
          { id: 'b1', author: '@Base', content: "Building on Base? Check the latest trending casts live.", url: "https://warpcast.com/~/channel/base" },
          { id: 'b2', author: '@Jowci', content: "Welcome to Basecaster. Tap any card to dive into the alpha.", url: "https://warpcast.com" },
          { id: 'b3', author: '@AlphaFeed', content: "Live feed syncing... tap here to refresh manually.", url: "https://warpcast.com/~/search?q=base+alpha" }
        ]);
      }
      setLoading(false);
    }
    getAlphas();
  }, []);

  return (
    <div style={{ backgroundColor: '#000814', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>BASE<span style={{ color: '#0052FF' }}>CASTER</span></h1>
        <p style={{ color: '#475569', fontSize: '14px' }}>Latest Social Alpha</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', margin: '0 auto' }}>
        {loading ? <p style={{ textAlign: 'center' }}>Syncing Feed...</p> : data.map((item) => (
          <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: '#0a1020', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
              <span style={{ color: '#0052FF', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>{item.author}</span>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '15px', lineHeight: '1.5' }}>{item.content}</p>
            </div>
          </a>
        ))}
      </div>

      <footer style={{ marginTop: '60px', textAlign: 'center', color: '#475569', fontSize: '12px' }}>
        Built by <span style={{ color: 'white' }}>Jowci</span>
      </footer>
    </div>
  );
}
