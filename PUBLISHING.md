# npm publish notes

## Current status

- The unscoped package name `dice` is already registered on npm.
- The package is now configured to publish as `@arucraft2022/dice`.
- `publishConfig.access` is set to `public` for scoped package publishing.
- Package metadata now includes `author`, `repository`, `bugs`, `homepage`, `main`, and `types`.
- `prepublishOnly` runs the test suite before publish.

## Publish checklist

1. Run `npm test`.
2. Run `npm pack --dry-run`.
3. Run `npm login`.
4. Run `npm publish`.

## Verified package contents

`npm pack --dry-run` currently includes:

- `README.md`
- `dist/cli.js`
- `dist/index.js`
- `package.json`

After the declaration build, `dist/index.d.ts` and `dist/cli.d.ts` will also be included.
