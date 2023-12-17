import { type NextRequest, NextResponse } from 'next/server';
import { openai } from '../../utils/openai';
import { emailGeneratorFunctionSchema } from '../../utils/data';
import { Message } from '../../utils/types';
import OpenAI from 'openai';

const MAX_TOKENS = 150;
//  /api/messages?message=hello&names=hello&length=100
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const message = searchParams.get('message');
  const names = searchParams.get('names');
  const length = searchParams.get('length');

  if (!message || !names || !length) {
    return NextResponse.json(
      { error: 'missing required params' },
      { status: 400, statusText: 'Bad Request' }
    );
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0613',
      messages: [
        {
          role: 'system',
          content:
            'You are a text generator that takes in a text message and paraphrases it without losing the context or meaning.',
        },
        {
          role: 'user',
          content: `Follow the instructions below! 
          1. Generate exactly ${length} paraphrased messages from the text message provided below, no matter what!. 
          2. Make sure each paraphrased message are different, no matter what!.
          3. Make sure to paraphrase the whole text message provided below!.
          4. Now generate the paraphrased messages from the following text message: ${JSON.parse(
            message
          )}
          `,
        },
      ],
      functions: [emailGeneratorFunctionSchema],
      function_call: { name: 'generate_emails' },
      temperature: 0,
      n: Number(length),
      max_tokens: MAX_TOKENS,
    });

    if (response.choices[0].message.function_call?.arguments) {
      const args: { messages: Message[] } = JSON.parse(
        response.choices[0].message.function_call?.arguments
      );
      const regex = /\[name\]/g;
      const data = args.messages.map(({ message }, i) => ({
        message: message.replace(regex, JSON.parse(names)[i]),
      }));
      return NextResponse.json(data, { status: 200 });
    }
  } catch (error: any) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status, error.message);
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
      console.error(`Error with OpenAI API request`);
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
