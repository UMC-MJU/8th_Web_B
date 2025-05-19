import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestCommentDto, ResponseCommentDeleteDto } from "../../types/lp";
import { deleteComment } from "../../apis/lp";

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseCommentDeleteDto, Error, RequestCommentDto>({
    mutationFn: deleteComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.lpId],
        refetchType: "active",
      });
    },
  });
};

export default useDeleteComment;
