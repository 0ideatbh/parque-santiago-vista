
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from '../components/layout/Layout';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <h1 className="text-6xl font-bold text-realty-blue mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <p className="text-gray-500 max-w-md text-center mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-realty-blue hover:bg-realty-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-realty-blue"
        >
          Return to Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
