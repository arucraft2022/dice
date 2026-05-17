# @arucraft2022/dice — Specification

[日本語版](README.ja.md)

## Overview

A command-line tool that rolls N six-sided dice.

```bash
npx @arucraft2022/dice <number> [options]
```

---

## Command behavior

| Command | Behavior |
|---|---|
| `npx @arucraft2022/dice` | Show help in English |
| `npx @arucraft2022/dice help` | Show help in English |
| `npx @arucraft2022/dice help --ja` | Show help in Japanese |
| `npx @arucraft2022/dice <1-9>` | Roll and display N dice |
| `npx @arucraft2022/dice <0 or less / 10 or more / text>` | Show an error |

The installed executable name remains `dice`.

---

## Options

| Option | Description |
|---|---|
| `--label` | Show a label under each die |
| `--art` | Show emoji dice (⚀-⚅) |
| `--art-box` | Show boxed text dice |
| `--art --label` | Emoji dice with labels |
| `--art-box --label` | Boxed text dice with labels |
| `--art --art-box` | Error: conflicting options |
| `--ja` | Only valid for help output. Ignored when rolling dice |

---

## Output examples

### Default

```
3 1 5
```

### `--label`

```
3       1       5
Dice 1  Dice 2  Dice 3
```

### `--art`

```
⚂ ⚀ ⚄
```

### `--art --label`

```
⚂      ⚀      ⚄
Dice 1  Dice 2  Dice 3
```

### `--art-box --label`

```
┌─────┐  ┌─────┐  ┌─────┐
│ ●   │  │  ●  │  │ ● ● │
│  ●  │  │     │  │     │
│   ● │  │  ●  │  │ ● ● │
└─────┘  └─────┘  └─────┘
Dice 1   Dice 2   Dice 3
```

---

## Error messages

| Case | Message |
|---|---|
| 0 or less, 10 or more, or text input | `Error: Please specify a number between 1 and 9` |
| Using `--art` and `--art-box` together | `Error: --art and --art-box cannot be used together` |

- Error messages are always shown in English.
- `--ja` does not affect error messages.

---

## Language support

| Language | Option | Status |
|---|---|---|
| English | Default | Supported |
| Japanese | `--ja` | Supported for help output only |
| Others | Not yet supported | Can be extended later |

---

## Constraints

- Only **1 to 9** dice are allowed.
- `--art` and `--art-box` cannot be used together.
- `--ja` is valid only for help output and is ignored for dice rolls.

---

## License

This project is released under the ISC License. See LICENSE for details.
