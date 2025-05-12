import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
// import { formatDistanceToNow } from "date-fns";

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const { data, isLoading, isError } = useGetLpDetail(Number(lpId));

  if (isLoading) return <p className="text-white">로딩 중...</p>;
  if (isError || !data?.data)
    return <p className="text-white">불러오기 실패</p>;

  const lp = data.data;

  return (
    <div className="flex justify-center px-4 pt-12 text-white min-h-screen">
      <div className="bg-zinc-800 w-full max-w-5xl rounded-xl shadow-md px-10 py-10 relative">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
          {/* 작성자 + 제목 + 날짜 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <img
                src={lp.author?.avatar || "/default-avatar.png"}
                alt="작성자 프로필"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium">
                {lp.author?.name || "작성자"}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(lp.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <h2 className="text-2xl font-bold mt-1">{lp.title}</h2>
          </div>

          {/* 수정/삭제 버튼 */}
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <button className="hover:text-white">✏️ 수정</button>
            <button className="hover:text-white">🗑 삭제</button>
          </div>
        </div>

        {/* 썸네일 */}
        <div className="relative w-[360px] h-[360px] mx-auto rounded-xl bg-zinc-800 shadow-2xl p-4 border-zinc-900">
          {/* CD 이미지 */}
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full h-full rounded-full object-cover"
          />

          {/* 중앙 구멍 */}
          <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white border border-gray-300 rounded-full -translate-x-1/2 -translate-y-1/2 z-10" />
        </div>

        {/* 설명 */}
        <p className="text-base mb-6 leading-relaxed text-gray-200 whitespace-pre-line">
          {lp.content}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {lp.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-700 text-sm px-4 py-1 rounded-full text-gray-200"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* 좋아요 */}
        <div className="flex justify-center items-center gap-2 text-pink-400 text-xl">
          ❤️ <span className="text-white">{lp.likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
