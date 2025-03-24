#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { handleNotes } from './commands/notes';
import { handleTime } from './commands/time';
import { handleSummarize } from './commands/summarize';
import { checkConfig } from './utils/config';

const program = new Command();

// Initialize configuration
checkConfig();

program
  .name('prod')
  .description(chalk.blueBright('🚀 CLI Productivity Suite'))
  .version('0.1.0', '-v, --version', 'display version');

// Notes command
program
  .command('notes <action>')
  .description('Manage markdown notes (add/list/search)')
  .argument('[content]', 'Note content')
  .action(handleNotes);

// Time tracking command
program
  .command('time <action>')
  .description('Track work sessions (start/stop/report)')
  .option('-p, --project <name>', 'Project name')
  .action(handleTime);

// Meeting summary command
program
  .command('summarize <file>')
  .description('Generate meeting summary from transcript')
  .option('-l, --length <chars>', 'Summary length', '200')
  .action(handleSummarize);

program.parse(process.argv);
