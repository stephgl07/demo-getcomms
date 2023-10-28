import { Gitmoji, GitmojiList } from './gitmojis.interface';
import gitmojiDataRaw from './gitmojis.json';

const gitmojiData = gitmojiDataRaw as GitmojiList;

const emojiMap: Record<string, string> = gitmojiData.gitmojis.reduce<Record<string, string>>((acc, gitmoji: Gitmoji) => {
  acc[gitmoji.code] = gitmoji.emoji;
  return acc;
}, {});


const shortcodeToEmoji = (text?: string): string => {
  if(!text) return "";
  return text.replace(/:(\w+):/g, (match) => emojiMap[match] || match);
}

export default shortcodeToEmoji;