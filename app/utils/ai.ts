import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import {
  StructuredOutputParser,
  OutputFixingParser,
} from 'langchain/output_parsers';
import { z } from 'zod';

const message = z.object({
  message: z.string().describe('the message that is unique'),
});

const parser = StructuredOutputParser.fromZodSchema(
  z.array(message).describe('an array of all the unqiue messages')
);

const getPrompt = async (content: string, length: number) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: `Follow the instructions below! 
    1. Generate exactly ${length} different messages, no matter what!. 
    2. Make sure each message are different, no matter what!. 
    3. Format your response to match the format instructions, no matter what!\n{format_instructions}
    \nmessage: {message}
    `,
    inputVariables: ['message'],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    message: content,
  });

  return input;
};

export const analyze = async (
  prompt: string,
  names: string[],
  length: number
) => {
  const input = await getPrompt(prompt, length);
  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const output = await model.call(input);
  const regex = /\[name\]/g;

  try {
    const parsedResult = await parser.parse(output);
    return parsedResult.map((email, i) => ({
      message: email.message.replace(regex, names[i]),
    }));
  } catch (e) {
    const fixParser = OutputFixingParser.fromLLM(
      new OpenAI({
        temperature: 0,
        modelName: 'gpt-3.5-turbo',
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      }),
      parser
    );
    const fix = await fixParser.parse(output);
    return fix.map((email, i) => ({
      message: email.message.replace(regex, names[i]),
    }));
  }
};
