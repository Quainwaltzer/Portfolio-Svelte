import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  kit: {
    adapter: adapter({
      runtime: 'nodejs20.x'
    }),
    alias: {
      $lib: 'src/lib',
      $components: 'src/lib/components'
    }
    // No need for base path on Vercel
  },
  preprocess: vitePreprocess()
};

export default config;
