import chalk from 'chalk';

/**
 * LeapCode ASCII art logo with purple and cyan colors
 */
const LEAPCODE_LOGO = `
╭─────────────────────────────────────────────────────────────────╮
│                                                                 │
│   ██      ███████  █████  ██████   ██████  ██████  ██████  ███████   │
│   ██      ██      ██   ██ ██   ██ ██      ██    ██ ██   ██ ██        │
│   ██      █████   ███████ ██████  ██      ██    ██ ██   ██ █████     │
│   ██      ██      ██   ██ ██      ██      ██    ██ ██   ██ ██        │
│   ███████ ███████ ██   ██ ██       ██████  ██████  ██████  ███████   │
│                                                                 │
│            Version 0.4.3 | Developed by LeapCode Team          │
│                                                                 │
╰─────────────────────────────────────────────────────────────────╯
`;

/**
 * Display the LeapCode logo with colors
 * @param version The version to display
 * @param author The author to display
 */
export function displayWelcome(version: string, author: string = 'LeapCode Team'): void {
  // Purple border, cyan text
  const logo = `
${chalk.magenta('╭─────────────────────────────────────────────────────────────────╮')}
${chalk.magenta('│')}                                                                 ${chalk.magenta('│')}
${chalk.magenta('│')}${chalk.cyan('   ██      ███████  █████  ██████   ██████  ██████  ██████  ███████')}${chalk.magenta('   │')}
${chalk.magenta('│')}${chalk.cyan('   ██      ██      ██   ██ ██   ██ ██      ██    ██ ██   ██ ██')}${chalk.magenta('        │')}
${chalk.magenta('│')}${chalk.cyan('   ██      █████   ███████ ██████  ██      ██    ██ ██   ██ █████')}${chalk.magenta('     │')}
${chalk.magenta('│')}${chalk.cyan('   ██      ██      ██   ██ ██      ██      ██    ██ ██   ██ ██')}${chalk.magenta('        │')}
${chalk.magenta('│')}${chalk.cyan('   ███████ ███████ ██   ██ ██       ██████  ██████  ██████  ███████')}${chalk.magenta('   │')}
${chalk.magenta('│')}                                                                 ${chalk.magenta('│')}
${chalk.magenta('│')}${chalk.gray(`            Version ${version} | Developed by ${author}`)}${chalk.magenta('          │')}
${chalk.magenta('│')}                                                                 ${chalk.magenta('│')}
${chalk.magenta('╰─────────────────────────────────────────────────────────────────╯')}
  `;

  console.log(logo);
}
