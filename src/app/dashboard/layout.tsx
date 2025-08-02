'use client';

import { useHydrateAuth } from '@/hooks/useHydrateAuth';
import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  useHydrateAuth();
  return <>{children}</>;
};

export default DashboardLayout;
