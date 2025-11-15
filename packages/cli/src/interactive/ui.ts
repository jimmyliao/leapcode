
import chalk from 'chalk';
import process from 'process';

// --- Color Palette ---
export const brandColors = {
  purple: '#8A2BE2', // Deep purple
  blue: '#4169E1',   // Royal blue
  cyan: '#00BFFF',   // Deep sky blue
  gold: '#FFD700',   // Gold for highlights
};

export const statusColors = {
  error: '#FF4136',    // Red
  success: '#2ECC40',  // Green
  warning: '#FF851B',  // Orange
  info: brandColors.cyan,
};

// --- Chalk Instances ---
export const color = {
  purple: chalk.hex(brandColors.purple),
  blue: chalk.hex(brandColors.blue),
  cyan: chalk.hex(brandColors.cyan),
  gold: chalk.hex(brandColors.gold),
  error: chalk.hex(statusColors.error),
  success: chalk.hex(statusColors.success),
  warning: chalk.hex(statusColors.warning),
  info: chalk.hex(statusColors.info),
  dim: chalk.dim,
  bold: chalk.bold,
  italic: chalk.italic,
};

// --- Terminal ---
/**
 * Gets the current width of the terminal.
 * @returns {number} The terminal width or a default of 80.
 */
export function getTerminalWidth(): number {
  return process.stdout.columns || 80;
}

// --- Box Drawing ---
const boxChars = {
    topLeft: '┌',
    topRight: '┐',
    bottomLeft: '└',
    bottomRight: '┘',
    horizontal: '─',
    vertical: '│',
};

/**
 * Creates a horizontal line that spans the terminal width.
 * @param char The character to use for the line.
 * @returns A string representing the horizontal line.
 */
export function horizontalLine(char: string = boxChars.horizontal): string {
    const width = getTerminalWidth();
    return color.dim(char.repeat(width));
}

/**
 * Wraps content in a styled box.
 * @param title The title for the box.
 * @param content The main content of the box.
 * @param titleColor A chalk instance for the title color.
 * @returns A string containing the formatted box.
 */
export function createBox(title: string, content: string, titleColor = color.gold): string {
    const width = getTerminalWidth();
    const innerWidth = width - 4; // 2 spaces padding on each side

    const top = color.dim(boxChars.topLeft + boxChars.horizontal) + ' ' + titleColor.bold(title) + ' ' + color.dim(boxChars.horizontal.repeat(innerWidth - title.length - 1) + boxChars.topRight);

    const wrappedContent = content.split('\n').map(line => {
        // Basic word wrapping
        const words = line.split(' ');
        const lines: string[] = [];
        let currentLine = '';
        for (const word of words) {
            if ((currentLine + ' ' + word).length > innerWidth) {
                lines.push(currentLine.padEnd(innerWidth));
                currentLine = word;
            } else {
                currentLine += (currentLine ? ' ' : '') + word;
            }
        }
        lines.push(currentLine.padEnd(innerWidth));
        return lines.join('\n');
    }).join('\n');
    
    const middle = wrappedContent.split('\n').map(line => 
        color.dim(boxChars.vertical) + '  ' + line + '  ' + color.dim(boxChars.vertical)
    ).join('\n');
    
    const bottom = color.dim(boxChars.bottomLeft + boxChars.horizontal.repeat(width - 2) + boxChars.bottomRight);

    return [top, middle, bottom].join('\n');
}

// --- Status & Progress ---

let progressInterval: NodeJS.Timeout | null = null;

/**
 * Starts a simple textual progress indicator.
 * @param text The text to display next to the spinner.
 */
export function startProgress(text: string): void {
  stopProgress(); // Ensure no multiple spinners are running
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;
  process.stdout.write('\x1B[?25l'); // Hide cursor

  progressInterval = setInterval(() => {
    const frame = color.purple(frames[i % frames.length]);
    process.stdout.write(`\r${frame} ${text} `);
    i++;
  }, 80);
}

/**
 * Stops the progress indicator and clears the line.
 */
export function stopProgress(): void {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
    process.stdout.write('\r' + ' '.repeat(getTerminalWidth()) + '\r');
    process.stdout.write('\x1B[?25h'); // Show cursor
  }
}

/**
 * Formats a status message with a colored prefix.
 * @param type The type of status (e.g., 'success', 'error').
 * @param message The message to display.
 * @returns A formatted string.
 */
export function formatStatus(type: 'success' | 'error' | 'warning' | 'info', message: string): string {
  switch (type) {
    case 'success':
      return `${color.success('✔')} ${message}`;
    case 'error':
      return `${color.error('✖')} ${message}`;
    case 'warning':
      return `${color.warning('⚠')} ${message}`;
    case 'info':
      return `${color.info('ℹ')} ${message}`;
  }
}

/**
 * Displays a formatted status message and stops any running progress indicator.
 * @param type The type of status.
 * @param message The message to display.
 */
export function showStatus(type: 'success' | 'error'| 'warning' | 'info', message: string): void {
    stopProgress();
    console.log(formatStatus(type, message));
}
