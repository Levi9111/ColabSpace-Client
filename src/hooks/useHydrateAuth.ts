'use client';

import axios from '@/lib/axios';
import { setAccessToken } from '@/redux/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect } from 'react';

export const useHydrateAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const refresh = async () => {
      try {
        const result = await axios.get('/auth/login/refresh-token', {
          withCredentials: true,
        });
        console.log('Hydration Hook Result ' + result);
        dispatch(setAccessToken(result.data.accessToken));
      } catch {
        console.log('Session expired or not logged in');
      }
    };

    refresh();
  }, [dispatch]);
};
