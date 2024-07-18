import { PostVisibilityEnum } from "@/enums/post-visibility.enum";
import { FailCreatePostException } from "@/models/create-post-error-exception";
import { create } from "@/services/posts-linkedin.service";
import { useState } from "react";

export type usePostReturnType = {
  createPost: (formData: FormData) => Promise<void>;
  loading: boolean;
  isSuccess: boolean;
  error: boolean;
  postError: string;
};

export function usePost(): usePostReturnType {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [postError, setPostError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const createPost = async (formData: FormData): Promise<void> => {
    const commentary = (formData.get("commentary") as string) || "";
    const visibility = formData.get("visibility") as
      | PostVisibilityEnum
      | PostVisibilityEnum.CONNECTIONS;
    const newPost = { commentary, visibility };

    setLoading(true);
    setError(false);
    setPostError("");

    try {
      await create(newPost);
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof FailCreatePostException) {
        setError(true);
      } else {
        setPostError((error as Error)?.message);
      }
    } finally {
      setLoading(false);
      setTimeout(() => setIsSuccess(false), 2500);
    }
  };

  return {
    createPost,
    loading,
    isSuccess,
    error,
    postError,
  };
}
