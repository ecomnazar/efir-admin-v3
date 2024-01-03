export interface GUser {
  avatar: string;
  bio: string;
  city: { id: number; slug: string; name: string; region: number };
  count_stars: number;
  created_at: string;
  data: { post_count: number; like_count: number };
  expires_at?: string;
  id: string;
  is_commentable: boolean;
  is_premium: boolean;
  level: number;
  phone_number: string;
  post_limit: number;
  premium_at?: string;
  qr_code: string;
  region: { id: number; slug: string; name: string };
  username: string;
};
