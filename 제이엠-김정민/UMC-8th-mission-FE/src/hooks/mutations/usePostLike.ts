import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLike() {
  return useMutation({
    //이렇게만 구현하면 정보가 캐싱이 되어있어서 상세페이지를 다시 불러오는걸 해줘야함 => 무효화
    mutationFn: postLike, //좋아요 함수 연결
    //onSuccess과정이 무효화 하는 과정
    //data -> API 성공 응답 데이터
    //variables -> mutate에 전달한 값
    //context -> onMutate에서 반환한 값
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
      console.log(context);
    },

    //error -> 요청 실패시 발생 한 에러
    //variables -> mutate에 전달한 값
    //context -> onMutate에서 반환한 값
    // onError: (error, variables, context) => {},

    //요청 직전에 실행되기 직전에 실행되는 함수 => Optimistic Update를 구현할 때 유용
    //Optimistic Update => 네트워크가 느려서 실행이 느려질 때 무조건 성공한다고 생각하고 미리 적용해주는 것
    onMutate: (variables) => {
      console.log(variables);
      return "좋아요";
    },
    //요청이 끝난 후 항상 실행됨 (onSuccess, onError 등 후에 실행됨)
    //로딩 상태를 초기화할 때 유용함
    // onSettled: (data, variables, context) => {},
  });
}

export default usePostLike;
