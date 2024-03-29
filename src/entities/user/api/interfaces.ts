export interface PUser {
  id?: string;
  username: string;
  region: string;
  city: string;
  bio: string;
  address: string;
  avatar: string;
  is_channel: "false";
}

export interface PUserPremium {
  id: string;
  period: number;
}

export interface UUser {
  id: string;
  post_limit: number;
}

export interface GSearchUser {
  page: number;
  query?: string;
}
