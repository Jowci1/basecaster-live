'use client';

import { useState, useEffect } from 'react';

// This tells Vercel to fetch fresh data every time someone opens the app
export const revalidate = 0;

/**
 * BASECASTER: Bridging Farcaster Social Drips & Base Protocol Alpha
 * Built by jowci.farcaster.eth
 */

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
        // Fetching live Farcaster casts - adding a timestamp to bypass old cache
        const res = await fetch(`https://searchcaster.xyz/api/search?text=base%20alpha&count=40&t=${Date.now()}`);
        const json = await res.json();
        
        const drips = (json.casts || []).map((c: any) => ({
          id: c.hash,
          category: 'SOCIAL',
          author: `@${c.author.username}`,
          content: c.text,
          // Fixed: This creates a real clickable link to the Warpcast post
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
          { id: 'f1', category: 'SOCIAL', author: '@AlphaSeeker', content: "Check your connection to see live Base Alpha feeds.", url: "https://warpcast.com" },
          { id: 'f2', category: 'SOCIAL', author: '@BaseWhale', content: "Bridge inflows to Base are spiking. View latest on Warpcast.", url: "https://warpcast.com" }
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
          <p style={{ color: '#475569', fontSize: '14px', marginTop: '10px', lineHeight: '1.6', maxWidth: '450px' }}>
            Bridging Farcaster social drips with Base on-chain signals. <br/>
            <strong>Discover the alpha before it hits the charts.</strong>
          </p>
        </header>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <button 
            type="button"
            onClick={() => { setView('SOCIAL'); setDisplayCount(5); }}
            style={{ 
              flex: 1, padding: '16px', borderRadius: '14px', border: 'none', cursor: 'pointer', fontWeight: '900', color: 'white',
              backgroundColor: view === 'SOCIAL' ? '#0052FF' : '#0a1020',
              boxShadow: view === 'SOCIAL' ? '0 4px 15px rgba(0, 82, 255, 0.3)' : 'none',
              transition: '0.2s'
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
              boxShadow: view === 'PROTOCOL' ? '0 4px 15px rgba(0, 82, 255, 0.3)' : 'none',
              transition: '0.2s'
            }}
          >
            Protocol Alpha
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#475569', padding: '40px' }}>Syncing Basecaster Engine...</p>
          ) : (
            visibleData.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#0a1020', border: '1px solid #ffffff10', borderRadius: '20px', padding: '24px', transition: '0.2s' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0052FF', display: 'block', marginBottom: '10px' }}>
                    {item.author}
                  </span>
                  <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>{item.content}</p>
                  <span style={{ fontSize: '11px', color: '#475569', display: 'block', marginTop: '12px' }}>Click to view on Warpcast →</span>
                </div>
              </a>
            ))
          )}
        </div>

        {!loading && filteredData.length > displayCount && (
          <button 
            type="button"
            onClick={() => setDisplayCount(prev => prev + 5)}
            style={{ width: '100%', marginTop: '30px', padding: '18px', borderRadius: '14px', backgroundColor: 'transparent', border: '1px solid #ffffff15', color: '#94a3b8', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Load More Alphas
          </button>
        )}

        <footer style={{ marginTop: '80px', textAlign: 'center', borderTop: '1px solid #ffffff05', paddingTop: '40px', marginBottom: '40px' }}>
          <p style={{ fontSize: '13px', color: '#475569', fontWeight: 'bold' }}>
            {/* Fixed: Removed the clickable link and wallet redirect */}
            Built by <span style={{ color: 'white' }}>{jowciDisplay}</span>
          </p>
        </footer>

      </div>
    </main>
  );
}
