import { PostDistributionFeedEnum } from "@/enums/post-distribution-feed.enum";
import { PostLifecycleEnum } from "@/enums/post-lifecycle.enum";
import { PostVisibilityEnum } from "@/enums/post-visibility.enum";

export interface Post {
  author: string;
  commentary: string;
  visibility: PostVisibilityEnum;
  lifecycleState: PostLifecycleEnum;
  distribution: PostDistribution;
  isReshareDisabledByAuthor: boolean;
}

export interface PostDistribution {
  feedDistribution: PostDistributionFeedEnum;
  targetEntities: string[];
  thirdPartyDistributionChannels: string[];
}
