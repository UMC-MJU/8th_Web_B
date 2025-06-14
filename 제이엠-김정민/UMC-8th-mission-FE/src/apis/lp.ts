import { PaginationDto } from "../types/common";
import {
  CreateLpPayload,
  CreateLpResponse,
  RequestCommentDto,
  RequestEditMyInfoDto,
  RequestLpDto,
  ResponseCommentDeleteDto,
  ResponseCommentDto,
  ResponseCommentUpdateDto,
  ResponseEditMyInfoDto,
  ResponseLikeLpDto,
  ResponseLpListDto,
} from "../types/lp";
import { axiosInstance } from "./axios";

//내 정보 수정하기
export const editMyInfo = async (
  payload: RequestEditMyInfoDto
): Promise<ResponseEditMyInfoDto> => {
  const { name, bio, avatar } = payload;
  const { data } = await axiosInstance.patch(`/v1/users`, {
    name,
    bio,
    avatar,
  });
  return data;
};

//전체 LP 목록 가져오기
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

//LP 생성하기
export const createLP = (data: CreateLpPayload): Promise<CreateLpResponse> => {
  return axiosInstance
    .post<CreateLpResponse>("/v1/lps", data)
    .then((res) => res.data); // 반환 확실하게
};

//LP의 댓글 불러오기
export const getLpComments = async (lpId: number) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`);
  return data;
};

//LP의 댓글 생성하기
export const postComment = async ({
  lpId,
  content,
}: RequestCommentDto): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });
  return data;
};

//LP의 댓글 수정하기
export const patchComment = async ({
  lpId,
  commentId,
  content,
}: RequestCommentDto): Promise<ResponseCommentUpdateDto> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    {
      content,
    }
  );
  return data;
};

//LP 댓글 삭제하기
export const deleteComment = async ({
  lpId,
  commentId,
}: RequestCommentDto): Promise<ResponseCommentDeleteDto> => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return data;
};

//LP에 좋아요 누르기
export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

//LP에 좋아요 직우기
export const deleteLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};

//내가 좋아요 누른 LP 보기
export const getMyLikeLpList = async (): Promise<ResponseLpListDto> => {
  const response = await axiosInstance.get(`/v1/lps/likes/me`);
  return response.data;
};
