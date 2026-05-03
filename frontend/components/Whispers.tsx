// components/Whispers.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { answerWhisper, deleteWhisper } from "@/lib/api";
import { getLoggedInUser } from "@/lib/auth";

export function AnsweredWhisper({ whisper, ownerName, ownerUsername }: any) {
  return (
    <div className="bg-white rounded-2xl w-full max-w-lg p-5 flex flex-col gap-2 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#8fbfdc] flex items-center justify-center text-gray-100 font-bold text-lg">
          {ownerName ? ownerName.charAt(0).toUpperCase() : "O"}
        </div>

        <div className="flex flex-col">
          <span className="text-black font-bold text-sm leading-tight">
            {ownerName}
          </span>
          <span className="text-gray-500 text-xs leading-tight">
            @{ownerUsername}
          </span>
        </div>
      </div>
      <div>
        <span className="text-black font-bold text-sm">
          {whisper.senderName} says
        </span>

        <div className="border-l-2 border-[#C7DFEE] pl-3 py-1 mt-1">
          <p className="text-black text-sm">{whisper.content}</p>
        </div>
      </div>

      <div>
        <p className="text-black text-sm ml-1">{whisper.reply}</p>
      </div>
    </div>
  );
}
export function UnansweredWhisper({ whisper, pageOwnerId }: any) {
  const currentUser = getLoggedInUser();
  const [replyText, setReplyText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOwner = currentUser && String(currentUser.id) === String(pageOwnerId);
  if (!isOwner) return null;

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setIsSubmitting(true);
    const res = await answerWhisper({
      whisperId: whisper._id,
      replyText,
      userId: currentUser.id,
    });
    if (res.success) window.location.reload();
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this whisper?")) return;
    setIsDeleting(true);
    const res = await deleteWhisper(whisper._id, currentUser.id);
    if (res.success) {
      window.location.reload();
    } else {
      alert("Failed to delete");
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl w-full max-w-lg p-5 flex flex-col gap-3 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-black font-bold text-sm">
        {whisper.senderName || "anon"} says
      </p>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-[#4590bc] hover:text-red-300 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <div className="border-l-2 border-[#b5d3ee] pl-3 py-1">
      <p className="text-black text-sm">{whisper.content}</p>
    </div>

    <div className="bg-[#c7dfee] rounded-xl p-2 flex items-center gap-2 mt-2">
      <input
        type="text"
        className="bg-transparent flex-1 outline-none text-black placeholder:text-gray-500 text-sm px-2 font-medium"
        placeholder="send your reply"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <button
        onClick={handleReply}
        disabled={isSubmitting || !replyText.trim()}
        className="bg-[#6bafd6] text-white px-5 py-1.5 rounded-full text-xs font-bold hover:bg-[#8fbfdc] disabled:opacity-50 transition-all"
      >
        {isSubmitting ? "..." : "Send"}
      </button>
    </div>

  </div>
  );
}
