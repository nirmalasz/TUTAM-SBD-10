"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";

export default function Register() {
    console.log("My Backend URL is:", process.env.NEXT_PUBLIC_API_URL);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        displayName: "",
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setIsLoading(true);

        const response = await registerUser(formData);

        try {
            if (response.success) {
            alert("Registration successful! Please log in.");
            router.push("/login"); // Redirect to login page
        } else {
            alert(`Registration failed: ${response.message}`);
                console.error("Backend response:", response);
        }
        } catch (error) {
            alert("Network error! Make sure your Express server is running.");
            console.error("Fetch error:", error);
        } finally{
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#D9D9D9]">
            <Header rightAction="login" />

            <main className="flex flex-1 items-center justify-center p-4">
                <div className="bg-white rounded-3xl w-full max-w-4xl flex flex-col md:flex-row p-6 gap-4 shadow-sm items-stretch">
                    <div className="relative w-full md:w-1/2 min-h-[400px] md:min-h-full rounded-2xl overflow-hidden">
                        <Image 
                            src="https://i.pinimg.com/736x/6d/1b/7e/6d1b7ef9976f66d136b8cc7b7fac6271.jpg" 
                            alt="Register Illustration" 
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-center py-4 px-4 md:px-10">
                        <h2 className="text-black font-bold text-3xl mb-8 text-center">Register</h2>
                        
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5" suppressHydrationWarning>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-black text-sm font-semibold ml-1">Username</label>
                                <input 
                                    name="username" 
                                    type="text" 
                                    required 
                                    value={formData.username} 
                                    onChange={handleChange}
                                    className="border border-[#6BAFD6] rounded-xl px-4 py-2.5 outline-none focus:ring-2 transition-all text-black" 
                                    suppressHydrationWarning
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-black text-sm font-semibold ml-1">Display Name</label>
                                <input 
                                    name="displayName" 
                                    type="text" 
                                    required 
                                    value={formData.displayName} 
                                    onChange={handleChange}
                                    className="border border-[#6BAFD6] rounded-xl px-4 py-2.5 outline-none focus:ring-2 transition-all text-black" 
                                    suppressHydrationWarning
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-black text-sm font-semibold ml-1">Email</label>
                                <input 
                                    name="email" 
                                    type="email" 
                                    required 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    className="border border-[#6BAFD6] rounded-xl px-4 py-2.5 outline-none focus:ring-2 transition-all text-black" 
                                    suppressHydrationWarning
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-black text-sm font-semibold ml-1">Password</label>
                                <input 
                                    name="password" 
                                    type="password" 
                                    required value={formData.password} 
                                    onChange={handleChange}
                                    className="border border-[#6BAFD6] rounded-xl px-4 py-2.5 outline-none focus:ring-2 transition-all text-black" 
                                    suppressHydrationWarning
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="bg-[#6BAFD6] text-black font-bold py-3 rounded-2xl mt-4 hover:bg-[#8FBFDC] transition-all disabled:opacity-50"
                            >
                                {isLoading ? "Registering..." : "Register"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}