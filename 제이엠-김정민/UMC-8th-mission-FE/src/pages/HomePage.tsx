import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList.ts";

const HomePage = () => {
    
    //이 작업들을 useGetLpList.ts 에서 다해줌
    // const{data, isPending, isError} = useQuery({
    // queryKey: [QUERY_KEY.lps],
    // queryFn: () => getLpList({}),
    // });
    const [search, setSearch] = useState("type")
    const {data, isPending, isError} = useGetLpList({
        search,
    })

    return (
        <>
            <div className="flex flex-col text-center justify-center">
                HomePage
                {data?.data.data.map((lp) => <h1 key={lp.id}>{lp.title}</h1>)}
            </div>
        </>
    );
};

export default HomePage;
