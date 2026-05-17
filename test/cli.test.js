const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const cliPath = path.join(__dirname, '..', 'dist', 'cli.js');

function run(args) {
  return spawnSync(process.execPath, [cliPath, ...args], { encoding: 'utf8' });
}

test('shows English help with no args', () => {
  const result = run([]);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage: npx @arucraft2022\/dice <number> \[options\]/);
});

test('shows Japanese help with help --ja', () => {
  const result = run(['help', '--ja']);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /使い方: npx @arucraft2022\/dice <number> \[options\]/);
});

test('rejects invalid number', () => {
  const result = run(['10']);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Error: Please specify a number between 1 and 9/);
});

test('rejects --art and --art-box together', () => {
  const result = run(['3', '--art', '--art-box']);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Error: --art and --art-box cannot be used together/);
});

test('--ja is ignored during dice execution', () => {
  const result = run(['3', '--ja']);
  assert.equal(result.status, 0);
  assert.equal(result.stderr, '');
  assert.match(result.stdout.trim(), /^[1-6](\s+[1-6]){2}$/);
});

test('--art outputs emoji dice', () => {
  const result = run(['3', '--art']);
  assert.equal(result.status, 0);
  assert.match(result.stdout.trim(), /^[⚀-⚅](\s+[⚀-⚅]){2}$/u);
});

test('--art-box --label prints box and labels', () => {
  const result = run(['3', '--art-box', '--label']);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /┌─────┐/);
  assert.match(result.stdout, /Dice 1/);
  assert.match(result.stdout, /Dice 2/);
  assert.match(result.stdout, /Dice 3/);
});
