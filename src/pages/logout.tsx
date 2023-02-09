import { withSupabaseAuth } from '@/providers/auth.middleware';
import React from 'react';

const Logout = () => {
  return <></>;
};

export const getServerSideProps = withSupabaseAuth(async ({ client }) => {
  try {
    await client.auth.signOut();
  } catch (error) {
    console.log({ error });
  } finally {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
});

export default Logout;
