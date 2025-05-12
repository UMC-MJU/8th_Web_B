import { PaginationDto } from "../types/common";
import { ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });
  return data;
};

//내 LP목록 불러오기
export const getMyLpList = async (): Promise<ResponseLpListDto> => {
  const response = await axiosInstance.get("/v1/lps/user");
  return response.data;
};
//LP 디테일정보 불러오기
export const getLpDetail = async (lpId: number) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data; // CommonResponse<LpItem>
};
//LP의 댓글 불러오기
export const getLpComments = async (lpId: number) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`);
  return data;
};
