"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const trpc = useTRPC();

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError: (error) => toast.error(error.message),
      onSuccess: (data) => {
        toast.success("🚀 Project created");
        router.push(`/projects/${data.id}`);
      },
    })
  );

  return (
    <main
      className="min-h-screen w-full bg-black bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between px-6 pt-16 pb-10"
      style={{
        backgroundImage: `url('/moon.jpg')`, // image must be in /public folder
      }}
    >
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-white text-5xl md:text-6xl font-extrabold tracking-widest font-[Orbitron] drop-shadow-xl">
          Build With <span className="text-white/80">Genetix</span>
        </h1>
        <p className="text-gray-300 mt-4 text-sm md:text-lg font-light">
          Your imagination. AI execution. 🚀
        </p>
      </div>

      {/* Input + Prompts Section */}
      <div className="backdrop-blur-md bg-black/40 border border-gray-700 shadow-2xl rounded-3xl px-8 py-10 w-full max-w-3xl text-center space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Input
            className="bg-black/40 border border-white/30 placeholder:text-gray-400 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white font-[Orbitron]"
            placeholder="🌑 e.g. Build a crypto dashboard"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            disabled={createProject.isPending || !value}
            onClick={() => createProject.mutate({ value })}
            className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-xl font-bold font-[Orbitron] transition"
          >
            Launch 🚀
          </Button>
        </div>

        {/* Demo Prompts */}
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {[
            "Create Netflix Clone",
            "Build Admin Dashboard",
            "create Kanban Board",
            "create Calculator",
            "Build E-commerce Site",
            "Build Sudoku Solver",
          ].map((prompt) => (
            <Button
              key={prompt}
              variant="outline"
              onClick={() => setValue(prompt)}
              className="text-black bg-white/80 hover:bg-white/90 border-white/20 rounded-full px-4 py-2 transition font-[Orbitron]"
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
