'use client';

import { useLogoutMutation } from '@/redux/auth/authApi';
import { clearAccessToken } from '@/redux/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
    } catch {
      console.warn('Logout API call failed');
    } finally {
      dispatch(clearAccessToken());
      router.push('/login');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
