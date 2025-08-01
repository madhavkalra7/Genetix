"use client";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
const Page = () => {
  const router=useRouter();
  const [value, setValue] = useState("");
  const trpc = useTRPC();
  const createProject = useMutation(trpc.projects.create.mutationOptions({
   onError : (error) =>{
    toast.error(error.message);
   },
   onSuccess : (data) =>{
    toast.success("Project created successfully");
    router.push(`/projects/${data.id}`);
   }
  }));
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center flex-col gap-y-4">
        <Input  value={value} onChange={(e) => setValue(e.target.value)}/>
        <Button disabled={createProject.isPending} onClick={() => createProject.mutate({ value : value })}>
          Submit
        </Button>
      </div>
    </div>
  );  
};
export default Page;