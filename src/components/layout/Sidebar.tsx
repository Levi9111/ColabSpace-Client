'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', label: 'Home' },
  { href: '/dashboard/projects', label: 'Projects' },
  { href: '/dashboard/teams', label: 'Teams' },
  { href: '/dashboard/messages', label: 'Messages' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-64 border-r bg-white shadow-md hidden md:block">
      <div className="p-4 text-lg font-bold border-b">CollabSpace</div>
      <nav className="flex flex-col p-4 space-y-2">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-3 py-2 rounded ${
              pathname === href
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
