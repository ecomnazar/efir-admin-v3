export interface PPost {
    user: string;
    description: string;
    tags: string;
    is_commentable: boolean;
    image_1: string;
    image_2?: string;
    image_3?: string;
}