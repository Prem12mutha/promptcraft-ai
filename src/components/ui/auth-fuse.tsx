"use client";

import * as React from "react";
import { useState, useId, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuth } from "@/context/AuthContext.tsx";
import { PromptCraftLogoIcon } from "@/components/Doodles.tsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
}

export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  useEffect(() => {
    if (!currentText) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    currentText,
    loop,
    speed,
    deleteSpeed,
    delay,
    displayText,
    text,
  ]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-200"
);

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 shadow-sm",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-200 hover:text-white transition-colors",
        secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
        ghost: "hover:bg-zinc-800 text-zinc-300 hover:text-white",
        link: "text-zinc-100 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-6",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-100 shadow-sm transition-all placeholder:text-zinc-500 focus-visible:border-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, label, ...props }, ref) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="grid w-full items-center gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          className={cn("pe-10", className)}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 end-0 flex h-full w-10 items-center justify-center text-zinc-400 hover:text-zinc-200 transition-colors focus-visible:outline-none cursor-pointer"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export interface AuthContentProps {
  image?: {
    src: string;
    alt: string;
  };
  quote?: {
    text: string;
    author: string;
  };
}

export interface AuthUIProps {
  signInContent?: AuthContentProps;
  signUpContent?: AuthContentProps;
  defaultIsSignIn?: boolean;
  className?: string;
  onNavigate?: (path: string) => void;
}

export const defaultSignInContent: AuthContentProps = {
  image: {
    src: "/assets/astronaut_pose1.png",
    alt: "PromptCraft AI Astronaut in focus energy pose",
  },
  quote: {
    text: "Welcome Back! The journey continues.",
    author: "PromptCraft AI Studio",
  },
};

export const defaultSignUpContent: AuthContentProps = {
  image: {
    src: "/assets/astronaut_pose2.png",
    alt: "PromptCraft AI Astronaut drifting in cosmic space",
  },
  quote: {
    text: "Create an account. A new chapter awaits.",
    author: "PromptCraft AI Studio",
  },
};

