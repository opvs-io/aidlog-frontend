import React from 'react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';

import supabase from '@/configs/supabase';
import { withSupabaseAuth } from '@/providers/auth.middleware';

const Login = () => {
  return (
    <div className="mx-auto container">
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
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
