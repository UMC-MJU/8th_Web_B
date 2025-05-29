import { useEffect, useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import useDebounce from "../hooks/useDebounce";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 800); // 0.5초 후 실제 검색값으로 반영
  // const { data, isPending, isError } = useGetLpList({
  //   search,
  //   limit: 50,
  // });

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(5, debouncedSearch, PAGINATION_ORDER.desc);

  // ref, inView
  // ref => 특정한 HTML 요소를 감시할 수 있다.
  // inView => 그 요소가 화면에 보이면 true가 된다.
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    // if (inView) {
    //   !isFetching && hasNextPage && fetchNextPage();
    // }
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return <div className={"mt-20"}>Loading...</div>;
  }

  if (isError) {
    return <div className={"mt-20"}>Error...</div>;
  }

  //console.log(lps);

  return (
    <div className="container mx-auto px-4 py-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="앨범 제목을 검색하세요"
        className="border p-2 w-full mb-4"
      ></input>

      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }
      >
        {isPending && <LpCardSkeletonList count={20} />}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat() // [[1,2],[3,4]].flat() => [1,2,3,4]
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default HomePage;
