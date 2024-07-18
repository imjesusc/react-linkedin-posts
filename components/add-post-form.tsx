"use client";

import { PostVisibilityEnum } from "@/enums/post-visibility.enum";
import { usePost } from "@/hooks/use-post";

export function AddPostForm() {
  const { createPost, loading, error, postError, isSuccess } = usePost();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        createPost(formData);
        e.currentTarget.reset();
      }}
    >
      <label htmlFor="visibility">Visibility</label>
      <select id="visibility" name="visibility" required>
        <option value="" disabled selected>
          Select visibility
        </option>
        {Object.values(PostVisibilityEnum).map((visibility) => (
          <option key={visibility} value={visibility}>
            {visibility}
          </option>
        ))}
      </select>

      <label htmlFor="commentary">Commentary</label>
      <textarea id="commentary" name="commentary" required></textarea>

      <button type="submit" aria-disabled={loading}>
        Submit
      </button>

      {isSuccess ? <p>Post suffcessfully created.</p> : null}
      {error ? <p>Error creating post.</p> : null}
      {postError ? <p>{postError}</p> : null}
    </form>
  );
}
