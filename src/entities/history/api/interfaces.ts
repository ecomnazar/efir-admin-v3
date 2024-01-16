export interface PHistoryImage {
  channel: number;
  type: "image";
  image: string;
  link?: string;
}

export type PHistoryVideo = {
  channel: number;
  type: "video";
  video: string;
  // link?: string;
};
