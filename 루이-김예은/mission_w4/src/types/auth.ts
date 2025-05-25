import { CommonResponse } from "./common";

//회원가입
export type RequestSignupDto = {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
};

export type ResponseSignupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createAt: Date;
  updateAt: Date;
}>;

//로그인
export type RequestSigninDto = {
  email: string;
  password: string;
};

export type ResponseSigninDto = CommonResponse<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

// 유저 정보 수정
export type RequestUsersDto = {
  name: string;
  bio?: string;
  avatar?: string;
};

export type ResponseUsersDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}>;
