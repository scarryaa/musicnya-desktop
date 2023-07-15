import { sveltekit } from '@sveltejs/kit/vite';
import { searchForWorkspaceRoot } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd()), 'config.json']
		}
	},
	build: {
		outDir: 'build'
	},
	resolve: {
		alias: {
			$components: './src/components',
			$lib: './src/lib',
			$stores: './src/stores',
			$utils: './src/utils',
			$routes: './src/routes',
			$types: './src/types'
		}
	},
	root: process.cwd()
});
