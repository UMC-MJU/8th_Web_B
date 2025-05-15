import { useState, useRef } from "react";
import type { CreateLpPayload } from "../types/lp";
import useCreateLp from "../hooks/mutations/useCreateLp";
import { LPIMG } from "../images/lpImg";

interface AddLpModalProps {
  onClose: () => void;
}

const AddLpModal = ({ onClose }: AddLpModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ useMutation hook
  const { mutate: createLpMutate, isPending } = useCreateLp();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedImage(file);
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      let thumbnailUrl = LPIMG.LPIMG;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("file", selectedImage);

        const uploadRes = await fetch("/v1/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        thumbnailUrl = uploadData.url;
      }

      const payload: CreateLpPayload = {
        title,
        content,
        thumbnail: thumbnailUrl,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        published: true,
      };

      createLpMutate(payload);
    } catch (err) {
      console.error(err);
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <div
      className="fixed inset-0  bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-zinc-800 rounded-lg p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-white">LP 작성하기</h2>

        <div
          className="w-full h-40 bg-gray-100 border border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer mb-3"
          onClick={() => fileInputRef.current?.click()}
        >
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="thumbnail"
              className="h-full object-contain"
            />
          ) : (
            <p className="text-gray-500">썸네일 이미지를 선택하세요</p>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-white"
        />

        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-white"
        />

        <input
          type="text"
          placeholder="태그 (,로 구분)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-white"
        />

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? "등록 중..." : "등록하기"}
        </button>
      </div>
    </div>
  );
};

export default AddLpModal;
