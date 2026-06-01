import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import aplusLogo from '../../../imports/A_LogoNoBackground_upscayl_4x_upscayl-standard-4x__1_.svg';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Conceptually sign in, redirecting to admin dashboard
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2A3A53] p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 p-2">
              <ImageWithFallback src={aplusLogo} alt="A+ Solutions Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-[#333333] mb-2">Admin Access</h1>
          <p className="text-center text-gray-500 mb-8">Sign in to manage website content</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2" htmlFor="email">
                Username / Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="admin@aplussolutions.com"
                className="w-full px-4 py-3 bg-white text-[#333333] placeholder-gray-400 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-[#333333]" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-sm text-[#6F67BA] hover:text-[#5d57a0] font-medium">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white text-[#333333] placeholder-gray-400 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent outline-none transition-all pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#6F67BA] hover:bg-[#5d57a0] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 mt-4 shadow-md"
            >
              Sign In
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="w-full bg-transparent border-2 border-[#6F67BA] text-[#6F67BA] hover:bg-[#6F67BA] hover:text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 mt-3"
            >
              Demo Mode (Bypass Login)
            </button>
          </form>
        </div>
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            Secure connection for A+ Solutions administrators only.
          </p>
        </div>
      </div>
    </div>
  );
}