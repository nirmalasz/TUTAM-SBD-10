"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getLoggedInUser } from "@/lib/auth";
import { sendWhisper } from "@/lib/api"; 

export default function ProfileHeader({ pageOwner, whisperCount }: any) {
    const router = useRouter();
    const currentUser = getLoggedInUser();
    
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isOwner = currentUser && String(currentUser.id) === String(pageOwner._id);
    const senderName = currentUser ? currentUser.displayName : "anon";

    const handleSendWhisper = async () => {
        if (!content.trim()) return;
        setIsSubmitting(true);

        const res = await sendWhisper({
            targetOwnerId: pageOwner._id, 
            content: content,
            senderName: senderName,
        });

        if (res.success) {
            setContent("");
            router.refresh(); 
        } else {
            alert(res.message);
        }
        
        setIsSubmitting(false);
    };

    return (
        <>
            <div className="bg-[#F9FBFD] rounded-xl w-full max-w-lg p-3 flex flex-col gap-4 shadow-sm ">
                <div className="relative w-full h-24 md:h-28 rounded-lg overflow-hidden mb-2 ">
                    <Image
                        src="https://i.pinimg.com/736x/5d/59/72/5d5972aae4c5813bd89674ca2bf25236.jpg"
                        alt="Profile Banner"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                <h1 className="text-black font-bold text-2xl text-center">
                    {pageOwner.username}&apos;s page
                </h1>
                <p className="text-[#0a11169a] text-sm font-bold mb-2 text-center">
                    {whisperCount} whispers
                </p>

                {!isOwner && (
                    <div className="bg-[#c7dfee] rounded-lg p-3 flex flex-col gap-2">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="bg-transparent w-full resize-none outline-none text-black placeholder:text-gray-500 text-sm"
                            rows={3}
                            placeholder="send anonymous whisper"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleSendWhisper}
                                disabled={isSubmitting}
                                className="bg-[#8FBFDC] text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-[#6BAFD6] disabled:opacity-50"
                            >
                                {isSubmitting ? "Sending..." : "Send"}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {isOwner && whisperCount === 0 && (
                <p className="text-[#a0a0a0] font-semibold text-sm mt-6 mb-10">
                    Share your page to get whispers
                </p>
            )}
        </>
    );
}