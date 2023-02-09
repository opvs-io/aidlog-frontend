import React, { ReactElement } from 'react';

import { SupabaseAuth, withSupabaseAuth } from '@/providers/auth.middleware';
import SidebarLayout from '@/layouts/SidebarLayout/SidebarLayout';

const Settings = ({ user }: SupabaseAuth) => {
  return (
    <div>
      Settings
      <div>{user?.email}</div>
    </div>
  );
};

export const getServerSideProps = withSupabaseAuth(async ({ session }) => {
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      user: session.user,
    },
  };
});

Settings.getLayout = function getLayout(page: ReactElement<SupabaseAuth>) {
  return (
    <SidebarLayout title="Settings" user={page.props.user}>
      {page}
    </SidebarLayout>
  );
};

export default Settings;
