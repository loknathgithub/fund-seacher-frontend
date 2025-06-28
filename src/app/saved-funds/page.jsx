'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AuthGuard from '@/components/AuthGuard';
import { getSavedFunds, removeFund } from '@/utils/api';

export default function SavedFundsPage() {
  const [fundIds, setFundIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      setError('You must be logged in to view saved funds.');
      return;
    }
    getSavedFunds()
      .then((data) => {
        const ids = data.savedFunds;
        setFundIds(Array.isArray(ids) ? ids : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load saved funds.');
        setLoading(false);
      });
  }, []);

  // Remove fund logic
  const handleRemove = async (fundId) => {
    setRemoving(fundId);
    const data = await removeFund(fundId);
    if (data.success) {
      setFundIds(fundIds.filter(id => id !== fundId));
    }
    setRemoving(null);
  };

  return (
    <AuthGuard>
      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-background">
        <h2 className="mb-4 text-xl font-bold text-center sm:text-2xl">Your Saved Mutual Funds</h2>
        {loading ? (
          <div className="py-8 text-center">
            <span className="inline-block w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></span>
            <div className="mt-2 text-muted-foreground">Loading...</div>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-red-500">{error}</div>
        ) : fundIds.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">No saved funds.</div>
        ) : (
          <div className="grid max-w-4xl gap-4 mx-auto sm:grid-cols-2 md:grid-cols-3">
            {fundIds.map(fundId => (
              <Card key={fundId} className="flex flex-col justify-between p-4">
                <div>
                  <div className="font-semibold">Fund Code: {fundId}</div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link href={`/funds/${fundId}`}>
                    <Button className="text-white bg-blue-600">View Details</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    disabled={removing === fundId}
                    onClick={() => handleRemove(fundId)}
                  >
                    {removing === fundId ? 'Removing...' : 'Remove'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </AuthGuard>
  );
}
