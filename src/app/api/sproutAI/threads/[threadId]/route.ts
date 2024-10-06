import { openai } from '../../../openai';
import { assistantId } from '../../../assistant-config';

export const runtime = 'nodejs';

// Send a new message to a thread
export async function POST(request: any, { params: { threadId } }: any) {
  const { content } = await request.json();

  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: content,
  });

  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId,
  });

  return new Response(stream.toReadableStream());
}
