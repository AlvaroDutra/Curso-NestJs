import { RegexProtocol } from './regex.protocol';

export class OnlyLowerCaseLetters implements RegexProtocol {
  execute(str: string): string {
    return str.replace(/[^a-z]/g, '');
  }
}
