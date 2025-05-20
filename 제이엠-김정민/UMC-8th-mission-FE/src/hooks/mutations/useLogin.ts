import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";
import type { RequestSigninDto, ResponseSigninDto } from "../../types/auth";

const useLogin = () => {
  return useMutation<ResponseSigninDto, Error, RequestSigninDto>({
    mutationFn: postSignin,
  });
};

export default useLogin;
