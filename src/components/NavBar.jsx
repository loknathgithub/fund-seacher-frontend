// components/NavBar.jsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide navbar on login/register pages
  if (pathname === '/login' || pathname === '/register') return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="w-full border-b h-14 bg-background">
      <div className="flex items-center justify-between max-w-screen-lg px-2 mx-auto h-14 sm:px-4">
        {/* Left: App Name */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-lg font-bold tracking-tight">
            MFS
          </Link>
        </div>
        {/* Right: Buttons */}
        <div className="flex gap-2">
          <Link href="/saved-funds">
            <Button variant="outline" className="font-medium">
              Saved Funds
            </Button>
          </Link>
          <Button variant="destructive" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </nav>
  );
}
