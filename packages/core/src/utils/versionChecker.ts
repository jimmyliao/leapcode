/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import * as semver from 'semver';

const versionFilePath = path.join(process.cwd(), '.gemini-cli-version');

interface VersionConfig {
  required_version: string;
  commit: string;
}

/**
 * Checks if the provided version of gemini-cli meets the minimum requirement.
 *
 * @param currentVersion The currently installed version of gemini-cli.
 * @returns An object indicating if the version is supported and the required version.
 */
export async function checkGeminiCliVersion(
  currentVersion: string,
): Promise<{ supported: boolean; requiredVersion: string }> {
  try {
    const fileContent = await fs.readFile(versionFilePath, 'utf-8');
    const config: VersionConfig = JSON.parse(fileContent);
    const requiredVersion = config.required_version;

    if (!requiredVersion) {
      throw new Error('`required_version` not found in .gemini-cli-version');
    }

    // Clean versions to handle potential prefixes like 'v'
    const cleanCurrentVersion = semver.clean(currentVersion) || '0.0.0';
    const cleanRequiredVersion = semver.clean(requiredVersion) || '0.0.0';

    return {
      supported: semver.gte(cleanCurrentVersion, cleanRequiredVersion),
      requiredVersion: requiredVersion,
    };
  } catch (error) {
    console.error('Error reading or parsing .gemini-cli-version file:', error);
    // Graceful degradation: assume not supported if file is missing or invalid
    return {
      supported: false,
      requiredVersion: 'unknown',
    };
  }
}
