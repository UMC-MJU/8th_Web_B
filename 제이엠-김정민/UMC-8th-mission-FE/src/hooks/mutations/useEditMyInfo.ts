import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestEditMyInfoDto, ResponseEditMyInfoDto } from "../../types/lp";
import { editMyInfo } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

const useEditMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseEditMyInfoDto, Error, RequestEditMyInfoDto>({
    mutationFn: editMyInfo, // ✅ 직접 함수 전달
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo], // ✅ useGetMyInfo의 queryKey와 정확히 일치해야 함
        refetchType: "active",
      });
    },
  });
};

export default useEditMyInfo;
