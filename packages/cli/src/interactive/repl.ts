
import { getPrompt, LeapCodePrompt, AutocompleteHandler } from './prompt';
import { displayWelcome } from './logo';
import { color, showStatus, createBox, startProgress, stopProgress } from './ui';

type CommandAction = (args: string[]) => void | Promise<void>;

interface Command {
  description: string;
  action: CommandAction;
  usage?: string;
}

/**
 * The REPL engine for LeapCode.
 */
export class Repl {
  private prompt: LeapCodePrompt;
  private commands: Map<string, Command> = new Map();
  private isRunning: boolean = false;
  private version: string;

  constructor(version: string = '0.4.0') {
    this.prompt = getPrompt();
    this.version = version;
    this.registerDefaultCommands();
    this.prompt.setAutocompleteHandler(this.autocomplete.bind(this));
  }

  /**
   * Starts the REPL.
   */
  public start(): void {
    if (this.isRunning) {
      showStatus('warning', 'REPL is already running.');
      return;
    }
    displayWelcome(this.version);
    this.prompt.start(this.handleInput.bind(this));
    this.isRunning = true;
  }

  /**
   * Registers a new command.
   * @param name The name of the command.
   * @param command The command definition.
   */
  public registerCommand(name: string, command: Command): void {
    if (this.commands.has(name)) {
      showStatus('warning', `Command "${name}" is already registered. Overwriting.`);
    }
    this.commands.set(name, command);
  }

  /**
   * Handles a line of input from the prompt.
   * @param line The input line.
   */
  private async handleInput(line: string): Promise<void> {
    const [commandName, ...args] = this.parseLine(line);
    
    if (!commandName) {
      return;
    }

    const command = this.commands.get(commandName);

    if (command) {
      try {
        await command.action(args);
      } catch (error: any) {
        showStatus('error', `Error executing "${commandName}": ${error.message}`);
      }
    } else {
      showStatus('error', `Unknown command: "${commandName}". Type "help" for a list of commands.`);
    }
  }

  /**
   * Parses an input line into a command and arguments.
   * @param line The input line.
   * @returns An array containing the command name and arguments.
   */
  private parseLine(line: string): string[] {
    // This can be expanded to handle quoted arguments, etc.
    return line.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g)?.map(arg => arg.replace(/^"|"$/g, '').replace(/^'|'$/g, '')) || [];
  }

  /**
   * Registers the default built-in commands.
   */
  private registerDefaultCommands(): void {
    this.registerCommand('help', {
      description: 'Displays this help message.',
      action: () => this.showHelp(),
      usage: 'help [command]'
    });

    this.registerCommand('exit', {
      description: 'Exits the LeapCode CLI.',
      action: () => this.prompt.close()
    });

    this.registerCommand('clear', {
        description: 'Clears the terminal screen.',
        action: () => console.clear()
    });
    
    this.registerCommand('run', {
      description: 'Run a task with a specified AI provider.',
      action: async (args) => {
        const [provider, ...task] = args;
        if (!provider || task.length === 0) {
          showStatus('error', 'Usage: run <provider> <task description>');
          return;
        }
        startProgress(`Running task with ${provider}...`);
        // Simulate an async operation
        await new Promise(resolve => setTimeout(resolve, 2000));
        stopProgress();
        showStatus('success', `Task completed with ${provider}: "${task.join(' ')}"`);
      },
      usage: 'run <gemini|claude|codex> <task...='
    });

    this.registerCommand('task', {
        description: 'Alias for the "run" command.',
        action: this.commands.get('run')?.action || (() => {}),
        usage: 'task <gemini|claude|codex> <task...='
    });

    this.registerCommand('config', {
      description: 'Manage LeapCode configuration.',
      action: (args) => {
        showStatus('info', `Configuration command called with: ${args.join(' ')}. (Not implemented)`);
      },
      usage: 'config set <key> <value> | config get <key>'
    });
  }

  /**
   * Displays the help message for all commands or a specific command.
   */
  private showHelp(): void {
    let helpText = 'Available Commands:\n\n';
    
    this.commands.forEach((command, name) => {
      helpText += `${color.gold(name.padEnd(15))}${command.description}\n`;
      if (command.usage) {
        helpText += `${' '.repeat(15)}${color.dim('Usage: ' + command.usage)}\n`;
      }
      helpText += '\n';
    });

    console.log(createBox('LeapCode Help', helpText.trim()));
  }

  /**
   * Autocomplete handler for commands and future plugins.
   */
  private autocomplete(line: string): [string[], string] {
    const parts = line.split(' ');
    const commandName = parts[0];
    
    if (parts.length === 1) {
        const hits = Array.from(this.commands.keys()).filter((c) => c.startsWith(commandName));
        return [hits.length ? hits : [], line];
    }
    
    // Future: Add argument-level autocompletion based on the command
    // For example, for 'run', suggest 'gemini', 'claude', 'codex'
    if (commandName === 'run' || commandName === 'task') {
        const providers = ['gemini', 'claude', 'codex'];
        const hits = providers.filter(p => p.startsWith(parts[1]));
        return [hits, parts[1]];
    }

    return [[], line];
  }
}

/**
 * Main entry point for the interactive CLI.
 */
export function startInteractiveMode(version: string): void {
  const repl = new Repl(version);
  repl.start();
}
