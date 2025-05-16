import { PaginationDto } from "../types/common";
import { ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLPList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });
  return data;
};

export const getMyLpList = async (): Promise<ResponseLpListDto> => {
  const response = await axiosInstance.get("/v1/lps/user");
  return response.data;
};

export const getLpDetail = async (lpId: number) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

export const getLpComments = async (lpId: number) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`);
  return data;
};
