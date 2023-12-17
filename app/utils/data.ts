import z, { ZodError } from 'zod';
import { Email } from './types';

export const imgUrl =
  'data:image/jpeg;base64,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';

export const emailOptions: Email[] = [
  {
    value: 'babyzewdie@gmail.com',
    image:
      'https://lh3.googleusercontent.com/a/AAcHTtc9BvCS3WqN_tTJfNRVXjI-9NemusbtAp9oMmDB_TN9DQ=s80-p-k-rw-no-mo',
  },
  {
    value: 'nabeelbaig962@gmail.com',
    image:
      'https://lh3.googleusercontent.com/a-/AD_cMMQh9R9PU5ZuIsCtbewDr-O321_jopLvHu_zTW22sfR8kzY=s40-p',
  },
  {
    value: 'meronzewdie@gmail.com',
    image:
      'https://lh3.googleusercontent.com/cm/AJSPFByXsl641RgSwCZ9-LWAieVexOI8P1eLeKFryo7fWWbKBJgL2aByj13blGMVuJJV=s40-p',
  },
].map((option) => ({ ...option, label: option.value }));

export const validateEmail = (email: string) => {
  try {
    z.string().email({ message: 'Invalid email address' }).parse(email);
    return false;
  } catch (error: unknown) {
    let message = 'something went wrong validating email';
    if (error instanceof ZodError) {
      console.error(`Validation error: ${error.errors[0].message}`);
      message = error.errors[0].message;
    }
    return message;
  }
};

export const emailGeneratorFunctionSchema = {
  name: 'generate_emails',
  description:
    'paraphrases and generates new text from the input text message.',
  parameters: {
    type: 'object',
    properties: {
      messages: {
        type: 'array',
        description: 'An array containing the paraphrased text messages',
        items: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'The paraphrased text message',
            },
          },
        },
      },
    },
  },
  required: ['messages', 'message'],
};
