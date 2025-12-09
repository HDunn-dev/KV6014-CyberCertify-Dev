// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Auto-login to dashboard (for demo purposes)
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-cyber-border py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-cyber-blue rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="text-xl font-semibold text-cyber-dark">CyberCertify</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-cyber-blue">Dashboard</a>
            <a href="#" className="hover:text-cyber-blue">Courses</a>
            <a href="#" className="hover:text-cyber-blue">Certificates</a>
            <a href="#" className="hover:text-cyber-blue">Profile</a>
          </div>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigate('/register'); }}
            className="px-4 py-2 text-sm border border-cyber-border rounded-lg hover:bg-gray-50"
          >
            Sign up
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-cyber-border">
            <h1 className="text-2xl font-bold text-center mb-2 text-cyber-dark">Sign In</h1>
            <p className="text-center text-gray-500 mb-8">Welcome Back! Please sign in to your account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-cyber-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-cyber-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xl"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-cyber-blue rounded" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-cyber-blue hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-cyber-blue text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-sm"
              >
                Continue
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-600 pt-4">
                Don't have an account?{' '}
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); navigate('/register'); }}
                  className="text-cyber-blue hover:underline font-medium"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-cyber-border py-4 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500 flex justify-center gap-6">
          <a href="#" className="hover:text-cyber-blue">Privacy Policy</a>
          <a href="#" className="hover:text-cyber-blue">Terms of Service</a>
          <a href="#" className="hover:text-cyber-blue">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;