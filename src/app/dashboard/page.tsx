import LogoutButton from '@/components/LogoutButton';

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Welcome to CollabSpace Dashboard</h1>
      <LogoutButton />
    </div>
  );
}
