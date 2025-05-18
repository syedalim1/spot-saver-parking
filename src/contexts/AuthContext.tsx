
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";

interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  // Add other profile fields if needed
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, sessionState) => {
      console.log("Auth state changed:", _event, sessionState);
      setSession(sessionState);
      setUser(sessionState?.user ?? null);
      if (sessionState?.user) {
        // Fetch profile when session changes and user exists
        // Using setTimeout to avoid potential deadlocks with onAuthStateChange
        setTimeout(async () => {
          const { data, error } = await supabase
            .from('user_profile_arunthathi')
            .select('id, email, full_name')
            .eq('id', sessionState.user.id)
            .single();
          
          if (error) {
            console.error('Error fetching profile:', error);
            setProfile(null);
            // Potentially toast error if it's not a '0 rows' error
            if (error.code !== 'PGRST116') { // PGRST116 is "Searched for a single row, but found 0 rows"
              toast({
                title: "Profile Error",
                description: "Could not fetch your profile.",
                variant: "destructive",
              });
            }
          } else {
            setProfile(data as UserProfile);
          }
        }, 0);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    // Check for existing session on initial load
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
         setTimeout(async () => {
          const { data, error } = await supabase
            .from('user_profile_arunthathi')
            .select('id, email, full_name')
            .eq('id', currentSession.user.id)
            .single();
          
          if (error) {
            console.error('Error fetching initial profile:', error);
            setProfile(null);
          } else {
            setProfile(data as UserProfile);
          }
          setLoading(false);
        }, 0);
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (!error) {
      toast({ title: "Signed In", description: "Welcome back!" });
      navigate('/'); // Redirect to home after successful sign-in
    } else {
      toast({ title: "Sign In Error", description: error.message, variant: "destructive" });
    }
    return { error };
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, // This will be available in new.raw_user_meta_data for the trigger
        },
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Sign Up Error", description: error.message, variant: "destructive" });
    } else if (data.user && data.user.identities?.length === 0) {
        toast({
            title: "Sign Up Error",
            description: "This email address is already in use with a different sign-in method.",
            variant: "destructive",
        });
        return { error: { name: "UserAlreadyExists", message: "User already exists" } as AuthError };
    } else if (data.session) {
        // User signed up and logged in
        toast({ title: "Signed Up Successfully!", description: "Welcome! Your account is created." });
        navigate('/'); // Redirect to home
    } else if (data.user && !data.session) {
        // User signed up but needs email confirmation (if enabled)
        toast({ title: "Confirmation Email Sent", description: "Please check your email to confirm your account." });
        navigate('/auth'); // Stay on auth page or redirect to a "please confirm email" page
    }
    return { error };
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
    setLoading(false);
    toast({ title: "Signed Out", description: "You have been successfully signed out." });
    navigate('/auth'); // Redirect to auth page after sign-out
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, signInWithEmail, signUpWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

