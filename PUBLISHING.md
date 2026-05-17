# npm publish notes

## Current status

- The unscoped package name `nd6` is blocked by npm name similarity checks.
- The package is configured to publish as `@arucraft2022/nd6`.
- `publishConfig.access` is set to `public` for scoped publishing.
- Package metadata now includes `author`, `repository`, `bugs`, `homepage`, `main`, and `types`.
- `prepublishOnly` runs the test suite before publish.

## Publish checklist

1. Run `npm test`.
2. Run `npm pack --dry-run`.
3. Run `npm login`.
4. Run `npm whoami` and confirm `arucraft2022`.
5. Run `npm publish --access=public`.

## Verified package contents

`npm pack --dry-run` currently includes:

- `README.md`
- `dist/cli.js`
- `dist/index.js`
- `package.json`

After the declaration build, `dist/index.d.ts` and `dist/cli.d.ts` will also be included.
