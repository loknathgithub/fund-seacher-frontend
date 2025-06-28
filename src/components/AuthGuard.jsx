'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Allow public access to /login and /register
    if (pathname === '/login' || pathname === '/register') {
      setChecked(true);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    } else {
      setChecked(true);
    }
  }, [router, pathname]);

  if (!checked) return null;

  return <>{children}</>;
}
