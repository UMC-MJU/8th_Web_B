import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestCommentDto, ResponseCommentUpdateDto } from "../../types/lp";
import { patchComment } from "../../apis/lp";

const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseCommentUpdateDto, Error, RequestCommentDto>({
    mutationFn: patchComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.lpId],
        refetchType: "active", // 바로 새로고침
      });
    },
  });
};

export default useUpdateComment;
