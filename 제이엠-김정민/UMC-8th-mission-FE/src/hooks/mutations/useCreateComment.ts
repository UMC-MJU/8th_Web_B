import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../apis/lp";
import type { RequestCommentDto, ResponseCommentDto } from "../../types/lp";

const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseCommentDto, Error, RequestCommentDto>({
    mutationFn: postComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.lpId],
        refetchType: "active", // ✅ 바로 새로고침
      });
    },
  });
};

export default useCreateComment;
