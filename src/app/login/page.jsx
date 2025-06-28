'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { login } from '@/utils/api';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const data = await login(name, password);
    if (data.token) {
      localStorage.setItem('token', data.token);
      router.push('/');
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-background">
      <Card className="w-full max-w-sm p-6 mx-auto">
        <h2 className="mb-4 text-2xl font-bold text-center">Login to continue!</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            type="name"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-sm text-red-500">{error}</div>}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </Card>
    </main>
  );
}
