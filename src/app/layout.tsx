import type { Metadata } from 'next';
import '../styles/globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Bihar Political Demography Dashboard',
  description: 'Comprehensive analysis of Bihar elections, caste demographics, and political trends.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <div className="app-bg-mesh"></div>
        <div className="app-layout">
          <Sidebar />
          <main className="app-content">
            <Header />
            <div className="app-main">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
