import { AddPostForm } from "@/components/add-post-form";
import { getSession, signIn, signOut } from "./actions";

export default async function Home() {
  const session = await getSession();
  return (
    <main>
      <h1>LinkedIn Posts</h1>
      {!session?.user.id ? (
        <form action={signIn}>
          <button type="submit">Sign in</button>
        </form>
      ) : (
        <form action={signOut}>
          <button type="submit">Sign out</button>
        </form>
      )}

      <AddPostForm />
    </main>
  );
}
