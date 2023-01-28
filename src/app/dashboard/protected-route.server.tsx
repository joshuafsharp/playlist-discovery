import "server-only";

import createClient from "~/common/supabase/server";

interface Props {
  children: React.ReactNode;
}

export const ProtectedServerRoute = async ({ children }: Props) => {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session ? <>{children}</> : null;
};

export default ProtectedServerRoute;
