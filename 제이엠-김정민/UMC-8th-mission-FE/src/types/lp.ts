import { CommonResponse, CursorBasedResponse } from "./common";

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
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes?: Likes[];
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

export type RequestLpDto = {
  lpId: number;
  content?: string; //댓글 부분에서만 필요해서 옵셔널로 적용
};

export type ResponseLpListDto = CursorBasedResponse<LpItem[]>;

export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type RequestCommentDto = {
  lpId: number;
  content?: string;
  commentId?: number;
};

export type ResponseCommentDto = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: LPAuthor;
};

export type ResponseCommentUpdateDto = CommonResponse<{
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: CommentAuthor;
}>;

export type ResponseCommentDeleteDto = CommonResponse<{
  message: string;
}>;

//LP생성하기 위한 페이로드
export type CreateLpPayload = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};
//LP생성할때 필요한 보내는정보
export type CreateLpResponse = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  authorId: number;
};

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
  data: CommentItem[];
};
