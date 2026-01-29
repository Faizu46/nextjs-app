'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  // Hide sidebar on home and resume-builder pages
  const isHomePage = pathname === '/';
  const isResumeBuilder = pathname === '/resume-builder';
  const showSidebar = session && !isHomePage && !isResumeBuilder;

  return (
    <div className={showSidebar ? 'with-sidebar' : 'without-sidebar'}>
      {children}
    </div>
  );
}
