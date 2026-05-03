import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-[#F9FBFD]">
            <main className="flex flex-col flex-1 items-center justify-center gap-6">
                <div className="text-center flex flex-col gap-2">
                    <h1 className="text-black font-bold text-3xl tracking-tight">whisper.me</h1>
                    <p className="text-black text-lg font-medium">Get your whispers</p>
                </div>
                
                <div className="flex flex-col gap-3 w-full max-w-[280px]">
                    <Link href="/register" className="bg-[#6BAFD6] text-white text-center py-2.5 rounded-xl font-medium hover:bg-[#8FBFDC] transition-colors">
                        Create account
                    </Link>
                    <Link href="/login" className="bg-[#6BAFD6] text-white text-center py-2.5 rounded-xl font-medium hover:bg-[#8FBFDC] transition-colors">
                        I already have an account
                    </Link>
                </div>
            </main>
        </div>
    );
}