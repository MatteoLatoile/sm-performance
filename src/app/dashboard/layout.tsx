import { isAdminEmail } from "@/lib/supabase/admin";
import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/login");
  if (!isAdminEmail(data.user.email)) redirect("/");

  return <>{children}</>;
}
