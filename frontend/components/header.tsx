"use client";
import Link from 'next/link';
import { getLoggedInUser, logout } from '@/lib/auth';
import { useEffect, useState } from 'react';

interface HeaderProps {
    rightAction: 'login' | 'register' | 'logout';
}

export default function Header({ rightAction }: HeaderProps) {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const loggedInUser = getLoggedInUser();
        setUser(loggedInUser);
    }, []);

    const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault(); 
    logout(); 
    setUser(null);
    };

    const renderRightAction = () => {
        if (user) {
            return (
                <div className="flex items-center gap-4">
                    <Link href={`/${user.username}`} className="text-black font-semibold text-sm ">
                        My Page
                    </Link>
                    <button onClick={handleLogout} className="text-black font-medium text-sm hover:underline">
                        Log out
                    </button>
                </div>
            );
        }
         if (rightAction === 'login') return <Link href="/login" className="text-black font-medium text-sm hover:underline">Login</Link>;
        if (rightAction === 'register') return <Link href="/register" className="text-black font-medium text-sm hover:underline">Register</Link>;
        
        return <Link href="/login" className="text-black font-medium text-sm hover:underline">Login</Link>;
    };

    return (
        <header className="flex w-full items-center justify-between bg-[#F9FBFD] px-6 py-4 shadow-sm z-10">
            <Link href="/" className="text-black font-bold text-xl tracking-tight">
                whisper.me
            </Link>

            {renderRightAction()}
        </header>
    );
}