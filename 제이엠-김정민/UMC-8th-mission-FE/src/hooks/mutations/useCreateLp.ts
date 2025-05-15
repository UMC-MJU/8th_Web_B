// hooks/mutations/useCreateLp.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLP } from "../../apis/lp";
import type { CreateLpPayload, CreateLpResponse } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";

const useCreateLp = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateLpResponse, Error, CreateLpPayload>({
    mutationFn: createLP,
    onSuccess: (data, variables, context) => {
      // ✅ LP 목록 무효화
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
        refetchType: "active",
        exact: true,
      });
      console.log(context);
    },
    onMutate: (variables) => {
      console.log(variables);
      return "LP등록";
    },
  });
};

export default useCreateLp;
