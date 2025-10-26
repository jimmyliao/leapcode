/**
 * Configuration Manager
 *
 * Manages LeapCode CLI configuration
 * Stores config in ~/.leapcode/config.json
 *
 * @author LeapDesign (躍智)
 * @license MIT
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

export interface LeapCodeConfig {
  server?: {
    url?: string;
    port?: number;
  };
  gemini?: {
    apiKey?: string;
    outputFormat?: 'text' | 'json' | 'stream-json';
    sandbox?: boolean;
  };
  claude?: {
    apiKey?: string;
  };
  codex?: {
    apiKey?: string;
  };
  general?: {
    offline?: boolean;
    autoSync?: boolean;
  };
}

export class ConfigManager {
  private configPath: string;
  private config: LeapCodeConfig;

  constructor() {
    // Config path: ~/.leapcode/config.json
    const leapcodeDir = path.join(os.homedir(), '.leapcode');
    this.configPath = path.join(leapcodeDir, 'config.json');

    // Ensure directory exists
    if (!fs.existsSync(leapcodeDir)) {
      fs.mkdirSync(leapcodeDir, { recursive: true });
    }

    // Load existing config or create default
    this.config = this.load();
  }

  /**
   * Load configuration from file
   */
  private load(): LeapCodeConfig {
    try {
      if (fs.existsSync(this.configPath)) {
        const data = fs.readFileSync(this.configPath, 'utf-8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.warn('Failed to load config, using defaults');
    }

    // Return default config
    return {
      general: {
        offline: false,
        autoSync: true,
      },
    };
  }

  /**
   * Save configuration to file
   */
  private save(): void {
    try {
      fs.writeFileSync(
        this.configPath,
        JSON.stringify(this.config, null, 2),
        'utf-8'
      );
    } catch (error) {
      throw new Error(`Failed to save config: ${error instanceof Error ? error.message : error}`);
    }
  }

  /**
   * Get a configuration value
   */
  get(key: string): any {
    const keys = key.split('.');
    let value: any = this.config;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return undefined;
      }
    }

    return value;
  }

  /**
   * Set a configuration value
   */
  set(key: string, value: any): void {
    const keys = key.split('.');
    let current: any = this.config;

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!(k in current) || typeof current[k] !== 'object') {
        current[k] = {};
      }
      current = current[k];
    }

    current[keys[keys.length - 1]] = value;
    this.save();
  }

  /**
   * Get all configuration
   */
  getAll(): LeapCodeConfig {
    return { ...this.config };
  }

  /**
   * Delete a configuration value
   */
  delete(key: string): void {
    const keys = key.split('.');
    let current: any = this.config;

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!(k in current)) {
        return; // Key doesn't exist
      }
      current = current[k];
    }

    delete current[keys[keys.length - 1]];
    this.save();
  }

  /**
   * Reset to default configuration
   */
  reset(): void {
    this.config = {
      general: {
        offline: false,
        autoSync: true,
      },
    };
    this.save();
  }

  /**
   * Get config file path
   */
  getConfigPath(): string {
    return this.configPath;
  }
}

// Singleton instance
let instance: ConfigManager | null = null;

export function getConfigManager(): ConfigManager {
  if (!instance) {
    instance = new ConfigManager();
  }
  return instance;
}
