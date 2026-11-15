/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { FeaturesSection } from './components/FeaturesSection.tsx';
import { ExampleSection } from './components/ExampleSection.tsx';
import { FAQSection } from './components/FAQSection.tsx';
import { Footer } from './components/Footer.tsx';
import { InteractiveStudio, WorkspaceTab } from './components/InteractiveStudio.tsx';
import { LoginPage } from './components/auth/LoginPage.tsx';
import { SignUpPage } from './components/auth/SignUpPage.tsx';
import { PromptBuilderPage } from './components/PromptBuilderPage.tsx';
import { ImageToPromptPage } from './components/ImageToPromptPage.tsx';
import { PromptImproverPage } from './components/PromptImproverPage.tsx';

function AppContent() {
  const { user, loading } = useAuth();

  const [currentPath, setCurrentPath] = useState<string>(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path === '/login' || hash === '#/login' || hash === '#login') return '/login';
    if (path === '/signup' || hash === '#/signup' || hash === '#signup') return '/signup';
    if (path === '/prompt-builder' || hash === '#/prompt-builder' || hash === '#prompt-builder') return '/prompt-builder';
    if (path === '/image-to-prompt' || hash === '#/image-to-prompt' || hash === '#image-to-prompt') return '/image-to-prompt';
    if (path === '/prompt-improver' || hash === '#/prompt-improver' || hash === '#prompt-improver') return '/prompt-improver';
    return '/';
  });

  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<WorkspaceTab>('builder');
  const [customPromptForImprover, setCustomPromptForImprover] = useState<string>('');
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  const PROTECTED_TOOL_ROUTES = ['/prompt-builder', '/image-to-prompt', '/prompt-improver'];

  // Route protection effect for direct URL entry or browser popstate
  useEffect(() => {
    if (!loading && !user && PROTECTED_TOOL_ROUTES.includes(currentPath)) {
      sessionStorage.setItem('promptcraft_redirect_to', currentPath);
      setCurrentPath('/login');
      window.history.replaceState({}, '', '/login');
    }
  }, [loading, user, currentPath]);

  // If already logged in, redirect directly to the studio/tools instead of showing login
  useEffect(() => {
    if (!loading && user && (currentPath === '/login' || currentPath === '/signup')) {
      const dest = sessionStorage.getItem('promptcraft_redirect_to') || '/prompt-builder';
      sessionStorage.removeItem('promptcraft_redirect_to');
      setCurrentPath(dest);
      window.history.replaceState({}, '', dest);
    }
  }, [loading, user, currentPath]);

  // Sync routing on popstate and hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path === '/login' || hash === '#/login' || hash === '#login') {
        setCurrentPath('/login');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/signup' || hash === '#/signup' || hash === '#signup') {
        setCurrentPath('/signup');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/prompt-builder' || hash === '#/prompt-builder' || hash === '#prompt-builder') {
        setCurrentPath('/prompt-builder');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/image-to-prompt' || hash === '#/image-to-prompt' || hash === '#image-to-prompt') {
        setCurrentPath('/image-to-prompt');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/prompt-improver' || hash === '#/prompt-improver' || hash === '#prompt-improver') {
        setCurrentPath('/prompt-improver');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPath('/');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    // Intercept navigation to protected tools when user is not logged in
    if (!user && PROTECTED_TOOL_ROUTES.includes(path)) {
      sessionStorage.setItem('promptcraft_redirect_to', path);
      setCurrentPath('/login');
      window.history.pushState({}, '', '/login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenStudio = (tab: WorkspaceTab = 'builder') => {
    const targetTool = tab === 'image' ? '/image-to-prompt' : tab === 'improver' ? '/prompt-improver' : '/prompt-builder';
    if (!user) {
      sessionStorage.setItem('promptcraft_redirect_to', targetTool);
      navigateTo('/login');
      return;
    }

    if (tab === 'builder') {
      navigateTo('/prompt-builder');
      return;
    }
    if (tab === 'image') {
      navigateTo('/image-to-prompt');
      return;
    }
    if (tab === 'improver') {
      navigateTo('/prompt-improver');
      return;
    }
    setActiveWorkspaceTab(tab);
    setIsStudioOpen(true);
  };

  const handleCloseStudio = () => {
    setIsStudioOpen(false);
  };

  const handleSelectSamplePrompt = (promptText: string) => {
    setCustomPromptForImprover(promptText);
    if (!user) {
      sessionStorage.setItem('promptcraft_redirect_to', '/prompt-improver');
      navigateTo('/login');
      return;
    }
    navigateTo('/prompt-improver');
  };

  // Graceful loading indicator while checking auth session
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8E9] text-[#25283D]">
        <div className="w-10 h-10 border-4 border-[#F4774F] border-t-transparent rounded-full animate-spin mb-3" />
        <span className="text-base font-bold font-display tracking-tight">PromptCraft AI</span>
      </div>
    );
  }

  // Render Login Route (/login)
  if (currentPath === '/login') {
    return <LoginPage onNavigate={navigateTo} />;
  }

  // Render Sign Up Route (/signup)
  if (currentPath === '/signup') {
    return <SignUpPage onNavigate={navigateTo} />;
  }

  // Guard: if unauthenticated and trying to render any protected tool, redirect to login
  if (!user && PROTECTED_TOOL_ROUTES.includes(currentPath)) {
    return <LoginPage onNavigate={navigateTo} />;
  }

  // Render Prompt Builder Route (/prompt-builder)
  if (currentPath === '/prompt-builder') {
    return (
      <PromptBuilderPage
        onNavigate={navigateTo}
        onSendToImprover={(promptText) => {
          setCustomPromptForImprover(promptText);
          navigateTo('/prompt-improver');
        }}
      />
    );
  }

  // Render Image to Prompt Route (/image-to-prompt)
  if (currentPath === '/image-to-prompt') {
    return (
      <ImageToPromptPage
        onNavigate={navigateTo}
        onSendToImprover={(promptText) => {
          setCustomPromptForImprover(promptText);
          navigateTo('/prompt-improver');
        }}
      />
    );
  }

  // Render Prompt Improver Route (/prompt-improver)
  if (currentPath === '/prompt-improver') {
    return (
      <PromptImproverPage
        onNavigate={navigateTo}
        initialPrompt={customPromptForImprover}
      />
    );
  }

  // Render Main Landing Page (/)
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8E9] text-[#25283D] selection:bg-[#FFD078] selection:text-[#25283D]">
      {/* Top Navigation */}
      <Navbar
        onOpenWorkspace={(tab = 'builder') => handleOpenStudio(tab)}
        onNavigate={navigateTo}
      />

      {/* Main Page Flow — Hero, Features, Before & After Gallery, and FAQ directly above Footer */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenBuilder={() => navigateTo('/prompt-builder')}
          onOpenImageToPrompt={() => navigateTo('/image-to-prompt')}
          onSelectSamplePrompt={handleSelectSamplePrompt}
        />

        {/* 2. Feature Section */}
        <FeaturesSection
          onSelectFeature={(feature) => {
            if (feature === 'builder') {
              navigateTo('/prompt-builder');
            } else if (feature === 'image') {
              navigateTo('/image-to-prompt');
            } else if (feature === 'improver') {
              navigateTo('/prompt-improver');
            } else {
              handleOpenStudio(feature);
            }
          }}
        />

        {/* 3. Example Section */}
        <ExampleSection
          onLoadIntoImprover={(text) => {
            setCustomPromptForImprover(text);
            navigateTo('/prompt-improver');
          }}
        />

        {/* 4. FAQ Section */}
        <FAQSection />
      </main>

      {/* 5. Illustrated Landscape Footer */}
      <Footer
        onSelectFeature={(feature) => {
          if (feature === 'builder') {
            navigateTo('/prompt-builder');
          } else if (feature === 'image') {
            navigateTo('/image-to-prompt');
          } else if (feature === 'improver') {
            navigateTo('/prompt-improver');
          } else {
            handleOpenStudio(feature);
          }
        }}
        onNavigate={navigateTo}
      />

      {/* Studio Workspace Modal (for Image-to-Prompt and Prompt Improver) */}
      <InteractiveStudio
        isOpen={isStudioOpen}
        onClose={handleCloseStudio}
        activeTab={activeWorkspaceTab}
        onTabChange={setActiveWorkspaceTab}
        externalPrompt={customPromptForImprover}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
