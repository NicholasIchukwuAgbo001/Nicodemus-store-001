import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Eye, EyeOff, Sparkles, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode, 
    login, 
    register, 
    showToast 
  } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Missing Credentials', 'Please enter your email and password.', 'warning');
      return;
    }
    const success = login(email, password);
    if (success) {
      setIsAuthModalOpen(false);
      setEmail('');
      setPassword('');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !firstName || !lastName) {
      showToast('Incomplete Form', 'Please provide all registration details.', 'warning');
      return;
    }
    const success = register({
      firstName,
      lastName,
      email,
      phone: phone || '+1 (555) 000-0000',
    });
    if (success) {
      setIsAuthModalOpen(false);
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setPhone('');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Enter Email', 'Please provide your registered email address.', 'warning');
      return;
    }
    setResetSent(true);
    showToast('Reset Instructions Dispatched', 'Password reset instructions have been forwarded to your email.', 'success');
  };

  const fillDemoAccount = () => {
    setEmail('sophia.vandermeer@fashionatelier.com');
    setPassword('secret123');
    showToast('Demo Credentials Filled', 'Click "Sign In" to access Sophia Vandermeer\'s account.', 'info');
  };

  return (
    <AnimatePresence>
      <div id="auth-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthModalOpen(false)}
          className="fixed inset-0 bg-[#141312]/65 backdrop-blur-xs"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-[#FAF8F5] rounded-lg shadow-2xl max-w-md w-full p-6 sm:p-8 z-10 border border-[#E8E2DA]"
        >
          {/* Close button */}
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 p-1.5 text-[#7D7771] hover:text-[#181716] rounded-full hover:bg-[#F2ECE3] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-6">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8F683D]">
              NICODEMUS 001 Privé
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#181716] font-normal mt-1">
              {authModalMode === 'login' && 'CLIENT SIGN IN'}
              {authModalMode === 'register' && 'CREATE CLIENT ACCOUNT'}
              {authModalMode === 'forgot' && 'PASSWORD RECOVERY'}
            </h3>
            <p className="text-xs text-[#7D7771] mt-1.5">
              {authModalMode === 'login' && 'Access your order dossiers, saved items, and Privé tier privileges.'}
              {authModalMode === 'register' && 'Join our inner circle for bespoke allocations and seasonal previews.'}
              {authModalMode === 'forgot' && 'Enter your email to receive recovery instructions.'}
            </p>
          </div>

          {/* LOGIN FORM */}
          {authModalMode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@domain.com"
                  required
                  className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="uppercase tracking-wider text-[#7D7771]">Password</label>
                  <button
                    type="button"
                    onClick={() => setAuthModalMode('forgot')}
                    className="text-[#8F683D] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 pr-10 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7D7771] hover:text-[#181716] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                id="auth-submit-login-btn"
                type="submit"
                className="w-full bg-[#181716] hover:bg-[#34302C] text-[#FAF8F5] py-3.5 px-4 rounded-sm font-semibold uppercase tracking-[0.2em] transition-colors shadow-sm mt-2 cursor-pointer"
              >
                Sign In
              </button>

              {/* Quick Demo Fill button */}
              <button
                type="button"
                onClick={fillDemoAccount}
                className="w-full bg-[#F2EDE5] hover:bg-[#EAE4DB] text-[#8F683D] py-2.5 px-4 rounded-sm text-[11px] font-semibold uppercase tracking-wider transition-colors border border-[#E0D8CC] cursor-pointer"
              >
                Auto-Fill Demo VIP Account
              </button>

              <div className="pt-4 border-t border-[#E8E2DA] text-center text-xs text-[#7D7771]">
                New to the Maison?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('register')}
                  className="font-semibold text-[#181716] underline cursor-pointer"
                >
                  Create an account
                </button>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {authModalMode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase tracking-wider text-[#7D7771] mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@domain.com"
                  required
                  className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Create Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                    minLength={6}
                    className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 pr-10 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7D7771] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#181716] hover:bg-[#34302C] text-[#FAF8F5] py-3.5 px-4 rounded-sm font-semibold uppercase tracking-[0.2em] transition-colors shadow-sm mt-2 cursor-pointer"
              >
                Create Account
              </button>

              <div className="pt-4 border-t border-[#E8E2DA] text-center text-xs text-[#7D7771]">
                Already have a membership?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  className="font-semibold text-[#181716] underline cursor-pointer"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {authModalMode === 'forgot' && (
            <div className="space-y-4 text-xs">
              {resetSent ? (
                <div className="p-4 bg-[#EAF2EC] text-[#2C5234] rounded-sm text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 mx-auto text-[#355E3B]" />
                  <p className="font-semibold">Reset Link Sent</p>
                  <p className="text-[11px]">We have emailed recovery instructions to {email}.</p>
                  <button
                    onClick={() => {
                      setResetSent(false);
                      setAuthModalMode('login');
                    }}
                    className="mt-2 text-xs font-semibold underline text-[#181716] block mx-auto cursor-pointer"
                  >
                    Return to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@domain.com"
                      required
                      className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#181716] text-[#FAF8F5] py-3.5 px-4 rounded-sm font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer"
                  >
                    Send Recovery Link
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthModalMode('login')}
                    className="w-full text-center text-xs text-[#7D7771] hover:text-[#181716] py-1 underline cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </form>
              )}
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
