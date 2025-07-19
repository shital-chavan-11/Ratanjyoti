// vite.config.js
import { defineConfig } from 'file:///C:/Users/INDIA/OneDrive/Ta%CC%80i%20li%C3%AA%CC%A3u/slim-free-react-mui-template-1.0.0/slim-free-react-mui-template-1.0.0/complete-template/node_modules/vite/dist/node/index.js';
import react from 'file:///C:/Users/INDIA/OneDrive/Ta%CC%80i%20li%C3%AA%CC%A3u/slim-free-react-mui-template-1.0.0/slim-free-react-mui-template-1.0.0/complete-template/node_modules/@vitejs/plugin-react/dist/index.mjs';
import eslint from 'file:///C:/Users/INDIA/OneDrive/Ta%CC%80i%20li%C3%AA%CC%A3u/slim-free-react-mui-template-1.0.0/slim-free-react-mui-template-1.0.0/complete-template/node_modules/vite-plugin-eslint/dist/index.mjs';
import * as path from 'path';
var __vite_injected_original_dirname =
	'C:\\Users\\INDIA\\OneDrive\\Ta\u0300i li\xEA\u0323u\\slim-free-react-mui-template-1.0.0\\slim-free-react-mui-template-1.0.0\\complete-template';
var vite_config_default = defineConfig({
	base: '/slim-free-react-mui-template',
	plugins: [react(), eslint()],
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__vite_injected_original_dirname, 'src'),
			},
			{
				find: '@helpers',
				replacement: path.resolve(__vite_injected_original_dirname, 'src/utils/helpers'),
			},
			{
				find: '@hooks',
				replacement: path.resolve(__vite_injected_original_dirname, 'src/utils/hooks'),
			},
			{
				find: '@hocs',
				replacement: path.resolve(__vite_injected_original_dirname, 'src/utils/hocs'),
			},
		],
	},
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxJTkRJQVxcXFxPbmVEcml2ZVxcXFxUYVx1MDMwMGkgbGlcdTAwRUFcdTAzMjN1XFxcXHNsaW0tZnJlZS1yZWFjdC1tdWktdGVtcGxhdGUtMS4wLjBcXFxcc2xpbS1mcmVlLXJlYWN0LW11aS10ZW1wbGF0ZS0xLjAuMFxcXFxjb21wbGV0ZS10ZW1wbGF0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcSU5ESUFcXFxcT25lRHJpdmVcXFxcVGFcdTAzMDBpIGxpXHUwMEVBXHUwMzIzdVxcXFxzbGltLWZyZWUtcmVhY3QtbXVpLXRlbXBsYXRlLTEuMC4wXFxcXHNsaW0tZnJlZS1yZWFjdC1tdWktdGVtcGxhdGUtMS4wLjBcXFxcY29tcGxldGUtdGVtcGxhdGVcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0lORElBL09uZURyaXZlL1RhJUNDJTgwaSUyMGxpJUMzJUFBJUNDJUEzdS9zbGltLWZyZWUtcmVhY3QtbXVpLXRlbXBsYXRlLTEuMC4wL3NsaW0tZnJlZS1yZWFjdC1tdWktdGVtcGxhdGUtMS4wLjAvY29tcGxldGUtdGVtcGxhdGUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgZXNsaW50IGZyb20gJ3ZpdGUtcGx1Z2luLWVzbGludCc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0YmFzZTogJy9zbGltLWZyZWUtcmVhY3QtbXVpLXRlbXBsYXRlJyxcblx0cGx1Z2luczogW3JlYWN0KCksIGVzbGludCgpXSxcblx0cmVzb2x2ZToge1xuXHRcdGFsaWFzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGZpbmQ6ICdAJyxcblx0XHRcdFx0cmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpbmQ6ICdAaGVscGVycycsXG5cdFx0XHRcdHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3V0aWxzL2hlbHBlcnMnKSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpbmQ6ICdAaG9va3MnLFxuXHRcdFx0XHRyZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy91dGlscy9ob29rcycpLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmluZDogJ0Bob2NzJyxcblx0XHRcdFx0cmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdXRpbHMvaG9jcycpLFxuXHRcdFx0fSxcblx0XHRdLFxuXHR9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlrQixTQUFTLG9CQUFvQjtBQUM5bEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUNuQixZQUFZLFVBQVU7QUFIdEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsTUFBTTtBQUFBLEVBQ04sU0FBUyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFBQSxFQUMzQixTQUFTO0FBQUEsSUFDUixPQUFPO0FBQUEsTUFDTjtBQUFBLFFBQ0MsTUFBTTtBQUFBLFFBQ04sYUFBa0IsYUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDM0M7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFNO0FBQUEsUUFDTixhQUFrQixhQUFRLGtDQUFXLG1CQUFtQjtBQUFBLE1BQ3pEO0FBQUEsTUFDQTtBQUFBLFFBQ0MsTUFBTTtBQUFBLFFBQ04sYUFBa0IsYUFBUSxrQ0FBVyxpQkFBaUI7QUFBQSxNQUN2RDtBQUFBLE1BQ0E7QUFBQSxRQUNDLE1BQU07QUFBQSxRQUNOLGFBQWtCLGFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDdEQ7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
