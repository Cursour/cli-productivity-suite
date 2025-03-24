import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { configDir } from '../utils/config';

const NOTES_DIR = path.join(configDir, 'notes');

export const handleNotes = async (action: string, content?: string) => {
  try {
    await fs.mkdir(NOTES_DIR, { recursive: true });

    switch (action) {
      case 'add':
        if (!content) throw new Error('Note content required');
        const filename = `note-${Date.now()}.md`;
        await fs.writeFile(path.join(NOTES_DIR, filename), content);
        console.log(chalk.green(`✓ Note saved: ${filename}`));
        break;

      case 'list':
        const files = await fs.readdir(NOTES_DIR);
        console.log(chalk.yellow('📝 Your notes:'));
        files.forEach(file => console.log(`- ${file}`));
        break;

      default:
        console.log(chalk.red('❌ Unknown action. Use "add" or "list"'));
    }
  } catch (error) {
    console.error(chalk.red(`❌ Error: ${error.message}`));
  }
};
