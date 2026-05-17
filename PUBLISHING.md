# npm publish notes

## Current status

- The unscoped package name `nd6` is available on npm.
- The package is currently configured locally as `nd6`.
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
