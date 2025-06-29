'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { register } from '@/utils/api';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const data = await register(username, password);

    if (data.message === 'User registered successfully') {
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } else {
      setError(data.error || data.message || 'Registration failed');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-background">
      <Card className="w-full max-w-sm p-6 mx-auto">
        <h2 className="mb-4 text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Username (must be unique)"
            value={username}
            onChange={e => setUsername(e.target.value)}
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
          {success && <div className="text-sm text-green-600">{success}</div>}
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </main>
  );
}
