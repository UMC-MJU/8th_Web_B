import { CommonResponse } from "./common";

// 내 정보 조회
export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createAt: Date;
  updateAt: Date;
}>;
