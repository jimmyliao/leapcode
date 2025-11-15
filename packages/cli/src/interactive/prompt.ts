
import readline from 'readline';
import { color } from './ui';
import os from 'os';
import path from 'path';
import fs from 'fs';

const HISTORY_FILE = '.leapcode_history';

export type AutocompleteHandler = (line: string) => [string[], string];

export interface LeapCodePrompt {
  start(handler: (line: string) => void | Promise<void>): void;
  close(): void;
  setPrompt(prompt: string): void;
  getPrompt(): string;
  setAutocompleteHandler(handler: AutocompleteHandler): void;
}

class Prompt implements LeapCodePrompt {
  private rl: readline.Interface;
  private currentPrompt: string;
  private autocompleteHandler: AutocompleteHandler | null = null;
  private history: string[] = [];
  private historyPath: string;

  constructor(prompt: string = 'leapcode> ') {
    this.currentPrompt = color.bold(color.purple(prompt));
    this.historyPath = path.join(os.homedir(), HISTORY_FILE);
    this.loadHistory();
    
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: this.currentPrompt,
      history: this.history,
      completer: this.completer.bind(this),
      historySize: 1000,
    });
  }

  /**
   * Starts the prompt and listens for user input.
   * @param handler The function to call with the user's input line.
   */
  public start(handler: (line: string) => void | Promise<void>): void {
    this.rl.on('line', async (line) => {
      const sanitizedLine = this.sanitizeInput(line);
      if (sanitizedLine) {
        this.history.push(sanitizedLine);
        await handler(sanitizedLine);
      }
      this.rl.prompt();
    });

    this.rl.on('close', () => {
      this.saveHistory();
      console.log(color.gold('\nGoodbye!'));
      process.exit(0);
    });

    this.rl.prompt();
  }

  /**
   * Closes the readline interface.
   */
  public close(): void {
    this.rl.close();
  }
  
  /**
   * Sets the prompt string.
   * @param prompt The new prompt string.
   */
  public setPrompt(prompt: string): void {
      this.currentPrompt = prompt;
      this.rl.setPrompt(this.currentPrompt);
  }

  /**
   * Gets the current prompt string.
   */
  public getPrompt(): string {
      return this.currentPrompt;
  }

  /**
   * Sets the handler for tab-completion.
   * @param handler The autocomplete handler function.
   */
  public setAutocompleteHandler(handler: AutocompleteHandler): void {
    this.autocompleteHandler = handler;
  }

  /**
   * Sanitizes user input to remove leading/trailing whitespace.
   * @param input The raw user input.
   * @returns The sanitized string.
   */
  private sanitizeInput(input: string): string {
    return input.trim();
  }

  /**
   * The completer function for readline.
   * @param line The current line of text.
   */
  private completer(line: string): [string[], string] {
    if (this.autocompleteHandler) {
      return this.autocompleteHandler(line);
    }
    return [[], line];
  }

  /**
   * Loads command history from the history file.
   */
  private loadHistory(): void {
    try {
      if (fs.existsSync(this.historyPath)) {
        const historyData = fs.readFileSync(this.historyPath, 'utf-8');
        this.history = historyData.split('\n').filter(line => line.trim() !== '');
      }
    } catch (error) {
      console.error(color.error('Could not load command history.'), error);
    }
  }

  /**
   * Saves command history to the history file.
   */
  private saveHistory(): void {
    try {
      // Get unique history entries, prioritizing recent ones
      const uniqueHistory = [...new Set(this.history.reverse())].reverse();
      fs.writeFileSync(this.historyPath, uniqueHistory.join('\n'));
    } catch (error) {
      console.error(color.error('Could not save command history.'), error);
    }
  }
}

/**
 * Singleton instance of the prompt.
 */
const promptInstance = new Prompt();

/**
 * Factory function to get the prompt instance.
 */
export function getPrompt(): LeapCodePrompt {
  return promptInstance;
}
