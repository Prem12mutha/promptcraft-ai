/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Sparkles, User as UserIcon, LogOut } from 'lucide-react';
import { PromptCraftLogoIcon } from './Doodles.tsx';
import { useAuth } from '../context/AuthContext.tsx';

interface NavbarProps {
  onOpenWorkspace: (tab?: 'builder' | 'image' | 'improver') => void;
  onNavigate?: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWorkspace, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleNavClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Creator';

  return (
    <header className="sticky top-0 w-full z-40 bg-[#FFD078]/95 backdrop-blur-md border-b-2 border-[#25283D] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo & Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) {
              onNavigate('/');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="group flex items-center gap-2 sm:gap-2.5 text-xl sm:text-2xl font-bold tracking-tight font-display whitespace-nowrap shrink-0 transition-all select-none hover:opacity-95"
          aria-label="PromptCraft AI Home"
        >
          {/* Distinctive Brand Symbol */}
          <PromptCraftLogoIcon className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 transition-transform group-hover:scale-105" />

          {/* Wordmark: "Prompt" in midnight navy (#25283D) + "Craft" in coral orange (#F4774F) */}
          <span className="flex items-center tracking-tight leading-none">
            <span className="text-[#25283D] transition-colors">Prompt</span>
            <span className="text-[#F4774F] transition-colors">Craft</span>
          </span>

          {/* AI Accent Badge */}
          <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider rounded-md bg-[#55CFC0] text-[#25283D] border border-[#25283D] shadow-[1px_1px_0px_0px_#25283D] leading-none shrink-0 transition-transform group-hover:scale-105">
            AI
          </span>

          {/* Subtle companion sparkle accent */}
          <Sparkles className="w-3.5 h-3.5 text-[#8B7BE8] fill-[#8B7BE8]/30 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 shrink-0 hidden sm:inline-block" />
        </a>

        {/* Zone 2: Single-line navigation links with pill hover micro-interactions */}
        <nav className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-[#25283D] whitespace-nowrap">
          <a
            href="#features"
            onClick={(e) => handleNavClick('features', e)}
            className="px-3.5 py-1.5 rounded-full hover:bg-[#25283D]/10 hover:text-[#F4774F] active:scale-95 transition-all relative"
          >
            Features
          </a>
          <a
            href="/prompt-builder"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) {
                onNavigate('/prompt-builder');
              } else {
                onOpenWorkspace('builder');
              }
            }}
            className="px-3.5 py-1.5 rounded-full hover:bg-[#25283D]/10 hover:text-[#F4774F] active:scale-95 transition-all relative"
          >
            Prompt Builder
          </a>
          <a
            href="/image-to-prompt"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) {
                onNavigate('/image-to-prompt');
              } else {
                onOpenWorkspace('image');
              }
            }}
            className="px-3.5 py-1.5 rounded-full hover:bg-[#25283D]/10 hover:text-[#F4774F] active:scale-95 transition-all relative"
          >
            Image to Prompt
          </a>
          <a
            href="/prompt-improver"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) {
                onNavigate('/prompt-improver');
              } else {
                onOpenWorkspace('improver');
              }
            }}
            className="px-3.5 py-1.5 rounded-full hover:bg-[#25283D]/10 hover:text-[#F4774F] active:scale-95 transition-all relative"
          >
            Prompt Improver
          </a>
        </nav>

        {/* Zone 3: Actions & Mobile Hamburger */}
        <div className="flex items-center gap-2.5 shrink-0">
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#25283D]/20 text-xs font-bold text-[#25283D] shadow-xs">
                <UserIcon className="w-3.5 h-3.5 text-[#37B8E8]" />
                <span className="truncate max-w-[120px]">{displayName}</span>
              </span>
              <button
                onClick={async () => {
                  await signOut();
                  if (onNavigate) {
                    onNavigate('/');
                  }
                }}
                className="p-2 text-[#25283D] hover:text-[#F4774F] transition-colors cursor-pointer rounded-full hover:bg-black/5"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => onNavigate?.('/login')}
                className="px-3.5 py-1.5 text-xs sm:text-sm font-bold text-[#25283D] hover:text-[#F4774F] rounded-full hover:bg-[#25283D]/5 transition-all cursor-pointer"
              >
                Log in
              </button>
              <button
                onClick={() => onNavigate?.('/signup')}
                className="px-3.5 py-1.5 text-xs sm:text-sm font-bold text-[#25283D] bg-white/80 hover:bg-white rounded-full border border-[#25283D]/30 hover:border-[#25283D] shadow-xs transition-all cursor-pointer"
              >
                Sign up
              </button>
            </div>
          )}

          <button
            onClick={() => onOpenWorkspace('builder')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-[#F4774F] hover:bg-[#e0663e] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] hover:shadow-[3px_3px_0px_0px_#25283D] transition-all whitespace-nowrap cursor-pointer"
          >
            Open Studio
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#25283D] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFF8E9] border-b-2 border-[#25283D] px-6 py-5 shadow-lg space-y-4">
          <div className="flex flex-col space-y-3 font-semibold text-base text-[#25283D]">
            <a
              href="#features"
              onClick={(e) => handleNavClick('features', e)}
              className="py-1 hover:text-[#F4774F]"
            >
              Features
            </a>
            <a
              href="/prompt-builder"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (onNavigate) {
                  onNavigate('/prompt-builder');
                } else {
                  onOpenWorkspace('builder');
                }
              }}
              className="py-1 hover:text-[#F4774F]"
            >
              Prompt Builder
            </a>
            <a
              href="/image-to-prompt"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (onNavigate) {
                  onNavigate('/image-to-prompt');
                } else {
                  onOpenWorkspace('image');
                }
              }}
              className="py-1 hover:text-[#F4774F]"
            >
              Image to Prompt
            </a>
            <a
              href="/prompt-improver"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (onNavigate) {
                  onNavigate('/prompt-improver');
                } else {
                  onOpenWorkspace('improver');
                }
              }}
              className="py-1 hover:text-[#F4774F]"
            >
              Prompt Improver
            </a>
          </div>

          <div className="pt-3 border-t border-[#25283D]/10 space-y-2.5">
            {user ? (
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-semibold text-[#25283D] flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-[#37B8E8]" />
                  <span>{displayName}</span>
                </span>
                <button
                  onClick={async () => {
                    await signOut();
                    setMobileMenuOpen(false);
                    if (onNavigate) {
                      onNavigate('/');
                    }
                  }}
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pb-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate?.('/login');
                  }}
                  className="py-2.5 text-center text-xs font-bold text-[#25283D] bg-white rounded-full border border-[#25283D] cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate?.('/signup');
                  }}
                  className="py-2.5 text-center text-xs font-bold text-white bg-gradient-to-r from-[#37B8E8] to-[#55CFC0] rounded-full cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWorkspace('builder');
              }}
              className="w-full py-3 text-center text-sm font-bold text-white bg-[#F4774F] rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] cursor-pointer"
            >
              Open Studio Workspace
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

