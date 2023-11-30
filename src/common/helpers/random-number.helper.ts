import * as crypto from 'crypto';

export default function generateRandomNumber(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

export function generatePassword(length) {
  return crypto.randomBytes(length).toString('hex');
}

export function makeOtp(number) {
  let result = '';
  const characters = '123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < number; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
