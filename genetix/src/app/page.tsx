'use client';
import {Input} from "@/components/ui/input";
import { useState } from "react";
import { inngest } from "@/inngest/client";
const Page= ()=>{
  const [value, setValue] = useState("");

  return(
   <div>
    <h1>Genetix</h1>
    <button
      onClick={async () => {
        await inngest.send({
          name: 'test/hello.world',
          data: { value },
        });
      }}
    >
      Send
    </button>
    <Input value={value} onChange={(e) => setValue(e.target.value)} />
    test
   </div>
  );
}
export default Page;