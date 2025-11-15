
import chalk from 'chalk';
import { getTerminalWidth } from './ui';

const LEAPCODE_PURPLE = '#8A2BE2';
const LEAPCODE_BLUE = '#4169E1';

/**
 * Generates the ASCII art logo for LeapCode.
 * The logo is centered based on the terminal width.
 */
function getLogoArt(): string {
  const logoLines = [
    ' _                     _       _',
    '| |    ___  __ _ _ __ | | ___ | |__   ___  _ __',
    '| |   / _ \\/ _` | \'_ \\| |/ _ \\| \'_ \\ / _ \\| \'__|',
    '| |__|  __/ (_| | |_) | | (_) | |_) | (_) | |',
    '|_____\\___\\\\_\\_,_| .__/|_|\\___/|_.__/ \\___/|_|',
    '               |_|',
  ];

  const colorizedLogo = logoLines.map((line, index) => {
    const ratio = index / (logoLines.length - 1);
    const color = chalk.hex(interpolateColor(LEAPCODE_PURPLE, LEAPCODE_BLUE, ratio));
    return color(line);
  }).join('\n');

  return colorizedLogo;
}

/**
 * Interpolates between two hex colors.
 * @param color1 Start color in hex format.
 * @param color2 End color in hex format.
 * @param factor Interpolation factor (0 to 1).
 * @returns The interpolated hex color string.
 */
function interpolateColor(color1: string, color2: string, factor: number): string {
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);

  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}


/**
 * Centers a block of text within the terminal width.
 * @param text The block of text to center.
 * @returns The centered text block.
 */
function centerBlock(text: string): string {
    const width = getTerminalWidth();
    const lines = text.split('\n');
    const longestLineLength = Math.max(...lines.map(line => line.replace(/\u001b\[[0-9;]*m/g, '').length));
    const padding = Math.max(0, Math.floor((width - longestLineLength) / 2));
    const paddingStr = ' '.repeat(padding);
    return lines.map(line => paddingStr + line).join('\n');
}

/**
 * Displays the LeapCode welcome screen, including the logo and version information.
 * @param version The version of the LeapCode CLI.
 * @param author The author of the CLI.
 */
export function displayWelcome(version: string, author: string = 'LeapCode Team'): void {
  const logo = getLogoArt();
  const centeredLogo = centerBlock(logo);

  const versionText = `Version ${version}`;
  const authorText = `Developed by ${author}`;
  const infoLine = `${versionText} | ${authorText}`;

  const width = getTerminalWidth();
  const centeredInfoLine = ' '.repeat(Math.max(0, Math.floor((width - infoLine.length) / 2))) + infoLine;

  console.log(chalk.bold(centeredLogo));
  console.log(''); // Spacer line
  console.log(chalk.dim(centeredInfoLine));
  console.log(''); // Spacer line
}
