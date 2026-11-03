// @ts-check
import { defineConfig } from 'astro/config';

// User site: repo ggdogsec/ggdogsec.github.io publishes at the domain root.
// https://docs.astro.build/en/guides/deploy/github/
export default defineConfig({
  site: 'https://ggdogsec.github.io',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
});
