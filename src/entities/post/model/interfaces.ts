export interface GPost {
  created_at: string;
  description: string;
  id: string;
  images: string[];
  video?: string;
  is_commentable: boolean;
  liked: boolean;
  is_video: boolean;
  likes: number;
  saved: boolean;
  tags: string;
  updated_at: string;
  // type?: string;
  thumbnail?: string;
  m3u8: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
}
