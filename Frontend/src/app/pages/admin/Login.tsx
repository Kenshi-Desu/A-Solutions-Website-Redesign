import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import aplusLogo from "../../../imports/A__logo.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Conceptually sign in, redirecting to admin dashboard
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7f9] p-4 relative font-sans overflow-hidden">
      {/* Abstract decorative backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#6F67BA]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#E37F4E]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full max-w-md overflow-hidden relative z-10">
        <div className="p-8 sm:p-10">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-sm p-3 mb-4">
              <ImageWithFallback
                src={aplusLogo}
                alt="A+ Solutions Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-extrabold text-[#2A3A53] tracking-tight mb-1">
              Welcome Back
            </h1>
            <p className="text-sm font-medium text-gray-400">
              Sign in to manage your workspace
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                className="block text-sm font-bold text-[#2A3A53] mb-1.5"
                htmlFor="email"
              >
                Username / Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="admin@aplussolutions.com"
                className="w-full px-4 py-3.5 bg-gray-50 text-[#2A3A53] placeholder-gray-400 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#6F67BA]/20 focus:border-[#6F67BA] outline-none transition-all font-medium"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  className="block text-sm font-bold text-[#2A3A53]"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-[#6F67BA] hover:text-[#5a529e] font-bold transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-gray-50 text-[#2A3A53] placeholder-gray-400 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#6F67BA]/20 focus:border-[#6F67BA] outline-none transition-all font-medium pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6F67BA] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#6F67BA] hover:bg-[#5a529e] text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md shadow-[#6F67BA]/20 active:scale-[0.98] flex justify-center items-center gap-2"
              >
                <ShieldCheck size={18} />
                Secure Sign In
              </button>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider">
                Development
              </span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="w-full bg-[#E37F4E]/10 hover:bg-[#E37F4E]/20 text-[#E37F4E] font-bold py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98]"
            >
              Demo Mode (Bypass Login)
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50/80 px-8 py-5 border-t border-gray-100 flex items-center justify-center">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
            A+ Solutions Admin Control Panel
          </p>
        </div>
      </div>
    </div>
  );
}
