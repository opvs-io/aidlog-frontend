import {
  createServerSupabaseClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export type SupabaseAuth = {
  session?: Session;
  user?: User;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

export const withSupabaseAuth =
  (
    callback?: (data: {
      session: Session | null;
      client: SupabaseClient<Any, 'public', Any>;
    }) => Promise<GetServerSidePropsResult<Any>>,
  ) =>
  async (
    ctx: GetServerSidePropsContext<never, SupabaseAuth>,
  ): Promise<GetServerSidePropsResult<Any>> => {
    const supabase = createServerSupabaseClient(ctx);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!callback) {
      if (!session) {
        return {
          props: {},
        };
      }

      return {
        props: {
          session,
          user: session.user,
        },
      };
    }

    return await callback({ session, client: supabase });
  };
