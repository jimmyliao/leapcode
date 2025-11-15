#!/usr/bin/env node

/**
 * LeapCode CLI - Multi-AI Coding Wrapper
 *
 * Main CLI entry point
 *
 * @author LeapDesign (躍智)
 * @license MIT
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { APP_META, getBackgroundTaskManager, ShellExecutionAdapter } from '@jimmyliao/leapcode-core';
import { GeminiWrapper } from './wrappers/gemini';
import { ClaudeWrapper } from './wrappers/claude';
import { CodexWrapper } from './wrappers/codex';
import dotenv from 'dotenv';
import { ConfigManager } from './config/manager'; // Import ConfigManager
import { spawn } from 'child_process';
import { startInteractiveMode } from './interactive/repl';

// Load environment variables
dotenv.config();

const program = new Command();
const configManager = new ConfigManager(); // Initialize ConfigManager

/**
 * Helper function to get API key with precedence: CLI option > Environment Variable > Config File
 */
function getApiKey(
  tool: 'gemini' | 'claude' | 'codex',
  cliOptionKey?: string,
  envVarName?: string,
): string | undefined {
  if (cliOptionKey) {
    return cliOptionKey;
  }
  if (envVarName && process.env[envVarName]) {
    return process.env[envVarName];
  }
  return configManager.get(`${tool}.apiKey`);
}

/**
 * Run prerequisite checks for Node.js and npm versions.
 */
async function runPrerequisiteChecks(): Promise<void> {
  console.log(chalk.cyan.bold('\nRunning prerequisite checks...'));

  // Check Node.js version
  const nodeVersion = process.version;
  const requiredNodeVersion = 'v18.0.0'; // As per README.md
  const nodeMajor = parseInt(nodeVersion.slice(1).split('.')[0]);
  const requiredNodeMajor = parseInt(requiredNodeVersion.slice(1).split('.')[0]);
  if (nodeMajor < requiredNodeMajor) {
    console.log(chalk.red(`\n❌ Node.js version ${nodeVersion} is too old.`));
    console.log(chalk.yellow(`Please upgrade to Node.js ${requiredNodeVersion} or higher.`));
    process.exit(1);
  }
  console.log(chalk.green(`✅ Node.js version: ${nodeVersion}`));

  // Check npm version
  try {
    const npmVersion = require('child_process').execSync('npm --version', { encoding: 'utf-8' }).trim();
    const requiredNpmVersion = '9.0.0'; // As per README.md
    const npmMajor = parseInt(npmVersion.split('.')[0]);
    const requiredNpmMajor = parseInt(requiredNpmVersion.split('.')[0]);
    if (npmMajor < requiredNpmMajor) {
      console.log(chalk.red(`\n❌ npm version ${npmVersion} is too old.`));
      console.log(chalk.yellow(`Please upgrade to npm ${requiredNpmVersion} or higher.`));
      process.exit(1);
    }
    console.log(chalk.green(`✅ npm version: ${npmVersion}`));
  } catch (error) {
    console.log(chalk.red('\n❌ npm is not installed or not found in PATH.'));
    console.log(chalk.yellow('Please install npm.'));
    process.exit(1);
  }

  console.log(chalk.cyan.bold('Prerequisite checks complete.\n'));
}

program
  .name('leapcode')
  .description(APP_META.DESCRIPTION)
  .version(APP_META.VERSION);

