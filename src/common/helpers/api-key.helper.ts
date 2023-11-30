import * as crypto from 'crypto';

export function generateRandomApiKey() {
  return crypto.randomBytes(16).toString('hex');
}
