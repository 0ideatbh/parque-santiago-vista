
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (data: { name?: string; email: string; password: string }) => void;
  isLoading: boolean;
}

const AuthForm = ({ type, onSubmit, isLoading }: AuthFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'signup' && !name) {
      toast.error('Please enter your name');
      return;
    }
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    
    if (!password) {
      toast.error('Please enter your password');
      return;
    }
    
    onSubmit({ name, email, password });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-realty-blue">
          {type === 'login' ? 'Log In to Your Account' : 'Create Your Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {type === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  placeholder="John Smith"
                  required
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {type === 'login' && (
            <div className="flex items-center justify-end">
              <a href="#" className="text-sm text-realty-blue hover:text-realty-navy">
                Forgot your password?
              </a>
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full bg-realty-blue hover:bg-realty-navy"
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : type === 'login' ? 'Log In' : 'Sign Up'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {type === 'login' ? "Don't have an account? " : "Already have an account? "}
            <Link
              to={type === 'login' ? "/signup" : "/login"}
              className="text-realty-blue hover:text-realty-navy font-semibold"
            >
              {type === 'login' ? 'Sign Up' : 'Log In'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
