import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
      console.log(context);
    },
    //요청 직전에 실행되기 직전에 실행되는 함수 => Optimistic Update를 구현할 때 유용
    //Optimistic Update => 네트워크가 느려서
    onMutate: (variables) => {
      console.log(variables);
      return "좋아요취소";
    },
  });
}

export default useDeleteLike;
