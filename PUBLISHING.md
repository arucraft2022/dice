# npm publish notes

## Current status

- The unscoped package name `dice` is already registered on npm.
- Verified available scoped candidates:
  - `@arucraft2022/dice`
- Package metadata now includes `author`, `repository`, `bugs`, `homepage`, `main`, and `types`.
- `prepublishOnly` runs the test suite before publish.

## Recommended next decision

Choose the final package name and update `package.json` before publishing.

- Recommended: use `@arucraft2022/dice` to match the GitHub repository owner.

For a scoped package, add this field when you decide the final name:

```json
"publishConfig": {
  "access": "public"
}
```

## Publish checklist

1. Update `package.json` `name` to the final publishable package name.
2. If using a scoped package, add `publishConfig.access = "public"`.
3. Review README command examples so they match the final package name for `npx` usage.
4. Run `npm test`.
5. Run `npm pack --dry-run`.
6. Run `npm login`.
7. Run `npm publish`.

## Verified package contents

`npm pack --dry-run` currently includes:

- `README.md`
- `dist/cli.js`
- `dist/index.js`
- `package.json`

After the declaration build, `dist/index.d.ts` and `dist/cli.d.ts` will also be included.
