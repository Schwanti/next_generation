"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function AuthIndicator() {
  const [session, setSession] = useState<{ email: string; role: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (s?.user) {
        setSession({
          email: s.user.email ?? "",
          role: (s.user.app_metadata?.role as string) ?? "",
        });
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!session) return null;

  return (
    <div className="auth-indicator">
      <span className="auth-indicator-dot" />
      <span className="auth-indicator-text">
        {session.email} ({session.role === "super_admin" ? "Admin" : "Editor"})
      </span>
    </div>
  );
}
