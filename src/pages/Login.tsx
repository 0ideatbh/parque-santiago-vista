
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AuthForm from '../components/auth/AuthForm';
import Layout from '../components/layout/Layout';
import { mockUsers } from '../data/mockData';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    
    // Simulate authentication with Supabase
    setTimeout(() => {
      const matchingUser = mockUsers.find(user => user.email.toLowerCase() === data.email.toLowerCase());
      
      if (matchingUser) {
        localStorage.setItem('currentUser', JSON.stringify(matchingUser));
        toast.success('Logged in successfully!');
        
        // Redirect based on user role
        if (matchingUser.role === 'admin') {
          navigate('/admin');
        } else if (matchingUser.role === 'investor') {
          navigate('/investor');
        } else {
          navigate('/');
        }
      } else {
        toast.error('Invalid email or password. Please try again.');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
        <h1 className="text-3xl font-bold text-realty-blue mb-8">Kristian's Parque Santiago Realty</h1>
        <AuthForm type="login" onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default Login;
