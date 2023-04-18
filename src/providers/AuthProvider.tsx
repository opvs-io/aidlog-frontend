import React, { useEffect } from 'react';
import supabase from '@/configs/supabase';
import Router from 'next/router';
import { Session } from '@supabase/auth-helpers-nextjs';

type Props = {
  children: React.ReactNode;
};

let lastSession: Session | null = null;

const AuthProvider = ({ children }: Props) => {
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (lastSession?.access_token !== session?.access_token) {
        console.log('Setting token');

        await fetch('/api/auth/set', {
          method: 'PATCH',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ session }),
        });

        console.log({
          router: Router.route,
        });

        Router.route === '/login' && Router.push('/');
      }

      if (event === 'PASSWORD_RECOVERY') {
        Router.push('/settings');
      }

      lastSession = session;
    });
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
