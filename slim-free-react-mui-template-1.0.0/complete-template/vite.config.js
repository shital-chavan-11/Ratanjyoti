import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint'; // ❌ comment this out
import * as path from 'path';

export default defineConfig({
	base: '/',
	plugins: [
		react(),
		// eslint() // ❌ also comment this out
	],
	resolve: {
		alias: [
			{ find: '@', replacement: path.resolve(__dirname, 'src') },
			{ find: '@helpers', replacement: path.resolve(__dirname, 'src/utils/helpers') },
			{ find: '@hooks', replacement: path.resolve(__dirname, 'src/utils/hooks') },
			{ find: '@hocs', replacement: path.resolve(__dirname, 'src/utils/hocs') },
		],
	},
});
