interface Gitmoji {
  emoji: string;
  entity: string;
  code: string;
  description: string;
  name: string;
  semver: string | null;
}

interface GitmojiList {
  $schema: string;
  gitmojis: Gitmoji[];
}

export type { Gitmoji, GitmojiList };
