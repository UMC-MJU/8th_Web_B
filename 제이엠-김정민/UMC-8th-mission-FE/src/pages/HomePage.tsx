import { useEffect, useRef, useState } from "react";
import LpCard from "../components/LpCard/LpCard.tsx";
import LPCardSkeleton from "../components/LpCard/LpCardSkeleton.tsx";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList.ts";
import { PAGINATION_ORDER } from "../enum/common.ts";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList.tsx";
import useDebounce from "../hooks/useDebounce.ts";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay.ts";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY); //delay값 상수로 변경.
  const observerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    //search 값을 debouncedValue로 변경.
  } = useGetInfiniteLpList(10, debouncedValue, PAGINATION_ORDER.desc);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-5 gap-4 px-4 pt-12">
        {Array.from({ length: 10 }).map((_, i) => (
          <LPCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="h-[80vh] overflow-y-auto" ref={scrollRef}>
      <div>
        <input
          className="border p-4 rounded-sm"
          placeholder="검색어를 입력하세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-5 gap-4 px-4">
        {data?.pages.map((page, pageIndex) =>
          page.data.data.map((lp) => (
            <LpCard key={`${pageIndex}-${lp.id}`} lp={lp} />
          ))
        )}

        {isFetchingNextPage && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={observerRef} className="h-1" />
    </div>
  );
};

export default HomePage;
