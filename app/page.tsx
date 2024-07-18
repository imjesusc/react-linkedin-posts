import { AddPostForm } from "@/components/add-post-form";
import { getSession, signIn, signOut } from "./actions";

export default async function Home() {
  const session = await getSession();
  const isLoggedIn = !!session?.user?.id;
  return (
    <main>
      <h1>LinkedIn Posts</h1>
      {isLoggedIn ? (
        <form action={signOut}>
          <button type="submit">Sign out</button>
        </form>
      ) : (
        <form action={signIn}>
          <button type="submit">Sign in</button>
        </form>
      )}

      {isLoggedIn ? <AddPostForm /> : null}
    </main>
  );
}
