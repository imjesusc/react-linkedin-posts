"use server";

import { PostDistributionFeedEnum } from "@/enums/post-distribution-feed.enum";
import { PostLifecycleEnum } from "@/enums/post-lifecycle.enum";
import { PostVisibilityEnum } from "@/enums/post-visibility.enum";
import { Post } from "@/models/post.model";
import { getSession } from "./actions";

export async function createPost(formData: FormData) {
  const session = await getSession();
  const userId = session?.user.id;
  const accessToken = session?.token;

  const commentary = formData.get("commentary") as string;
  const visibility = formData.get("visibility") as PostVisibilityEnum;

  const newPost: Post = {
    author: `urn:li:person:${userId}`,
    commentary: commentary,
    visibility: visibility,
    distribution: {
      feedDistribution: PostDistributionFeedEnum.MAIN_FEED,
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    lifecycleState: PostLifecycleEnum.PUBLISHED,
    isReshareDisabledByAuthor: false,
  };

  const OPTIONS = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "LinkedIn-Version": "202401",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(newPost),
  };

  const response = await fetch(
    `${process.env.LINKEDIN_API_URL}/rest/posts`,
    OPTIONS,
  );

  const isSucces = response.headers.get("x-restli-id");

  if (!isSucces) {
    throw new Error("Error creating post");
  }
}
