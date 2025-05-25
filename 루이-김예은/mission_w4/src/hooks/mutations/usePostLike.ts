import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { Variable } from "lucide-react";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    //data -> API 성공 응답 데이터
    // variables -> mutate에 전달한 값
    // context -> onMutate에서 반환한 값
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
    },

    // error -> 요청 실패시 발생한 에러
    // variables -> mutate에 전달한 값
    // context -> onMutate에서 반환한 값
    onError: (data, Variable, context) => {},

    // 요청이 실행되기 직전에
    onMutate: (variables) => {
      console.log("hello");
    },

    // 요청이 끝난 후 항상 실행됨(OnSuccess, onError 후에 실행됨)
    // 로딩 상태를 초기화할 때 조금 유용하다.
    onSettled: (data, error, variables, context) => {},
  });
}

export default usePostLike;
