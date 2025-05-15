import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import useGetLpList from "../hooks/queries/useGetLpList";
import LpCard from "../components/LpCard/LpCard";
import { PAGINATION_ORDER } from "../enum/common";
import { useState } from "react";
import { MYAVATOR } from "../images/avator";
import AddLpModal from "../components/AddLpModal";

const MyPage = () => {
  const [selectedTab, setSelectedTab] = useState<"mine" | "liked">("mine");
  const [isModalOpen, setIsModalOpen] = useState(false);
  //최신순 오래된순을 위한 useState
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const { data: myInfo } = useGetMyInfo();
  // ✅ 일반 리스트 쿼리로 전체 LP 가져오기
  const {
    data: lpList,
    isLoading,
    isError,
  } = useGetLpList({
    cursor: null,
    search: "",
    order: PAGINATION_ORDER.desc,
    limit: 100,
  });

  if (isLoading) return <p className="text-white">로딩 중...</p>;
  if (isError || !lpList) return <p className="text-white">불러오기 실패</p>;

  const myId = myInfo?.data.id;

  // ✅ 내가 작성한 LP만 필터링
  const myLps = lpList.data.filter((lp) => lp.authorId === myId);
  const likedLps = lpList.data.filter((lp) =>
    lp.likes?.some((like) => like.userId === myId)
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-white">
      {/* 🧑‍🦱 프로필 헤더 */}
      <div className="flex justify-between items-center gap-6 mb-8">
        <div className="w-24 h-24 bg-gray-400 rounded-full">
          <img
            src={myInfo?.data.avatar || MYAVATOR.MYAVATORIMG}
            // alt="프로필 이미지"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{myInfo?.data.name}</h2>
          <p className="text-sm text-gray-300">{myInfo?.data.bio}</p>
          <p className="text-sm text-gray-400">{myInfo?.data.email}</p>
        </div>
        <button className="text-gray-300 hover:text-white">
          <div className="">⚙️설정</div>
        </button>
      </div>

      {/* 📌 탭 메뉴 */}
      <div className="flex justify-center items-center border-b border-gray-700 mb-6">
        <button
          onClick={() => setSelectedTab("mine")}
          className={`px-4 py-2 text-sm font-medium hover:text-white ${
            selectedTab === "mine"
              ? "border-b-2 border-white text-white"
              : "text-gray-400"
          }`}
        >
          내가 작성한 LP
        </button>
        <button
          onClick={() => setSelectedTab("liked")}
          className={`px-4 py-2 text-sm font-medium hover:text-white ${
            selectedTab === "liked"
              ? "border-b-2 border-white text-white"
              : "text-gray-400"
          }`}
        >
          내가 좋아요한 LP
        </button>
      </div>

      {/* 🧭 정렬 */}
      <div className="flex justify-end mb-6 gap-2">
        <button
          onClick={() => setOrder("asc")}
          className={`px-3 py-1 rounded border ${
            order === "asc"
              ? "bg-white text-black"
              : "border-gray-500 text-gray-400"
          }`}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder("desc")}
          className={`px-3 py-1 rounded border ${
            order === "desc"
              ? "bg-white text-black"
              : "border-gray-500 text-gray-400"
          }`}
        >
          최신순
        </button>
      </div>

      {/* 📀 LP 카드 리스트 */}
      {selectedTab === "mine" ? (
        <section>
          {myLps.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {myLps.map((lp) => (
                <LpCard key={lp.id} lp={lp} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">작성한 LP가 없습니다.</p>
          )}
        </section>
      ) : (
        <section>
          {likedLps.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {likedLps.map((lp) => (
                <LpCard key={lp.id} lp={lp} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">좋아요한 LP가 없습니다.</p>
          )}
        </section>
      )}
      {/* 플로팅 버튼 */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-12 right-10 bg-pink-500 text-white w-12 h-12 rounded-full text-3xl shadow-lg hover:bg-pink-300"
      >
        +
      </button>

      {/* LP 작성 모달 */}
      {isModalOpen && <AddLpModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default MyPage;
