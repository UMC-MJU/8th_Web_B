import { useState } from "react";
import { useGetComments } from "../../hooks/queries/useGetComments";
import useCreateComment from "../../hooks/mutations/useCreateComment";
import useGetMyIfo from "../../hooks/queries/useGetMyInfo";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import useDeleteComment from "../../hooks/mutations/useDeleteComment";
import useUpdateComment from "../../hooks/mutations/useUpdateComment";

const LpComments = ({ lpId }: { lpId: number }) => {
  const { data: myinfo } = useGetMyIfo();
  const { data, isLoading, isError } = useGetComments(lpId);
  const [content, setContent] = useState("");
  const { mutate: createComment } = useCreateComment();
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: updateComment } = useUpdateComment();
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    createComment(
      { lpId, content },
      {
        onSuccess: () => {
          setContent("");
        },
        onError: () => alert("댓글 등록 실패"),
      }
    );
  };

  if (isLoading) return <p>댓글을 불러오는 중입니다...</p>;
  if (isError) return <p>댓글을 불러오는 데 실패했습니다.</p>;

  return (
    <div className="bg-zinc-800 rounded-lg p-4 mt-10 w-full max-w-3xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">댓글</h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-full flex items-center gap-2 mb-6"
      >
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          className="flex-1 px-3 py-2 rounded bg-zinc-700 text-white outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-pink-600 px-4 py-2 rounded text-white hover:bg-pink-700"
        >
          작성
        </button>
      </form>

      <ul className="space-y-4">
        {data?.data.data.map((comment) => (
          <li key={comment.id} className="relative flex items-start gap-3">
            <img
              src={comment.author.avatar}
              alt="작성자"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-l">
                  {comment.author.name}
                  <span className="text-xs text-gray-400">
                    <span> {"    "}</span>
                    {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                </span>

                {comment.authorId === myinfo?.data.id && (
                  <>
                    <button
                      onClick={() =>
                        setMenuOpenId(
                          menuOpenId === comment.id ? null : comment.id
                        )
                      }
                      className="text-gray-300 text-xl hover:text-white"
                    >
                      ⋯
                    </button>
                    {menuOpenId === comment.id && (
                      <div className="absolute right-0 mt-1 bg-zinc-700 border rounded shadow-md z-10">
                        <button
                          onClick={() => {
                            setMenuOpenId(null);
                            setEditingId(comment.id);
                            setEditContent(comment.content);
                          }}
                          className="block w-full px-4 py-2 text-m text-left hover:bg-zinc-600 text-white"
                        >
                          <MdEdit />
                        </button>
                        <button
                          onClick={() => {
                            deleteComment(
                              { lpId: comment.lpId, commentId: comment.id },
                              {
                                onSuccess: () => {
                                  setMenuOpenId(null);
                                },
                                onError: () => {
                                  alert("댓글 삭제 실패");
                                },
                              }
                            );
                          }}
                          className="block w-full px-4 py-2 text-m text-left hover:bg-zinc-600 text-white"
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
              {editingId === comment.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateComment(
                      {
                        lpId: comment.lpId,
                        commentId: comment.id,
                        content: editContent,
                      },
                      {
                        onSuccess: () => setEditingId(null),
                        onError: () => alert("댓글 수정 실패"),
                      }
                    );
                  }}
                >
                  <input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full mt-1 p-2 bg-zinc-700 text-white rounded"
                  />
                </form>
              ) : (
                <p className="text-m text-gray-300">{comment.content}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LpComments;
