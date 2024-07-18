import { getSession } from "@/app/actions";
import { PostDistributionFeedEnum } from "@/enums/post-distribution-feed.enum";
import { PostLifecycleEnum } from "@/enums/post-lifecycle.enum";
import { PostVisibilityEnum } from "@/enums/post-visibility.enum";
import { FailCreatePostException } from "@/models/create-post-error-exception";
import { Post } from "@/models/post.model";

export async function create({
  commentary,
  visibility,
}: {
  commentary: string;
  visibility: PostVisibilityEnum;
}): Promise<void> {
  const session = await getSession();
  const userId = session?.user.id;
  const accessToken = session?.token;

  if (!userId || !accessToken) return;

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

  const response = await fetch("/api/posts", OPTIONS);
  const isSucces = response.headers.get("x-restli-id");

  if (!isSucces) {
    throw new FailCreatePostException();
  }
}
