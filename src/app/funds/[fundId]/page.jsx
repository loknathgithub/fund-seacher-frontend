'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import FundInfo from '@/components/FundInfo';
import { Button } from '@/components/ui/button';
import { saveFund, getSavedFunds } from '@/utils/api';
import NavBar from '@/components/NavBar';

export default function FundDetailPage() {
  const { fundId } = useParams();

  const [meta, setMeta] = useState(null);
  const [nav, setNav] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!fundId) {
      setError('No fund code provided.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    fetch(`https://api.mfapi.in/mf/${fundId}/latest`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch fund details');
        return res.json();
      })
      .then(data => {
        if (data.status === "SUCCESS" && data.meta) {
          setMeta(data.meta);
          setNav(data.data && data.data.length > 0 ? data.data[0] : null);
        } else {
          setError('No details found for this fund.');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Could not fetch fund details. Please try again.');
        setLoading(false);
        console.error('Fetch error:', err);
      });
  }, [fundId]);

  useEffect(() => {
    if (!fundId) return;
    getSavedFunds()
      .then(ids => {
        setSaved(Array.isArray(ids) && ids.includes(fundId));
      })
      .catch(() => setSaved(false));
  }, [fundId]);

  const handleSave = async () => {
    console.log("fundId from useParams:", fundId);
    setSaving(true);
    const res = await saveFund(fundId);
    console.log("Save API response:", res);
    if (res && (res.message === 'Fund saved' || res.success)) {
      setSaved(true);
    } else {
      // Optionally handle error (show a toast, etc.)
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <span className="inline-block w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></span>
        <div className="mt-2 text-muted-foreground">Loading details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!meta) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-muted-foreground">No details found for this fund.</div>
      </div>
    );
  }

  return (
    <>
    <NavBar/>
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-background">
      <div className="w-full max-w-lg mx-auto">
        <FundInfo
          fund={meta}
          nav={nav}
          actions={
            saved ? (
              <Button className="text-green-700 bg-green-100 cursor-default" disabled>
                Saved
              </Button>
            ) : (
              <Button className="text-white bg-blue-600" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </Button>
            )
          }
        />
      </div>
    </main>
    </>
      );
}
