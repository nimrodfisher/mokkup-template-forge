import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Linkedin } from 'lucide-react';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/editor';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await signIn(email, password);
    if (!error) {
      navigate(from, { replace: true });
    }
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const companyName = formData.get('companyName') as string;

    const { error } = await signUp(email, password, {
      first_name: firstName,
      last_name: lastName,
      company_name: companyName,
    });
    
    if (!error) {
      setIsSignUp(false);
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://gvovhdgpgfxlmzckxtvd.supabase.co/auth/v1/callback'
      }
    });
    if (error) {
      console.error('Google sign in error:', error);
    }
  };

  const handleLinkedInSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: {
        redirectTo: 'https://gvovhdgpgfxlmzckxtvd.supabase.co/auth/v1/callback'
      }
    });
    if (error) {
      console.error('LinkedIn sign in error:', error);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      {/* Header */}
      <header className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="font-bold text-xl text-white">Alignify</span>
        </Link>
      </header>

      {/* Auth Form */}
      <div className="flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isSignUp ? 'SIGN UP' : 'SIGN IN'}
            </h1>
            <p className="text-gray-300">
              {isSignUp ? 'Sign up with email address' : 'Sign in with email address'}
            </p>
          </div>

          {!isSignUp ? (
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Yourname@gmail.com"
                    required
                    className="pl-12 h-14 bg-gray-800/50 border-2 border-purple-500/30 rounded-full text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-0"
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</div>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password (min 8 characters)"
                    required
                    className="pl-12 h-14 bg-gray-800/50 border-2 border-purple-500/30 rounded-full text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-0"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full text-lg" 
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                SignIn
              </Button>
              
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-4">or continue with →</p>
                <div className="space-y-3">
                  <Button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full h-12 bg-gray-800/50 hover:bg-gray-700/50 border-2 border-purple-500/30 rounded-full text-white font-medium"
                  >
                    <span className="mr-3">🌐</span>
                    Google
                  </Button>
                  <Button
                    type="button"
                    onClick={handleLinkedInSignIn}
                    className="w-full h-12 bg-gray-800/50 hover:bg-gray-700/50 border-2 border-purple-500/30 rounded-full text-white font-medium"
                  >
                    <Linkedin className="mr-3 h-4 w-4" />
                    LinkedIn
                  </Button>
                </div>
              </div>

              <div className="text-center space-y-2">
                <button
                  type="button"
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  Forgot Password?
                </button>
                <p className="text-gray-400 text-sm">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-purple-400 hover:text-purple-300 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    required
                    className="h-12 bg-gray-800/50 border-2 border-purple-500/30 rounded-full text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-0"
                  />
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    required
                    className="h-12 bg-gray-800/50 border-2 border-purple-500/30 rounded-full text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-0"
                  />
                </div>
                <Input
                  name="companyName"
                  placeholder="Company Name (Optional)"
                  className="h-12 bg-gray-800/50 border-2 border-purple-500/30 rounded-full text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-0"
                />
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Yourname@gmail.com"
                    required
                    className="pl-12 h-14 bg-gray-800/50 border-2 border-purple-500/30 rounded-full text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-0"
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</div>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password (min 8 character)"
                    required
                    className="pl-12 h-14 bg-gray-800/50 border-2 border-purple-500/30 rounded-full text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-0"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full text-lg" 
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Continue
              </Button>
              
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-4">or continue with →</p>
                <div className="space-y-3">
                  <Button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full h-12 bg-gray-800/50 hover:bg-gray-700/50 border-2 border-purple-500/30 rounded-full text-white font-medium"
                  >
                    <span className="mr-3">🌐</span>
                    Google
                  </Button>
                  <Button
                    type="button"
                    onClick={handleLinkedInSignIn}
                    className="w-full h-12 bg-gray-800/50 hover:bg-gray-700/50 border-2 border-purple-500/30 rounded-full text-white font-medium"
                  >
                    <Linkedin className="mr-3 h-4 w-4" />
                    LinkedIn
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-400 mb-4">
                  By registering, you agree to our <span className="text-purple-400">Terms</span> and <span className="text-purple-400">Privacy Policy</span>
                </p>
                <p className="text-gray-400 text-sm">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-purple-400 hover:text-purple-300 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
