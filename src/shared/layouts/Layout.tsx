import React from 'react';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
