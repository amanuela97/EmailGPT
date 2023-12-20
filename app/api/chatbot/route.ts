import { type NextRequest, NextResponse } from 'next/server';
import { openai, loadStore } from '../../utils/openai';
import OpenAI from 'openai';

const MAX_TOKENS = 100;
//  /api/chatbot?question=hello
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const question = searchParams.get('question');

  if (
    !question ||
    typeof question !== 'string' ||
    typeof JSON.parse(question) !== 'string'
  ) {
    return NextResponse.json(
      { error: 'missing required params' },
      { status: 400, statusText: 'Bad Request' }
    );
  }

  try {
    const store = await loadStore();
    const results = await store.similaritySearch(JSON.parse(question), 1);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k-0613',
      temperature: 0,
      messages: [
        {
          role: 'assistant',
          content:
            'You are a helpful AI assistant. Answser questions to your best ability.',
        },
        {
          role: 'user',
          content: `Answer the following question using the provided context. If you cannot answer the question with the context, don't lie and make up stuff. Just say you need more context.
          Question: ${JSON.parse(question)}
    
          Context: ${results.map((r) => r.pageContent).join('\n')}`,
        },
      ],
      max_tokens: MAX_TOKENS,
    });

    return NextResponse.json(
      {
        data: response.choices[0].message.content,
        source: results.map((r) => r.metadata.source).join(', '),
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status, error.message, '[api/chat]');
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: error.status,
          statusText: error.code || error.type || error.message,
        }
      );
    } else {
      console.error(`Error with OpenAI API request, [api/chat]`, error);
      return NextResponse.json(
        { message: 'Error with OpenAI API request' },
        {
          status: 500,
          statusText: 'An error occurred during your request.',
        }
      );
    }
  }
}
