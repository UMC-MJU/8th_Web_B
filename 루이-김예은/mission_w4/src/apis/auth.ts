import {
  RequestSigninDto,
  RequestSignupDto,
  RequestUsersDto,
  ResponseSigninDto,
  ResponseSignupDto,
  ResponseUsersDto,
} from "../types/auth";
import { axiosInstance } from "./axios";
import { ResponseMyInfoDto } from "../types/user";

//회원가입
export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);

  return data;
};

// 로그인
export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);

  return data;
};

// 내 정보 조회
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");

  return data;
};

// 로그아웃
export const postLogout = async () => {
  const { data } = await axiosInstance.post("/v1/auth/signout");
  return data;
};

// 닉네임 변경
export const patchUser = async (
  body: RequestUsersDto
): Promise<ResponseUsersDto> => {
  const { data } = await axiosInstance.patch("/v1/users", body);

  return data;
};
