import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({cursor,search,order,limit}:PaginationDto) {

    return useQuery({
        // queryKey를 다른 사람들이나 내가 잘못입력할 수 도 있기 때문에 constants폴더에 key.ts에서 상수로 받아서 처리함.
        queryKey:[QUERY_KEY.lps], 
        //만약 주입받을 인자들이 없다면 그냥 getLpList로 사용함. => queryFn: getLpList; 이런식으로 
        queryFn: () => 
            getLpList({
            cursor,
            search,
            order,
            limit,
        }),
        //데이터가 신선하다고 간주하는 시간.
        //이 시간 동안은 캐시된 데이터를 그대로 사용. 컴포넌트가 마운트되거나 창에 포커스 들어오는 경우도 재요청X
        //5분 동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄임
        staleTime: 1000*60*5, //5분
        // 사용되지 않는 비활성 상태인 쿼리 데이터가 캐시에 남아있는 시간.
        //staleTime이 지나고 데이터가 신선하지 않더라고, 일정 시간 동안 메모리에 보관
        //그 이후 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후 에 제거
        gcTime: 100*60*10, //10분
        //조건에 따라 쿼리를 실행
        enabled: Boolean(search), //검색어가 있는경우 true


    });
}

export default useGetLpList;