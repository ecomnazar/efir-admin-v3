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
