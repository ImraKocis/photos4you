export interface FilterPostsQueryData {
  size?: number;
  createdAt?: Date;
  hashtag?: string;
  fullName?: string;
}

export interface CreatePostData {
  userId: string;
  description: string;
  hashtags: string[];
  image: {
    url: string;
    size: string;
  };
}

export interface UpdatePostData {
  description?: string;
  hashtags?: string[];
}
