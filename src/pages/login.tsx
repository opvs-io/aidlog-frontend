import React from 'react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';

import supabase from '@/configs/supabase';
import { withSupabaseAuth } from '@/providers/auth.middleware';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    </div>
  );
};

export const getServerSideProps = withSupabaseAuth(async ({ session }) => {
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});

export default Login;
