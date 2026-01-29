import type { Metadata } from 'next';
import { SessionProvider } from './SessionProvider';
import Sidebar from '@/components/Sidebar';
import Navigation from '@/components/Navigation';
import LayoutWrapper from './LayoutWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'CareerCraft - Resume Builder',
  description: 'Build professional resumes and prepare for interviews',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navigation />
          <LayoutWrapper>
            <Sidebar />
            <main className="main-content">
              {children}
            </main>
          </LayoutWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
