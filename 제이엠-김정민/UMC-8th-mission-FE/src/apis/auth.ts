import axios from "axios"
import { RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSignupDto } from "../types/auth";


export const postSignup = async (
    body: RequestSignupDto,
): Promise<ResponseSignupDto> => {
    const { data } = await axios.post(
        import.meta.env.VITE_SERVER_API_URL + "/v1/auth/signup",
        body,
    );

    return data;
};

export const postSignin = async (
    body: RequestSigninDto,
): Promise<ResponseSigninDto> => {
    const { data } = await axios.post(
        import.meta.env.VITE_SERVER_API_URL + "/v1/auth/signin",
        body,
    );

    return data;
};

export const getMyInfo = async (
):Promise<ResponseMyInfoDto> => {
    const {data} = await axios.post(
        import.meta.env.VITE_SERVER_API_URL + "v1/users/me",
    );

    return data;
}