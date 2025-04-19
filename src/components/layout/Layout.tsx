
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  user?: { 
    name: string; 
    role: 'admin' | 'investor';
    id?: string;
  };
  onLogout?: () => void;
}

const Layout = ({ children, user, onLogout }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onLogout={onLogout} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
