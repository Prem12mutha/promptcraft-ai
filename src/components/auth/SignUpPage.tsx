/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, AlertCircle, Loader2, Sun, Moon } from 'lucide-react';
import { PromptCraftLogoIcon } from '../Doodles.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { useTheme } from '../../lib/useTheme.ts';

interface SignUpPageProps {
  onNavigate: (route: string) => void;
}

const POSE_2_ASSET = {
  src: '/assets/astronaut_pose2.png',
  fallback:
    'https://cdn.21st.dev/assets/mirror/c7/c7cb3a073970aa03472c652391db88fbbe39f1e33c8deb336a9c8e53b039ee01.png',
  alt: 'PromptCraft AI Astronaut drifting in cosmic space',
};

export const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate }) => {
  const { user, signUp, signInWithGoogle, isConfigured } = useAuth();
  const { isDark, toggleTheme } = useTheme('dark');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Notice if redirected from attempting to use a tool
  const [redirectNotice] = useState<string | null>(() => {
    const dest = sessionStorage.getItem('promptcraft_redirect_to');
    if (dest) {
      if (dest.includes('builder')) return 'Create an account to start using the Prompt Builder.';
      if (dest.includes('image')) return 'Create an account to start using Image to Prompt.';
      if (dest.includes('improver')) return 'Create an account to start using Prompt Improver.';
      return 'Please sign in or create an account before using PromptCraft AI tools.';
    }
    return null;
  });

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {
      fullName?: string;
      email?: string;
      password?: string;
      general?: string;
    } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!validateEmail(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Please enter a password.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const res = await signUp(fullName.trim(), email.trim(), password);
      setIsSubmitting(false);

      if (res.error) {
        setErrors({ general: res.error.message });
      } else {
        const dest = sessionStorage.getItem('promptcraft_redirect_to') || '/prompt-builder';
        sessionStorage.removeItem('promptcraft_redirect_to');
        onNavigate(dest);
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrors({ general: err.message || 'An error occurred during account creation.' });
    }
  };

  const handleGoogleSignIn = async () => {
    setErrors({});
    setIsSubmitting(true);
    try {
      const res = await signInWithGoogle();
      setIsSubmitting(false);
      if (res.error) {
        setErrors({ general: res.error.message });
      } else {
        const dest = sessionStorage.getItem('promptcraft_redirect_to') || '/prompt-builder';
        sessionStorage.removeItem('promptcraft_redirect_to');
        onNavigate(dest);
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrors({ general: err.message || 'Google sign-in failed. Please try again.' });
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col md:grid md:grid-cols-2 font-sans transition-colors duration-300 ${
        isDark
          ? 'bg-[#0B0F19] text-slate-100 selection:bg-[#8B7BE8]/30 selection:text-white'
          : 'bg-[#FFFFFF] text-[#25283D] selection:bg-[#FFD078] selection:text-[#25283D]'
      }`}
    >
      {/* ======================================================== */}
      {/* LEFT COLUMN: Modern Minimal Sign Up Form                 */}
      {/* ======================================================== */}
      <div
        className={`flex flex-col justify-between px-6 py-8 sm:px-12 lg:px-16 xl:px-20 min-h-screen relative z-10 transition-colors duration-300 ${
          isDark ? 'bg-[#0B0F19]' : 'bg-[#FFFFFF]'
        }`}
      >
        {/* Top Header / Brand Logo & Controls */}
        <div className="flex items-center justify-between w-full max-w-[420px] mx-auto">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="group inline-flex items-center gap-2.5 text-lg font-bold tracking-tight hover:opacity-90 transition-opacity"
            aria-label="PromptCraft AI Home"
          >
            <PromptCraftLogoIcon className="w-8 h-8 shrink-0 text-[#FFD078]" />
            <div className="flex items-center tracking-tight leading-none text-xl">
              <span className={`font-bold transition-colors ${isDark ? 'text-white' : 'text-[#25283D]'}`}>
                Prompt
              </span>
              <span className="text-[#F4774F] font-bold">Craft</span>
              <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-[#55CFC0] text-[#0B0F19]">
                AI
              </span>
            </div>
          </a>

          {/* Action Group: Theme Toggle & Home link */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all cursor-pointer shadow-xs ${
                isDark
                  ? 'bg-[#131929] border-slate-800 text-amber-300 hover:bg-[#1a233a] hover:border-slate-700'
                  : 'bg-[#F8FAFC] border-slate-200 text-indigo-600 hover:bg-slate-100 hover:border-slate-300'
              }`}
              title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
              aria-label="Toggle theme mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#131929] border-slate-800 text-slate-300 hover:text-white hover:bg-[#1a233a]'
                  : 'bg-[#F8FAFC] border-slate-200 text-slate-700 hover:text-[#25283D] hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
          </div>
        </div>

        {/* Center: Main Form Card */}
        <div className="w-full max-w-[400px] mx-auto my-auto py-8">
          <div className="mb-8">
            <h1
              className={`text-3xl sm:text-[34px] font-extrabold tracking-tight leading-tight transition-colors ${
                isDark ? 'text-white' : 'text-[#25283D]'
              }`}
            >
              Create an account
            </h1>
            <p
              className={`mt-2 text-sm leading-relaxed transition-colors ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Start turning your ideas into powerful AI prompts.
            </p>
          </div>

          {/* Tool Gate Redirect Notice */}
          {redirectNotice && !user && (
            <div
              className={`mb-5 p-3 rounded-xl text-xs flex items-center gap-2.5 border transition-all animate-in fade-in duration-200 ${
                isDark
                  ? 'bg-[#181c35] border-[#8B7BE8]/40 text-[#d4ccfe]'
                  : 'bg-[#F5F3FF] border-[#DDD6FE] text-[#6D28D9]'
              }`}
            >
              <Lock className="w-4 h-4 shrink-0 text-[#8B7BE8]" />
              <span className="font-semibold leading-snug">{redirectNotice}</span>
            </div>
          )}

          {errors.general && (
            <div
              className={`mb-5 p-3.5 rounded-xl text-xs flex items-start gap-2.5 border ${
                isDark
                  ? 'bg-red-950/60 border-red-800/80 text-red-300'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}
            >
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span className="leading-normal">{errors.general}</span>
            </div>
          )}

          {successMsg && (
            <div
              className={`mb-5 p-3.5 rounded-xl text-xs border ${
                isDark
                  ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}
            >
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSignUpSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
            <div>
              <label
                htmlFor="signup-name"
                className={`block text-xs font-semibold uppercase tracking-wider mb-2 transition-colors ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="Enter name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  className={`w-full h-11 pl-10 pr-3.5 rounded-xl text-sm outline-none transition-all border ${
                    isDark
                      ? `bg-[#131929] ${
                          errors.fullName ? 'border-red-500/80' : 'border-slate-800 hover:border-slate-700 focus:border-[#8B7BE8]'
                        } text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#8B7BE8]/20`
                      : `bg-[#F8FAFC] ${
                          errors.fullName ? 'border-red-500' : 'border-slate-200 hover:border-slate-300 focus:border-[#7C3AED]'
                        } text-[#1E293B] placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/15 shadow-xs`
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="signup-email"
                className={`block text-xs font-semibold uppercase tracking-wider mb-2 transition-colors ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className={`w-full h-11 pl-10 pr-3.5 rounded-xl text-sm outline-none transition-all border ${
                    isDark
                      ? `bg-[#131929] ${
                          errors.email ? 'border-red-500/80' : 'border-slate-800 hover:border-slate-700 focus:border-[#8B7BE8]'
                        } text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#8B7BE8]/20`
                      : `bg-[#F8FAFC] ${
                          errors.email ? 'border-red-500' : 'border-slate-200 hover:border-slate-300 focus:border-[#7C3AED]'
                        } text-[#1E293B] placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/15 shadow-xs`
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="signup-password"
                className={`block text-xs font-semibold uppercase tracking-wider mb-2 transition-colors ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password (6+ chars)"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className={`w-full h-11 pl-10 pr-11 rounded-xl text-sm outline-none transition-all border ${
                    isDark
                      ? `bg-[#131929] ${
                          errors.password ? 'border-red-500/80' : 'border-slate-800 hover:border-slate-700 focus:border-[#8B7BE8]'
                        } text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#8B7BE8]/20`
                      : `bg-[#F8FAFC] ${
                          errors.password ? 'border-red-500' : 'border-slate-200 hover:border-slate-300 focus:border-[#7C3AED]'
                        } text-[#1E293B] placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/15 shadow-xs`
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-3.5 flex items-center transition-colors cursor-pointer ${
                    isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-11 rounded-xl text-white font-semibold text-sm tracking-wide shadow-md active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 ${
                  isDark
                    ? 'bg-gradient-to-r from-[#8B7BE8] via-[#7C3AED] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#4F46E5] shadow-[#7C3AED]/25 hover:shadow-[#7C3AED]/35'
                    : 'bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#4F46E5] hover:from-[#6D28D9] hover:to-[#4338CA] shadow-[#7C3AED]/20 hover:shadow-[#7C3AED]/30'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Sign Up</span>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div
            className={`relative my-6 text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t ${
              isDark ? 'after:border-slate-800/90' : 'after:border-slate-200'
            }`}
          >
            <span
              className={`relative z-10 px-3 font-medium uppercase tracking-wider text-[11px] transition-colors ${
                isDark ? 'bg-[#0B0F19] text-slate-500' : 'bg-white text-slate-400'
              }`}
            >
              Or continue with
            </span>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className={`w-full h-11 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-[0.99] ${
              isDark
                ? 'border-slate-800 hover:border-slate-700 bg-[#131929] hover:bg-[#182136] text-slate-200 hover:text-white shadow-xs'
                : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-xs'
            }`}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Bottom Link to Login */}
          <div
            className={`mt-8 text-center text-xs sm:text-sm transition-colors ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => onNavigate('/login')}
              className={`font-semibold transition-colors cursor-pointer ml-1 underline-offset-2 hover:underline ${
                isDark ? 'text-[#8B7BE8] hover:text-[#A78BFA]' : 'text-[#7C3AED] hover:text-[#6D28D9]'
              }`}
            >
              Sign in
            </button>
          </div>
        </div>

        <div
          className={`w-full max-w-[400px] mx-auto text-center text-[11px] py-2 transition-colors ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          &copy; {new Date().getFullYear()} PromptCraft AI Studio. All rights reserved.
        </div>
      </div>

      {/* ======================================================== */}
      {/* RIGHT COLUMN: Pose 2 (Floating Astronaut) for Sign Up    */}
      {/* ======================================================== */}
      <div
        className={`relative w-full min-h-[550px] md:min-h-screen border-t md:border-t-0 md:border-l flex flex-col items-center justify-between p-6 sm:p-10 lg:p-12 overflow-hidden transition-colors duration-500 ${
          isDark
            ? 'bg-[#070A12] border-slate-800/80'
            : 'bg-gradient-to-br from-[#EEF2FF] via-[#F8FAFC] to-[#ECFDF5] border-slate-200'
        }`}
      >
        {/* Subtle Cosmic Violet & Cyan Nebula Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: isDark
              ? 'radial-gradient(circle at 50% 48%, rgba(85, 207, 192, 0.12) 0%, rgba(139, 123, 232, 0.22) 32%, rgba(55, 184, 232, 0.08) 48%, rgba(7, 10, 18, 0.98) 72%)'
              : 'radial-gradient(circle at 50% 48%, rgba(85, 207, 192, 0.20) 0%, rgba(139, 123, 232, 0.15) 32%, rgba(238, 242, 255, 0.5) 70%)',
          }}
        />

        {/* Decorative Subtle Cosmic Stars */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div
            className={`absolute top-[16%] left-[18%] w-1.5 h-1.5 rounded-full ${
              isDark ? 'bg-white opacity-40 shadow-[0_0_8px_#ffffff]' : 'bg-[#55CFC0] opacity-60 shadow-[0_0_8px_#55CFC0]'
            }`}
          />
          <div
            className={`absolute top-[26%] right-[18%] w-2 h-2 rounded-full ${
              isDark ? 'bg-[#8B7BE8] opacity-60 shadow-[0_0_10px_#8B7BE8]' : 'bg-[#8B7BE8] opacity-50 shadow-[0_0_10px_#8B7BE8]'
            }`}
          />
          <div
            className={`absolute top-[52%] left-[10%] w-1.5 h-1.5 rounded-full ${
              isDark ? 'bg-[#55CFC0] opacity-50 shadow-[0_0_6px_#55CFC0]' : 'bg-[#55CFC0] opacity-70'
            }`}
          />
          <div
            className={`absolute bottom-[30%] right-[12%] w-1.5 h-1.5 rounded-full ${
              isDark ? 'bg-[#FFD078] opacity-50 shadow-[0_0_8px_#FFD078]' : 'bg-[#FFD078] opacity-60'
            }`}
          />
          <div
            className={`absolute bottom-[18%] left-[24%] w-2 h-2 rounded-full ${
              isDark ? 'bg-white opacity-30 shadow-[0_0_6px_#ffffff]' : 'bg-[#8B7BE8] opacity-40'
            }`}
          />
          <svg
            className={`absolute top-[10%] right-[28%] w-4 h-4 animate-pulse ${
              isDark ? 'text-[#55CFC0]/40' : 'text-[#55CFC0]/60'
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0L14 9L23 11L14 13L12 22L10 13L1 11L10 9L12 0Z" />
          </svg>
        </div>

        {/* Top spacer */}
        <div className="w-full hidden md:block" />

        {/* Centered Large Pose 2 Astronaut Illustration */}
        <div className="relative z-10 flex-1 my-auto flex items-center justify-center w-full max-w-[620px] xl:max-w-[720px] py-4">
          <div className="relative w-full flex items-center justify-center group">
            {/* Ambient Cosmic Violet/Cyan Glow tuned specifically for Pose 2 */}
            <div
              className={`absolute w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] lg:w-[560px] lg:h-[560px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
                isDark
                  ? 'bg-gradient-to-tr from-[#55CFC0]/20 via-[#8B7BE8]/25 to-[#55CFC0]/15 opacity-70'
                  : 'bg-gradient-to-tr from-[#55CFC0]/30 via-[#8B7BE8]/20 to-[#FFD078]/20 opacity-50'
              }`}
            />

            <img
              src={POSE_2_ASSET.src}
              onError={(e) => {
                (e.target as HTMLImageElement).src = POSE_2_ASSET.fallback;
              }}
              alt={POSE_2_ASSET.alt}
              className={`relative max-h-[480px] sm:max-h-[580px] md:max-h-[640px] lg:max-h-[700px] xl:max-h-[760px] w-auto max-w-full object-contain mx-auto select-none pointer-events-none transition-all duration-500 ease-out ${
                isDark
                  ? 'drop-shadow-[0_25px_50px_rgba(139,123,232,0.30)]'
                  : 'drop-shadow-[0_25px_45px_rgba(85,207,192,0.25)]'
              }`}
            />
          </div>
        </div>

        {/* Motivational Text Block for Sign Up */}
        <div className="relative z-10 w-full max-w-md mx-auto text-center mt-4 mb-2">
          <blockquote className="space-y-2">
            <p
              className={`text-xl sm:text-2xl font-bold tracking-tight drop-shadow-sm transition-colors ${
                isDark ? 'text-white' : 'text-[#1E1B4B]'
              }`}
            >
              &ldquo;Create an account. A new chapter awaits.&rdquo;
            </p>
            <cite
              className={`block text-sm font-semibold not-italic tracking-wide transition-colors ${
                isDark ? 'text-[#55CFC0]' : 'text-[#0D9488]'
              }`}
            >
              &mdash; PromptCraft AI Studio
            </cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
