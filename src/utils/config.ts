import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import chalk from 'chalk';

export const configDir = path.join(os.homedir(), '.prod-cli');

export const checkConfig = async () => {
  try {
    await fs.mkdir(configDir, { recursive: true });
  } catch (error) {
    console.error(chalk.red(`❌ Failed to create config directory: ${error.message}`));
  }
};

export const getApiKey = (): string => {
  try {
    return process.env.OPENAI_API_KEY || '';
  } catch {
    throw new Error('OPENAI_API_KEY not found in environment variables');
  }
};
