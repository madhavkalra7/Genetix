import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event}) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next js developer.  You write readable,maintainable code.You write simple next.js and react snippets.",
      model: gemini({ model: 'gemini-2.0-flash'}),
    });
    const { output } = await codeAgent.run(
  'write the following snippet' + "create a button component",
);
return {
      summary: output,}
  },
);