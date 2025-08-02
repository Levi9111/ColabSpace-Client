'use client';

import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useProtectedRoute = () => {
  const token = useAppSelector((state: RootState) => state.auth.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push('/login');
  }, [token, router]);
};
