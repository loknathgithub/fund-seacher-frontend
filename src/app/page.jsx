'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthGuard from '@/components/AuthGuard';
import FundCard from '@/components/FundCard';

function LandingPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();

  setHasSearched(true);
  setResults([]);
  setError('');
  if (!query.trim()) return;

  setLoading(true);

  try {
    const res = await fetch(`https://api.mfapi.in/mf/search?q=${encodeURIComponent(query.trim())}`);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    setResults(Array.isArray(data) ? data : []);
  } catch (err) {
    setError('Failed to fetch results. Please try again.');
  }

  setLoading(false);
};



  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-background">
      <Card className="w-full max-w-md p-6 mx-auto">
        <h1 className="mb-6 text-2xl font-bold text-center sm:text-3xl">
          Mutual Fund Searcher
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="Search mutual funds by name or code..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="text-base sm:text-lg"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </form>
      </Card>

      {/* Results Section */}
      <div className="w-full max-w-2xl mt-8">
        {error && (
          <div className="py-4 text-center text-red-500">{error}</div>
        )}
        {loading && (
          <div className="py-8 text-center">
            <span className="inline-block w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></span>
          </div>
        )}
        {!loading && !error && query && (
          results.length === 0 && hasSearched ? (
            <div className="py-4 text-center text-muted-foreground">
              No results found.
            </div>
          ) : (
          results.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {results.map((fund) => {
                const { fund_house, scheme_type, scheme_category, ...filteredFund } = fund;
              return (
                <FundCard
                  key={fund.schemeCode}
                  fund={filteredFund}
                  onClick={() => router.push(`/funds/${fund.schemeCode}`)}
                />
          );
        })}
      </div>
    )
  )
)}

      </div>
    </main>
  );
}

export default function ProtectedLandingPage() {
  return (
    <AuthGuard>
      <LandingPage />
    </AuthGuard>
  );
}
