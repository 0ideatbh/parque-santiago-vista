
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  user?: {
    name: string;
    role: 'admin' | 'investor';
  } | null;
  onLogout?: () => void;
}

const Layout = ({ children, user, onLogout }: LayoutProps) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar user={user} onLogout={onLogout} />}
      <main className="flex-grow">{children}</main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;
