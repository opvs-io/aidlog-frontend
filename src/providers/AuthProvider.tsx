import React, { useEffect } from 'react';
import supabase from '@/configs/supabase';
import Router from 'next/router';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log({ event, session });

      if (event === 'PASSWORD_RECOVERY') {
        Router.push('/settings');
      }
    });
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
