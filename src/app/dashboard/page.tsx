'use client';
import LogoutButton from '@/components/LogoutButton';
import { useGetMeQuery } from '@/redux/auth/authApi';

export default function DashboardPage() {
  const { data: user, isLoading, isError } = useGetMeQuery(undefined);

  if (isLoading)
    return (
      <div className="grid place-content-center">Loading User Data...</div>
    );

  if (isError || !user)
    return (
      <div className="grid place-content-center">Error Loading Profile</div>
    );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Welcome to CollabSpace Dashboard</h1>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
        <p className="mt-2 text-sm text-gray-600">Role: {user.role}</p>
      </div>
      <LogoutButton />
    </div>
  );
}
