import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DebugAuthPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  let profile = null;
  let profileError = null;

  if (user) {
    const result = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    profile = result.data;
    profileError = result.error;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Auth Debug Info</h1>

      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">User Info:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(
              {
                user: user
                  ? {
                      id: user.id,
                      email: user.email,
                      email_confirmed_at: user.email_confirmed_at,
                    }
                  : null,
                userError: userError?.message,
              },
              null,
              2
            )}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Profile Info:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(
              { profile, profileError: profileError?.message },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
