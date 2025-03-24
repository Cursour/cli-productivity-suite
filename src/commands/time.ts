import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { configDir } from '../utils/config';

interface TimeEntry {
  project: string;
  start: number;
  end?: number;
}

const TIME_FILE = path.join(configDir, 'time-entries.json');

export const handleTime = async (action: string, options: { project?: string }) => {
  try {
    let entries: TimeEntry[] = [];

    try {
      const data = await fs.readFile(TIME_FILE, 'utf-8');
      entries = JSON.parse(data);
    } catch {
      // File doesn't exist yet
    }

    switch (action) {
      case 'start':
        if (!options.project) throw new Error('Project name required (-p)');
        entries.push({ project: options.project, start: Date.now() });
        await fs.writeFile(TIME_FILE, JSON.stringify(entries, null, 2));
        console.log(chalk.green(`✓ Tracking started for "${options.project}"`));
        break;

      case 'stop':
        const activeEntry = entries.find(e => !e.end);
        if (!activeEntry) throw new Error('No active time tracking');
        activeEntry.end = Date.now();
        await fs.writeFile(TIME_FILE, JSON.stringify(entries, null, 2));
        console.log(chalk.green(`✓ Tracking stopped for "${activeEntry.project}"`));
        break;

      default:
        console.log(chalk.red('❌ Unknown action. Use "start" or "stop"'));
    }
  } catch (error) {
    console.error(chalk.red(`❌ Error: ${error.message}`));
  }
};