// Main command - start interactive mode or wrap an AI tool
program
  .argument('[command]', 'AI tool to wrap (gemini, claude, codex). If omitted, starts interactive mode.', 'interactive')
  .option('-s, --server <url>', 'LeapCode server URL')
  .option('--offline', 'Run without mobile sync')
  .option('--api-key <key>', 'AI API key (or use environment variable)')
  .action(async (command: string, options) => {
    if (command.toLowerCase() === 'interactive') {
      startInteractiveMode(APP_META.VERSION);
      return;
    }
    
    await runPrerequisiteChecks(); // Call prerequisite checks here

    console.log(chalk.cyan.bold(`\n🚀 ${APP_META.NAME} CLI v${APP_META.VERSION}`));
    console.log(chalk.gray('━'.repeat(50)));

    const config = {
      serverUrl: options.server,
      offline: options.offline || false,
    };

    try {
      switch (command.toLowerCase()) {
        case 'gemini':
          console.log(chalk.green('Starting Gemini CLI wrapper...'));
          const geminiApiKey = getApiKey('gemini', options.apiKey, 'GEMINI_API_KEY');
          if (!geminiApiKey) {
            console.log(chalk.red('\n❌ Gemini API key is missing.'));
            console.log(chalk.yellow('Please set it via --api-key option, GEMINI_API_KEY environment variable, or `leapcode config set gemini.apiKey <key>`.'));
            process.exit(1);
          }
          const geminiWrapper = new GeminiWrapper({
            ...config,
            apiKey: geminiApiKey,
          });

          // Check installation
          const installed = await geminiWrapper.isInstalled();
          if (!installed) {
            console.log(chalk.red('\n❌ Gemini CLI is not installed'));
            console.log(chalk.yellow('\nInstall it with:'));
            console.log(chalk.cyan('  npm install -g @google/gemini-cli'));
            process.exit(1);
          }

          // Get version
          const version = await geminiWrapper.getVersion();
          console.log(chalk.gray(`   Gemini CLI version: ${version}`));

          // Start wrapper
          await geminiWrapper.start();
          break;

        case 'claude':
          console.log(chalk.yellow('⚠️  Claude Code wrapper is currently in planning stage'));
          console.log(chalk.gray('   This feature will be available in a future release.'));
          console.log(chalk.cyan('\n   Currently available: gemini'));
          console.log(chalk.gray('   Planned: claude, codex'));
          process.exit(0);
          break;

        case 'codex':
          console.log(chalk.yellow('⚠️  Codex wrapper is currently in planning stage'));
          console.log(chalk.gray('   This feature will be available in a future release.'));
          console.log(chalk.cyan('\n   Currently available: gemini'));
          console.log(chalk.gray('   Planned: claude, codex'));
          process.exit(0);
          break;

        default:
          console.log(chalk.red(`❌ Unknown AI tool: ${command}`));
          console.log(chalk.cyan('\n   Currently available: gemini'));
          console.log(chalk.gray('   Planned: claude, codex'));
          process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red('\n❌ Error:'), error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

// Background task command
program
  .command('run <command>')
  .option('-d, --detach', 'Run in background (returns immediately with task ID)')
  .description('Run a shell command')
  .action(async (command: string, options) => {
    try {
      if (options.detach) {
        // Run in background
        console.log(chalk.cyan(`🚀 Running background task: ${command}`));

        const taskManager = getBackgroundTaskManager();
        const child = spawn('sh', ['-c', command], {
          stdio: ['pipe', 'pipe', 'pipe'],
          cwd: process.cwd(),
        });

        const handle = new ShellExecutionAdapter(child);
        const task = taskManager.registerTask(command, process.cwd(), handle);

        console.log(chalk.green(`✅ Background task registered`));
        console.log(chalk.gray(`   Task ID: ${task.id}`));
        console.log(chalk.gray(`   PID: ${task.pid}`));
        console.log(chalk.gray(`   Status: ${task.status}`));
        console.log(chalk.cyan(`\nUse 'leapcode task <id>' to check status`));
      } else {
        // Run in foreground
        console.log(chalk.cyan(`🚀 Running: ${command}`));

        const child = spawn('sh', ['-c', command], {
          stdio: 'inherit',
          cwd: process.cwd(),
        });

        const exitCode = await new Promise<number>((resolve) => {
          child.on('close', (code) => resolve(code || 0));
        });

        if (exitCode === 0) {
          console.log(chalk.green('\n✅ Command completed successfully'));
        } else {
          console.log(chalk.red(`\n❌ Command failed with exit code: ${exitCode}`));
          process.exit(exitCode);
        }
      }
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

// Task list command
program
  .command('task')
  .description('Manage background tasks')
  .action(() => {
    const taskManager = getBackgroundTaskManager();
    const tasks = taskManager.listTasks();

    if (tasks.length === 0) {
      console.log(chalk.yellow('No background tasks'));
      return;
    }

    console.log(chalk.cyan('Background Tasks:'));
    console.log('━'.repeat(80));
    tasks.forEach(task => {
      console.log(`ID: ${chalk.blue(task.id)}`);
      console.log(`  Command: ${task.command}`);
      console.log(`  PID: ${task.pid}`);
      console.log(`  Status: ${task.status === 'running' ? chalk.green(task.status) : chalk.yellow(task.status)}`);
      console.log(`  Created: ${task.startTime.toISOString()}`);
      console.log('');
    });
  });

// Config command
const config = program.command('config').description('Manage configuration');

config
  .command('set')
  .argument('<key>', 'Configuration key (e.g., gemini.apiKey)')
  .argument('<value>', 'Configuration value')
  .description('Set configuration value')
  .action((key, value) => {
    configManager.set(key, value);
    console.log(chalk.green(`Configuration key "${key}" set to "${value}".`));
  });

config
  .command('get')
  .argument('<key>', 'Configuration key (e.g., gemini.apiKey)')
  .description('Get configuration value')
  .action((key) => {
    const value = configManager.get(key);
    if (value !== undefined) {
      console.log(chalk.blue(`Configuration key "${key}": ${value}`));
    } else {
      console.log(chalk.yellow(`Configuration key "${key}" not found.`));
    }
  });

config
  .command('list')
  .description('List all configuration')
  .action(() => {
    const allConfig = configManager.getAll();
    console.log(chalk.blue('Current Configuration:'));
    console.log(JSON.stringify(allConfig, null, 2));
  });

// Parse arguments
program.parse();
