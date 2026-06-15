import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import aplusLogo from "../../../imports/A__logo.png";

// IMPORTANT: Update this import path to point to your actual NSwag generated API client file
import { Client, LoginRequest } from "../../../api/api-client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Initialize your NSwag API Client (adjust baseUrl if needed)
      // If you have a global API URL configured, use that instead of hardcoding localhost
      const apiClient = new Client("https://localhost:5001");

      // 2. Prepare the request body as a plain object matching the LoginRequest type
      const loginData: LoginRequest = {
        email: email,
        password: password,
      };

      // 3. Call your ASP.NET backend
      // We cast this to 'any' temporarily because NSwag generated it as a 'void' return type.
      // Update your backend AuthController to return Task<ActionResult<AuthResponse>> to fix this permanently!
      const response = (await apiClient.login(loginData)) as any;

      // 4. Save the tokens to LocalStorage so the browser remembers who is logged in!
      localStorage.setItem("accessToken", response.accessToken);
      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }

      // 5. Navigate to the secure admin dashboard
      navigate("/admin");
    } catch (err: any) {
      console.error("Login failed:", err);
      // If the backend returns a 401 Unauthorized, we show a clean error message
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            {/* Error Banner */}
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 border border-red-100">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div>
              <label
                className="block text-sm font-bold text-[#2A3A53] mb-1.5"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aplussolutions.com"
                className="w-full px-4 py-3.5 bg-gray-50 text-[#2A3A53] placeholder-gray-400 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#6F67BA]/20 focus:border-[#6F67BA] outline-none transition-all font-medium"
                required
                disabled={isLoading}
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
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-gray-50 text-[#2A3A53] placeholder-gray-400 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#6F67BA]/20 focus:border-[#6F67BA] outline-none transition-all font-medium pr-12"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6F67BA] transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#6F67BA] hover:bg-[#5a529e] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md shadow-[#6F67BA]/20 active:scale-[0.98] flex justify-center items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ShieldCheck size={18} />
                )}
                {isLoading ? "Authenticating..." : "Secure Sign In"}
              </button>
            </div>
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
