import { useState } from "react";
import useEditMyInfo from "../hooks/mutations/useEditMyInfo";

interface EditMyInfoModalProps {
  currentName: string;
  currentBio?: string | null;
  currentAvatar?: string | null;
  onClose: () => void;
}

const EditMyInfoModal = ({
  currentName,
  currentBio,
  currentAvatar,
  onClose,
}: EditMyInfoModalProps) => {
  const [name, setName] = useState(currentName);
  const [bio, setBio] = useState(currentBio || "");
  const [avatar, setAvatar] = useState(currentAvatar || "");

  const { mutate: editMyInfo, isPending } = useEditMyInfo();

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("이름은 반드시 입력해야 합니다.");
      return;
    }

    editMyInfo(
      { name, bio, avatar },
      {
        onSuccess: () => {
          alert("정보가 수정되었습니다.");
          onClose();
        },
        onError: () => {
          alert("수정에 실패했습니다.");
        },
      }
    );
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-zinc-800 text-white rounded-lg p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">내 정보 수정</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            className="w-full px-3 py-2 rounded mb-3 text-white"
          />

          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="소개 (선택)"
            className="w-full px-3 py-2 rounded mb-3 text-white"
          />

          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="아바타 이미지 URL (선택)"
            className="w-full px-3 py-2 rounded mb-4 text-white"
          />

          <button
            type="submit"
            // disabled={isPending}
            className="w-full bg-pink-600 py-2 rounded hover:bg-pink-700 disabled:bg-gray-500"
          >
            {isPending ? "수정 중..." : "수정하기"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMyInfoModal;
