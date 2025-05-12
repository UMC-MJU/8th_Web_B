import { CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type LpItem = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date; // 💡 서버에서 string으로 오므로 string으로 맞추는 걸 추천
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
  author?: LPAuthor; // 목록에는 없지만 상세에는 있음 → optional 처리
};

export type LPAuthor = {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LpDetail = {
  data: LpItem;
  author: LPAuthor;
  tags: Tag[];
  likes: Likes[];
};

export type ResponseLpListDto = CursorBasedResponse<LpItem[]>;

export type CommentAuthor = {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CommentItem = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: CommentAuthor;
};

export type ResponseCommentListDto = {
  data: {
    data: CommentItem[];
  };
};
