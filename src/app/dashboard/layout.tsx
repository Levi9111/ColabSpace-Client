'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useHydrateAuth } from '@/hooks/useHydrateAuth';
import { ReactNode } from 'react';

const DashboardLayoutShell = ({ children }: { children: ReactNode }) => {
  useHydrateAuth();
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardLayoutShell;
