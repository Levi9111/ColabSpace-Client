'use client';

import { useGetMeQuery } from '@/redux/auth/authApi';

export default function DashboardPage() {
  const { data: user, isLoading } = useGetMeQuery(undefined);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold">Welcome, {user?.email}</h2>
      <p className="mt-2 text-sm text-gray-600">Your role: {user?.role}</p>
    </div>
  );
}
