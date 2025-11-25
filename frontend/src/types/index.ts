export * from './user.types';

export interface PostMedia {
  id: string;
  postId: string;
  url: string;
  type: string;
}

export interface Like {
  id: string;
  userId: string;
  user?: any;
  createdAt: string;
}

export interface Reply {
  id: string;
  authorId: string;
  author: any;
  content: string;
  likes: Like[];
  likesCount: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  authorId: string;
  author: any;
  content: string;
  likes: Like[];
  likesCount: number;
  replies: Reply[];
  repliesCount: number;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  author: any;
  content: string | null;
  media: PostMedia[];
  likes: Like[];
  likesCount: number;
  comments: Comment[];
  commentsCount: number;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetPostsResponse {
  message: string;
  posts: Post[];
}