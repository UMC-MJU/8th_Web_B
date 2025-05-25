import { useMutation } from "@tanstack/react-query";
import { patchUser } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";
import { RequestUsersDto, ResponseUsersDto } from "../../types/auth";

function usePatchUser() {
  return useMutation<
    ResponseUsersDto,
    Error,
    RequestUsersDto,
    { previousUser?: ResponseUsersDto }
  >({
    mutationFn: patchUser,

    onMutate: async (
      newUserData
    ): Promise<{ previousUser?: ResponseUsersDto }> => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

      const previousUser = queryClient.getQueryData<ResponseUsersDto>([
        QUERY_KEY.myInfo,
      ]);

      queryClient.setQueryData<ResponseUsersDto>([QUERY_KEY.myInfo], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            ...newUserData,
          },
        };
      });

      return { previousUser };
    },

    onError: (_error, _newData, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.previousUser);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}

export default usePatchUser;
