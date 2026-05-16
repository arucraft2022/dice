export type Lang = 'en' | 'ja';

type ParseResult = {
  mode: 'help' | 'roll' | 'error';
  count?: number;
  label: boolean;
  art: boolean;
  artBox: boolean;
  helpLang: Lang;
  error?: string;
};

const DICE_ART = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

const BOX_PATTERNS = [
  ['│     │', '│  ●  │', '│     │'],
  ['│ ●   │', '│     │', '│   ● │'],
  ['│ ●   │', '│  ●  │', '│   ● │'],
  ['│ ● ● │', '│     │', '│ ● ● │'],
  ['│ ● ● │', '│  ●  │', '│ ● ● │'],
  ['│ ● ● │', '│ ● ● │', '│ ● ● │'],
];

const MESSAGES: Record<Lang, { usage: string[] }> = {
  en: {
    usage: [
      'Usage: npx dice <number> [options]',
      '',
      'Commands:',
      '  npx dice                Show help (English)',
      '  npx dice help           Show help (English)',
      '  npx dice help --ja      Show help (Japanese)',
      '  npx dice <1-9>          Roll N dice',
      '',
      'Options:',
      '  --label     Show labels under each die',
      '  --art       Show emoji dice (⚀-⚅)',
      '  --art-box   Show boxed text dice',
      '  --ja        Only valid for help output (Japanese)',
    ],
  },
  ja: {
    usage: [
      '使い方: npx dice <number> [options]',
      '',
      'コマンド:',
      '  npx dice                ヘルプを表示（英語）',
      '  npx dice help           ヘルプを表示（英語）',
      '  npx dice help --ja      ヘルプを表示（日本語）',
      '  npx dice <1-9>          N個のダイスを振る',
      '',
      'オプション:',
      '  --label     ダイスの下にラベルを表示',
      '  --art       絵文字ダイス（⚀-⚅）を表示',
      '  --art-box   テキスト枠ダイスを表示',
      '  --ja        ヘルプ表示時のみ有効（日本語）',
    ],
  },
};

export function parseArgs(args: string[]): ParseResult {
  const label = args.includes('--label');
  const art = args.includes('--art');
  const artBox = args.includes('--art-box');

  if (art && artBox) {
    return {
      mode: 'error',
      label,
      art,
      artBox,
      helpLang: 'en',
      error: 'Error: --art and --art-box cannot be used together',
    };
  }

  if (args.length === 0 || args[0] === 'help') {
    const helpLang: Lang = args.includes('--ja') ? 'ja' : 'en';
    return {
      mode: 'help',
      label,
      art,
      artBox,
      helpLang,
    };
  }

  const count = Number(args[0]);
  if (!Number.isInteger(count) || count < 1 || count > 9) {
    return {
      mode: 'error',
      label,
      art,
      artBox,
      helpLang: 'en',
      error: 'Error: Please specify a number between 1 and 9',
    };
  }

  return {
    mode: 'roll',
    count,
    label,
    art,
    artBox,
    helpLang: 'en',
  };
}

function formatSimple(values: number[], art: boolean, label: boolean): string {
  if (!label) {
    return values.map((value) => (art ? DICE_ART[value - 1] : String(value))).join(' ');
  }

  const cells = values.map((value, idx) => {
    const face = art ? DICE_ART[value - 1] : String(value);
    const dieLabel = `Dice ${idx + 1}`;
    return { face, dieLabel, width: Math.max(face.length, dieLabel.length) };
  });

  const top = cells.map((c) => c.face.padEnd(c.width)).join('  ');
  const bottom = cells.map((c) => c.dieLabel.padEnd(c.width)).join('  ');
  return `${top}\n${bottom}`;
}

function formatArtBox(values: number[], label: boolean): string {
  const top = '┌─────┐';
  const bottom = '└─────┘';
  const rows = [0, 1, 2].map((rowIndex) =>
    values.map((value) => BOX_PATTERNS[value - 1][rowIndex]).join('  ')
  );
  const lines = [
    values.map(() => top).join('  '),
    ...rows,
    values.map(() => bottom).join('  '),
  ];

  if (label) {
    lines.push(values.map((_, idx) => `Dice ${idx + 1}`.padEnd(7)).join('  '));
  }

  return lines.join('\n');
}

export function render(count: number, opts: { label: boolean; art: boolean; artBox: boolean }): string {
  const values = Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1);
  if (opts.artBox) {
    return formatArtBox(values, opts.label);
  }

  return formatSimple(values, opts.art, opts.label);
}

export function execute(argv: string[]): { output: string; isError: boolean } {
  const parsed = parseArgs(argv);

  if (parsed.mode === 'help') {
    return { output: MESSAGES[parsed.helpLang].usage.join('\n'), isError: false };
  }

  if (parsed.mode === 'error') {
    return { output: parsed.error ?? 'Error', isError: true };
  }

  return {
    output: render(parsed.count!, {
      label: parsed.label,
      art: parsed.art,
      artBox: parsed.artBox,
    }),
    isError: false,
  };
}
