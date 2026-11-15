/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured, User, Session } from '../lib/supabase.ts';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signUp: (name: string, email: string, password: string) => Promise<{ error: Error | null; successMessage?: string }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null; successMessage?: string }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      // Check localStorage for persisted demo/client user session
      try {
        const storedUser = localStorage.getItem('promptcraft_auth_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (err) {
        console.warn('Failed to restore local user session:', err);
        localStorage.removeItem('promptcraft_auth_user');
      }
      setLoading(false);
      return;
    }

    // Get current session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (name: string, email: string, password: string) => {
    if (!isSupabaseConfigured || !supabase) {
      // Client-side authentication mode
      const mockUser: User = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        app_metadata: { provider: 'email' },
        user_metadata: {
          full_name: name.trim() || 'Creator',
        },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        email: email.trim(),
      } as User;
      setUser(mockUser);
      localStorage.setItem('promptcraft_auth_user', JSON.stringify(mockUser));
      return {
        error: null,
        successMessage: 'Account created successfully! Welcome to PromptCraft AI.',
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        return { error };
      }

      if (data.user && !data.session) {
        return {
          error: null,
          successMessage: 'Account created! Please check your email for a confirmation link before logging in.',
        };
      }

      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured || !supabase) {
      // Client-side authentication mode
      const displayName =
        email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Creator';
      const mockUser: User = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        app_metadata: { provider: 'email' },
        user_metadata: {
          full_name: displayName,
        },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        email: email.trim(),
      } as User;
      setUser(mockUser);
      localStorage.setItem('promptcraft_auth_user', JSON.stringify(mockUser));
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured || !supabase) {
      // Client-side Google OAuth simulation mode
      const mockUser: User = {
        id: 'google_' + Math.random().toString(36).substring(2, 9),
        app_metadata: { provider: 'google' },
        user_metadata: {
          full_name: 'Prompt Crafter',
        },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        email: 'creator@promptcraft.ai',
      } as User;
      setUser(mockUser);
      localStorage.setItem('promptcraft_auth_user', JSON.stringify(mockUser));
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      return { error };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('promptcraft_auth_user');
    setUser(null);
    setSession(null);
  };

  const resetPassword = async (email: string) => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        error: null,
        successMessage: `Password reset instructions sent to ${email}.`,
      };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (error) {
        return { error };
      }

      return {
        error: null,
        successMessage: 'Password reset link sent! Please check your email inbox.',
      };
    } catch (err: any) {
      return { error: err };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isConfigured: isSupabaseConfigured,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
