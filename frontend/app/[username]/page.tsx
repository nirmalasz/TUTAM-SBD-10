import Header from "@/components/header";
import Footer from "@/components/footer";
import ProfileHeader from "@/components/ProfileHeader";
import { AnsweredWhisper, UnansweredWhisper } from "@/components/Whispers";
import { getUserPageWhispers, getUserByUsername } from "@/lib/api";
export default async function UserPage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;
    const userRes = await getUserByUsername(username);

    if (!userRes.success) return <div>User not found</div>;

    const pageOwner = userRes.data;
    const whisperRes = await getUserPageWhispers(pageOwner._id);
    const whispers = whisperRes.data || [];

    return (
        <div className="flex flex-col min-h-screen bg-[#D9D9D9]">
            <Header rightAction="logout" />
            <main className="flex flex-col flex-1 items-center gap-4 py-8 px-4 w-full">
                <ProfileHeader pageOwner={pageOwner} whisperCount={whispers.length} />

                <div className="w-full flex flex-col items-center gap-4">
                    {whispers.map((whisper: any) =>
                        whisper.isAnswered ? (
                            <AnsweredWhisper
                                key={whisper._id}
                                whisper={whisper}
                                ownerName={pageOwner.displayName}
                                ownerUsername={pageOwner.username}
                            />
                        ) : (
                            <UnansweredWhisper
                                key={whisper._id}
                                whisper={whisper}
                                pageOwnerId={pageOwner._id}
                            />
                        ),
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
