import { openai } from "../openai"

export const runtime = "nodejs";

// Create a new assistant
export async function POST() {
    const assistant = await openai.beta.assistants.create({
        instructions: "You are a helpful assistant.",
        name: "Quickstart Assistant",
        model: "gpt-3.5-turbo",
      });
      return Response.json({ assistantId: assistant.id });
}