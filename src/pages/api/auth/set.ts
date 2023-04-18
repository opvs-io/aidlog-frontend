import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PATCH') {
    res.status(404).end();
    return;
  }

  const Session = z.object({
    session: z.object({
      access_token: z.string(),
      refresh_token: z.string(),
    }),
  });

  Session.parse(req.body);

  const { session } = req.body as z.infer<typeof Session>;

  const supabase = createServerSupabaseClient({
    req,
    res,
  });

  await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });

  res.status(200).end();
}
