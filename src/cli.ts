#!/usr/bin/env node

import { execute } from './index';

const result = execute(process.argv.slice(2));
if (result.isError) {
  console.error(result.output);
  process.exit(1);
}

console.log(result.output);
