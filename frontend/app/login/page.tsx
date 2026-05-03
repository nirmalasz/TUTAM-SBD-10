// app/login/page.tsx
"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await loginUser(formData);

        if (response.success) {
            alert(`Welcome back, ${response.data.displayName}!`);
            localStorage.setItem("whisper_user", JSON.stringify(response.data));
            router.push(`/${response.data.username}`); 
        } else {
            alert(response.message || "Invalid credentials");
        }
        setIsLoading(false);
    };
  return (
    <div className="flex flex-col min-h-screen bg-[#D9D9D9]">
      <Header rightAction="register" />

      <main className="flex flex-1 items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-4xl flex flex-col md:flex-row p-6 gap-4 shadow-sm items-stretch">
          <div className="relative w-full md:w-1/2 min-h-[320px] md:min-h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/6d/1b/7e/6d1b7ef9976f66d136b8cc7b7fac6271.jpg"
              alt="Login Illustration"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-8">
            <h2 className="text-black font-bold text-2xl mb-6 text-center">
              Login
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1" suppressHydrationWarning>
                <label className="text-black text-sm font-bold">Email</label>
                <input
                    name="email"
                    type="email"
                    className="border border-[#6BAFD6] rounded-lg px-3 py-2 outline-none  text-black"
                    required value={formData.email} 
                    onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1" suppressHydrationWarning>
                <label className="text-black text-sm font-bold">Password</label>
                <input
                  name="password"
                  type="password"
                  className="border border-[#6BAFD6] rounded-lg px-3 py-2 outline-none  text-black"
                  required value={formData.password} 
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#6BAFD6] text-black font-bold py-3 rounded-2xl mt-4 hover:bg-[#8FBFDC] transition-all disabled:opacity-50"
              >
                {isLoading ? "Logging In..." : "Log In"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
