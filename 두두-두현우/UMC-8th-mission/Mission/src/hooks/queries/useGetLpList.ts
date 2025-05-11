import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getLPList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () =>
      getLPList({
        cursor,
        search,
        order,
        limit,
      }),
    //데이터가 신선하다고 간주하는 시간,
    // 이 시간동안은 캐시된데이터를 그대로 사용, 컴포넌트가 마운트되거나 포커스가 들어오는 경우도 재요청X
    // 5분동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄인다.
    staleTime: 1000 * 60 * 5,
    // 사용되지 않는 (비활성 상태)인 쿼리 데이터가 캐시에 남아있는 시간
    // staleTime이 지나고 데이터가 신선하지 않아도 일정 시간동안 메모리에 보관함
    // 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 제거된다: garbage collection
    // 10분동안 사용되지 않으면 해당 캐시 데이터가 삭제되며 다시 요청 시에 데이터를 받아오게 됨
    gcTime: 1000 * 60 * 10,
    //조건에 따라 쿼리를 실행할지 여부 제어. false이면 동작하지 않음. 기본값이 true
    //*** */ enabled: Boolean(search),
    // refetchInterval: 100  * 60,
    // retry: 쿼리 요청이 실패했을 때 자동으로 재시도할 횟수를 지정함
    // retry: 3,
    // initialData: 커리 실행 전 미리 제공할 초기 데이터 설정
    // 컴포넌트가 렌더링될 때 빈 데이터 구조를 미리 제공해서 로딩 전에도 안전하게 UI구성
    // 파라미터가 변경될 때 이전 데이터를 유지하여 UI 깜빡임을 줄여줌
    // Pagination시에 페이지 전환 사이에 이전 데이터를  보여주어 사용자 경험 향상
    // keepPreviousData: true,
    select: (data) => data.data.data,
  });
}

export default useGetLpList;
