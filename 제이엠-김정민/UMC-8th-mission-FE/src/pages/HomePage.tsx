import useGetLpList from "../hooks/queries/useGetLpList.ts";
import LpCard from "../components/LpCard.tsx";

const HomePage = () => {
  //이 작업들을 useGetLpList.ts 에서 다해줌
  // const{data, isPending, isError} = useQuery({
  // queryKey: [QUERY_KEY.lps],
  // queryFn: () => getLpList({}),
  // });
  // const [search, setSearch] = useState("")
  // const {data, isPending, isError} = useGetLpList({
  //     search,
  // })

  const {
    data: lpList,
    isPending,
    isError,
  } = useGetLpList({ cursor: 0, limit: 20 });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <>
      <div>
        {isPending && <p>로딩 중...</p>}
        <div className="grid grid-cols-5 gap-4">
          {lpList?.data.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        </div>
      </div>
      {/* <div className="flex flex-col text-center justify-center">
                <input className="bg-white text-black" 
                value={search} onChange={(e) => setSearch(e.target.value)}/>
                {data?.data.map((lp) => <h1 key={lp.id}>{lp.title}</h1>)}
            </div> */}
    </>
  );
};

export default HomePage;
