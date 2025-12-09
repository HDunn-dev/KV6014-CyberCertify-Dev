// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationId: '',
    twoFactorMethod: 'authenticator',
    verificationCode: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Password strength calculation
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    
    if (strength <= 25) return { strength, label: 'Too short', color: 'bg-red-500' };
    if (strength <= 50) return { strength, label: 'Weak', color: 'bg-orange-500' };
    if (strength <= 75) return { strength, label: 'Good', color: 'bg-yellow-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNextStep = () => {
    if (currentStep === 3) {
      // Complete registration - redirect to dashboard
      navigate('/dashboard');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.fullName && formData.email && formData.password && 
             formData.confirmPassword && formData.password === formData.confirmPassword &&
             formData.password.length >= 8 && agreeTerms;
    }
    if (currentStep === 2) {
      return formData.verificationId.length > 0;
    }
    if (currentStep === 3) {
      return formData.verificationCode.length === 6;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-cyber-blue rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="text-xl font-semibold text-cyber-dark">CyberCertify</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Already have an account?</span>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Log in
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Registration Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h1 className="text-3xl font-bold text-center mb-2 text-cyber-dark">Sign Up</h1>
            <p className="text-center text-gray-600 mb-8">Start your cybersecurity certification journey</p>

            {/* Step Indicators */}
            <div className="flex items-center justify-center mb-8">
              {/* Step 1 */}
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= 1 ? 'bg-cyber-dark text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <div className="ml-2 text-sm">
                  <div className={`font-medium ${currentStep === 1 ? 'text-cyber-dark' : 'text-gray-500'}`}>
                    Basic Information
                  </div>
                  {currentStep === 1 && <div className="h-0.5 bg-cyber-dark w-24 mt-1"></div>}
                </div>
              </div>

              <div className={`w-12 h-0.5 mx-2 ${currentStep > 1 ? 'bg-cyber-dark' : 'bg-gray-300'}`}></div>

              {/* Step 2 */}
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= 2 ? 'bg-cyber-dark text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <div className="ml-2 text-sm">
                  <div className={`font-medium ${currentStep === 2 ? 'text-cyber-dark' : 'text-gray-500'}`}>
                    Identity Verification
                  </div>
                  {currentStep === 2 && <div className="h-0.5 bg-cyber-dark w-24 mt-1"></div>}
                </div>
              </div>

              <div className={`w-12 h-0.5 mx-2 ${currentStep > 2 ? 'bg-cyber-dark' : 'bg-gray-300'}`}></div>

              {/* Step 3 */}
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= 3 ? 'bg-cyber-dark text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
                <div className="ml-2 text-sm">
                  <div className={`font-medium ${currentStep === 3 ? 'text-cyber-dark' : 'text-gray-500'}`}>
                    Two-Factor Auth
                  </div>
                  {currentStep === 3 && <div className="h-0.5 bg-cyber-dark w-24 mt-1"></div>}
                </div>
              </div>
            </div>

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xl"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        <div className={`h-1 flex-1 rounded ${passwordStrength.strength >= 25 ? passwordStrength.color : 'bg-gray-200'}`}></div>
                        <div className={`h-1 flex-1 rounded ${passwordStrength.strength >= 50 ? passwordStrength.color : 'bg-gray-200'}`}></div>
                        <div className={`h-1 flex-1 rounded ${passwordStrength.strength >= 75 ? passwordStrength.color : 'bg-gray-200'}`}></div>
                        <div className={`h-1 flex-1 rounded ${passwordStrength.strength >= 100 ? passwordStrength.color : 'bg-gray-200'}`}></div>
                      </div>
                      <p className="text-xs text-gray-500">Password strength: {passwordStrength.label}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                  />
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                  )}
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5"
                  />
                  <label className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-cyber-blue hover:underline">Terms & Conditions</a>
                    {' '}and{' '}
                    <a href="#" className="text-cyber-blue hover:underline">Privacy Policy</a>
                    <span className="text-red-500">*</span>
                  </label>
                </div>

                <p className="text-xs text-center text-gray-500 pt-2">Step 1 of 3</p>
              </div>
            )}

            {/* Step 2: Identity Verification */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Identity Verification</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Enter the Verification ID you received from [Partner Name] to ensure your certifications are tied to your verified identity
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verification ID
                  </label>
                  <input
                    type="text"
                    value={formData.verificationId}
                    onChange={(e) => handleInputChange('verificationId', e.target.value)}
                    placeholder="Enter your verified User ID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                  />
                  <a href="#" className="text-sm text-cyber-blue hover:underline mt-2 inline-block">
                    Don't have verification ID?
                  </a>
                </div>

                <button
                  onClick={() => handleInputChange('verificationId', 'VER-2025-12345')}
                  className="w-full py-2 text-sm border border-dashed border-gray-400 rounded-lg hover:bg-gray-50 text-gray-600"
                >
                  Auto-fill demo ID (for testing)
                </button>

                <p className="text-xs text-center text-gray-500 pt-2">Step 2 of 3</p>
              </div>
            )}

            {/* Step 3: Two-Factor Authentication */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-6">Choose 2FA Method</h2>
                </div>

                {/* 2FA Method Selection */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleInputChange('twoFactorMethod', 'authenticator')}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.twoFactorMethod === 'authenticator'
                        ? 'border-cyber-blue bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.twoFactorMethod === 'authenticator' ? 'border-cyber-blue' : 'border-gray-400'
                      }`}>
                        {formData.twoFactorMethod === 'authenticator' && (
                          <div className="w-3 h-3 rounded-full bg-cyber-blue"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">Authenticator App</div>
                        <div className="text-sm text-gray-600">Use Google Authenticator similar apps</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleInputChange('twoFactorMethod', 'sms')}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.twoFactorMethod === 'sms'
                        ? 'border-cyber-blue bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.twoFactorMethod === 'sms' ? 'border-cyber-blue' : 'border-gray-400'
                      }`}>
                        {formData.twoFactorMethod === 'sms' && (
                          <div className="w-3 h-3 rounded-full bg-cyber-blue"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">SMS Verification</div>
                        <div className="text-sm text-gray-600">Receive codes via text message</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleInputChange('twoFactorMethod', 'email')}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.twoFactorMethod === 'email'
                        ? 'border-cyber-blue bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.twoFactorMethod === 'email' ? 'border-cyber-blue' : 'border-gray-400'
                      }`}>
                        {formData.twoFactorMethod === 'email' && (
                          <div className="w-3 h-3 rounded-full bg-cyber-blue"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">Email Verification</div>
                        <div className="text-sm text-gray-600">Receive codes via email</div>
                      </div>
                    </div>
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verification ID
                  </label>
                  <input
                    type="text"
                    value={formData.verificationCode}
                    onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue text-center text-2xl tracking-widest"
                  />
                </div>

                <button
                  onClick={() => handleInputChange('verificationCode', '123456')}
                  className="w-full py-2 text-sm border border-dashed border-gray-400 rounded-lg hover:bg-gray-50 text-gray-600"
                >
                  Auto-fill code (for testing)
                </button>

                <p className="text-xs text-center text-gray-500 pt-2">Step 3 of 3</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNextStep}
                disabled={!canProceed()}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  canProceed()
                    ? 'bg-cyber-dark text-white hover:bg-opacity-90'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentStep === 3 ? 'Complete Setup' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500 flex justify-center gap-6">
          <a href="#" className="hover:text-cyber-blue">Privacy Policy</a>
          <a href="#" className="hover:text-cyber-blue">Terms of Service</a>
          <a href="#" className="hover:text-cyber-blue">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default RegisterPage;