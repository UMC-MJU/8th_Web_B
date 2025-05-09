import { PAGINATION_ORDER } from "../enum/common";

export type CommonResponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data :T
};

export type CursorBasedResponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
    nextCursor: number;
    hasNext: boolean;
};

//필수가 아니라서 모든 값을 optional처리 해준다.  
export type PaginationDto = {
    cursor?: number;
    limit?: number;
    search?: string;
    order?: PAGINATION_ORDER;
}