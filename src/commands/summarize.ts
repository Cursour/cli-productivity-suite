import fs from 'fs/promises';
import chalk from 'chalk';
import OpenAI from 'openai';
import { getApiKey } from '../utils/config';

const openai = new OpenAI({
  apiKey: getApiKey()
});

export const handleSummarize = async (filePath: string, options: { length?: string }) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const summaryLength = parseInt(options.length || '200');

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: `Summarize this in ${summaryLength} characters:\n\n${content}`
      }]
    });

    console.log(chalk.green('📝 Meeting Summary:'));
    console.log(chalk.blue(response.choices[0].message.content));
  } catch (error) {
    console.error(chalk.red(`❌ Error: ${error.message}`));
  }
};
