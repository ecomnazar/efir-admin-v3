export interface GHistory {
  channel: number;
  created_at: string;
  id: number;
  image: string;
  link: string;
  type: string;
  video: any;
}

export interface GChannel {
  avatar?: string;
  category?: number;
  id: number;
  name: string;
  stories: GHistory[];
}
