'use client';

import { useDispatch } from 'react-redux';
import { clearAccessToken } from '@/redux/auth/authSlice';
import { useRouter } from 'next/navigation';

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearAccessToken());
    router.push('/login');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
}
