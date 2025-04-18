
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AuthForm from '../components/auth/AuthForm';
import Layout from '../components/layout/Layout';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSignup = async (data: { name?: string; email: string; password: string }) => {
    setIsLoading(true);
    
    // Simulate registration with Supabase
    setTimeout(() => {
      toast.success('Account created successfully! Please log in.');
      navigate('/login');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
        <h1 className="text-3xl font-bold text-realty-blue mb-8">Kristian's Parque Santiago Realty</h1>
        <AuthForm type="signup" onSubmit={handleSignup} isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default Signup;