export function AuthUI({
  signInContent = {},
  signUpContent = {},
  defaultIsSignIn = false,
  className,
  onNavigate,
}: AuthUIProps) {
  const [isSignIn, setIsSignIn] = useState(defaultIsSignIn);

  // Sync state if defaultIsSignIn changes
  useEffect(() => {
    setIsSignIn(defaultIsSignIn);
  }, [defaultIsSignIn]);

  // Auth Context Hook
  const { signIn, signUp, signInWithGoogle, resetPassword, isConfigured } = useAuth();

  // Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Forgot password mode
  const [isResetMode, setIsResetMode] = useState(false);

  const toggleForm = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsResetMode(false);
    const nextMode = !isSignIn;
    setIsSignIn(nextMode);
    if (onNavigate) {
      onNavigate(nextMode ? "/login" : "/signup");
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setErrorMsg("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn(email.trim(), password);
      setLoading(false);

      if (res.error) {
        setErrorMsg(res.error.message);
      } else {
        setSuccessMsg("Successfully signed in! Redirecting...");
        setTimeout(() => {
          if (onNavigate) onNavigate("/");
          else window.location.href = "/";
        }, 1000);
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || "An error occurred during sign in.");
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await signUp(fullName.trim(), email.trim(), password);
      setLoading(false);

      if (res.error) {
        setErrorMsg(res.error.message);
      } else {
        setSuccessMsg(
          res.successMessage || "Account created successfully! Redirecting..."
        );
        setTimeout(() => {
          setIsSignIn(true);
          if (onNavigate) onNavigate("/login");
        }, 1500);
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || "An error occurred during account creation.");
    }
  };

  const handleResetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address for password reset.");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword(email.trim());
      setLoading(false);

      if (res.error) {
        setErrorMsg(res.error.message);
      } else {
        setSuccessMsg(
          res.successMessage || "Password reset link sent! Check your inbox."
        );
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || "Unable to send password reset email.");
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMsg(null);
    try {
      const res = await signInWithGoogle();
      if (res.error) {
        setErrorMsg(res.error.message);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Google sign in failed.");
    }
  };

  const finalSignInContent = {
    image: { ...defaultSignInContent.image, ...signInContent.image },
    quote: { ...defaultSignInContent.quote, ...signInContent.quote },
  };

  const finalSignUpContent = {
    image: { ...defaultSignUpContent.image, ...signUpContent.image },
    quote: { ...defaultSignUpContent.quote, ...signUpContent.quote },
  };

  const currentContent = isSignIn ? finalSignInContent : finalSignUpContent;

  return (
    <div
      className={cn(
        "relative w-full min-h-screen md:grid md:grid-cols-2 bg-black text-zinc-100 selection:bg-zinc-800 selection:text-white",
        className
      )}
    >
      <style>{`
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear {
          display: none;
        }
      `}</style>

      {/* Top Left Navigation Back to Home */}
      <div className="absolute top-5 left-5 z-30">
        <button
          type="button"
          onClick={() => {
            if (onNavigate) onNavigate("/");
            else window.location.href = "/";
          }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold shadow-md transition-all cursor-pointer backdrop-blur-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <PromptCraftLogoIcon className="w-4 h-4 text-[#FFD078]" />
          <span>PromptCraft AI</span>
        </button>
      </div>

      {/* Left Column: Form Panel */}
      <div className="flex min-h-screen items-center justify-center p-6 md:p-12 lg:p-16">
        <div className="w-full max-w-[360px] mx-auto">
          {/* Feedback Messages */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-950/60 border border-red-800/80 text-red-300 rounded-lg text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 rounded-lg text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {!isConfigured && (
            <div className="mb-4 p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg text-[11px] text-zinc-400">
              <span className="text-zinc-200 font-semibold block mb-0.5">Note:</span>
              Set <code className="text-zinc-300 bg-zinc-800/80 px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> & <code className="text-zinc-300 bg-zinc-800/80 px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> in <code className="text-zinc-300 bg-zinc-800/80 px-1 py-0.5 rounded">.env</code> for active account provisioning.
            </div>
          )}

          {/* Form Content */}
          {isResetMode ? (
            /* Forgot Password Form */
            <form onSubmit={handleResetSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-white">Reset Password</h1>
                <p className="text-sm text-zinc-400">
                  Enter your email to receive a password reset link.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                    required
                    autoComplete="email"
                  />
                </div>

                <Button type="submit" variant="outline" disabled={loading} className="mt-2">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Sending link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </div>

              <div className="text-center text-sm">
                <Button
                  variant="link"
                  type="button"
                  onClick={() => setIsResetMode(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  Back to Sign in
                </Button>
              </div>
            </form>
          ) : isSignIn ? (
            /* Sign In Form */
            <form onSubmit={handleSignInSubmit} autoComplete="on" className="flex flex-col gap-8">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Sign in to your account
                </h1>
                <p className="text-sm text-zinc-400">
                  Enter your email below to sign in
                </p>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="grid gap-1">
                  <PasswordInput
                    name="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="Password"
                  />
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => setIsResetMode(true)}
                      className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                <Button type="submit" variant="outline" disabled={loading} className="mt-2">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>

              <div className="text-center text-sm text-zinc-400">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  type="button"
                  className="pl-1 text-white font-semibold"
                  onClick={toggleForm}
                >
                  Sign up
                </Button>
              </div>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-zinc-800">
                <span className="relative z-10 bg-black px-2 text-zinc-500">
                  Or continue with
                </span>
              </div>

              <Button
                variant="outline"
                type="button"
                onClick={handleGoogleAuth}
                className="w-full"
              >
                <img
                  src="https://cdn.21st.dev/assets/mirror/38/38146bfd9eff6dbf0d74771f2e625c70d87d3770e0d080dbb6e50db1d5403f46.svg"
                  alt="Google icon"
                  className="mr-2 h-4 w-4"
                />
                Continue with Google
              </Button>
            </form>
          ) : (
            /* Sign Up Form (Matching Screenshot) */
            <form onSubmit={handleSignUpSubmit} autoComplete="on" className="flex flex-col gap-8">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Create an account
                </h1>
                <p className="text-sm text-zinc-400">
                  Enter your details below to sign up
                </p>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-1">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <PasswordInput
                  name="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Password"
                />

                <Button type="submit" variant="outline" disabled={loading} className="mt-2">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Creating account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>

              <div className="text-center text-sm text-zinc-400">
                Already have an account?{" "}
                <Button
                  variant="link"
                  type="button"
                  className="pl-1 text-white font-semibold"
                  onClick={toggleForm}
                >
                  Sign in
                </Button>
              </div>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-zinc-800">
                <span className="relative z-10 bg-black px-2 text-zinc-500">
                  Or continue with
                </span>
              </div>

              <Button
                variant="outline"
                type="button"
                onClick={handleGoogleAuth}
                className="w-full"
              >
                <img
                  src="https://cdn.21st.dev/assets/mirror/38/38146bfd9eff6dbf0d74771f2e625c70d87d3770e0d080dbb6e50db1d5403f46.svg"
                  alt="Google icon"
                  className="mr-2 h-4 w-4"
                />
                Continue with Google
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Right Column: Visual Astronaut / Quote Showcase */}
      <div
        className="hidden md:block relative bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${currentContent.image.src})` }}
        key={currentContent.image.src}
      >
        {/* Soft gradient fading up from bottom */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />

        {/* Animated Typewriter Quote */}
        <div className="relative z-10 flex h-full flex-col items-center justify-end p-6 pb-12">
          <blockquote className="space-y-2 text-center text-zinc-100 max-w-md">
            <p className="text-lg font-medium tracking-tight">
              “
              <Typewriter
                key={currentContent.quote.text}
                text={currentContent.quote.text}
                speed={60}
              />
              ”
            </p>
            <cite className="block text-sm font-light text-zinc-400 not-italic">
              — {currentContent.quote.author}
            </cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default AuthUI;
