'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [view, setView] = useState<'SOCIAL' | 'PROTOCOL'>('SOCIAL');
  const [displayCount, setDisplayCount] = useState(5);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function syncBasecaster() {
      setLoading(true);
      try {
        // Fetching specifically for Base-related alpha
        const res = await fetch('https://searchcaster.xyz/api/search?text=base%20alpha&count=40');
        const json = await res.json();
        
        const drips = (json.casts || []).map((c: any) => ({
          id: c.hash,
          category: 'SOCIAL',
          author: `@${c.author.username}`,
          content: c.text,
          // This creates a link that opens in the Base App browser
          url: `https://warpcast.com/${c.author.username}/${c.hash.slice(0, 10)}`,
        }));

        const protocol = [
          { id: 'p1', category: 'PROTOCOL', author: 'Base_Dev', content: "Fault Proofs are now live on Base Mainnet. Significant decentralization milestone reached.", url: "https://base.mirror.xyz" },
          { id: 'p2', category: 'PROTOCOL', author: 'Base_Protocol', content: "Base throughput increased to 7.5 Mgas/s. Scaling for the next 1M builders.", url: "https://base.mirror.xyz" },
          { id: 'p3', category: 'PROTOCOL', author: 'BuildOnBase', content: "Smart Wallet Paymasters now live: Developers can sponsor user gas fees globally.", url: "https://docs.base.org" }
        ];

        setData([...protocol, ...drips]);
      } catch (e) {
        setData([
          { id: 'f1', category: 'SOCIAL', author: '@Base', content: "Syncing latest alpha... if this persists, check your connection.", url: "https://warpcast.com/base" },
          { id: 'f2', category: 'PROTOCOL', author: 'Base_Ops', content: "Base protocol signals are currently being indexed.", url: "https://base.mirror.xyz" }
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
        
        {/* Branding Section Restored */}
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '900', margin: 0, letterSpacing: '-1.5px' }}>
            BASE<span style={{ color: '#0052FF' }}>CASTER</span>
          </h1>
          <p style={{ color: '#475569', fontSize: '14px', marginTop: '10px', lineHeight: '1.6', maxWidth: '450px' }}>
            Bridging Farcaster social drips with Base on-chain signals. <br/>
            <strong>Discover the alpha before it hits the charts.</strong>
          </p>
        </header>

        {/* Navigation Tabs Restored */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <button 
            type="button"
            onClick={() => { setView('SOCIAL'); setDisplayCount(5); }}
            style={{ 
              flex: 1, padding: '16px', borderRadius: '14px', border: 'none', cursor: 'pointer', fontWeight: '900', color: 'white',
              backgroundColor: view === 'SOCIAL' ? '#0052FF' : '#0a1020',
              boxShadow: view === 'SOCIAL' ? '0 4px 15px rgba(0, 82, 255, 0.3)' : 'none'
            }}
          >
            Social Alpha
          </button>
          <button 
            type="button"
            onClick={() => { setView('PROTOCOL'); setDisplayCount(5); }}
            style={{ 
              flex: 1, padding: '16px', borderRadius: '14px', border: 'none', cursor: 'pointer', fontWeight: '900', color: 'white',
              backgroundColor: view === 'PROTOCOL' ? '#0052FF' : '#0a1020',
              boxShadow: view === 'PROTOCOL' ? '0 4px 15px rgba(0, 82, 255, 0.3)' : 'none'
            }}
          >
            Protocol Alpha
          </button>
        </div>

        {/* Feed List Restored with Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#475569', padding: '40px' }}>Syncing Basecaster Engine...</p>
          ) : (
            visibleData.map((item) => (
              <a key={item.id} href={item.url} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#0a1020', border: '1px solid #ffffff10', borderRadius: '20px', padding: '24px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0052FF', display: 'block', marginBottom: '10px' }}>
                    {item.author}
                  </span>
                  <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>{item.content}</p>
                </div>
              </a>
            ))
          )}
        </div>

        {/* Footer Restored with ONLY Jowci */}
        <footer style={{ marginTop: '80px', textAlign: 'center', borderTop: '1px solid #ffffff05', paddingTop: '40px', marginBottom: '40px' }}>
          <p style={{ fontSize: '13px', color: '#475569', fontWeight: 'bold' }}>
            Built by <span style={{ color: 'white' }}>Jowci</span>
          </p>
        </footer>

      </div>
    </main>
  );
}
