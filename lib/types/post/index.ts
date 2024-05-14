export interface Post {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  hashtags: string[];
  userId: number;
}
