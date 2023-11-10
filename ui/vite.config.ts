import dns from 'dns';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	server: {
		host: '127.0.0.1',
		port: 5173
	}
});
