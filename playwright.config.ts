import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: 'tests',
	timeout: 60_000,
	fullyParallel: false,
	retries: 0,
	reporter: [['list']],
	use: {
		baseURL: 'http://localhost:4173',
		colorScheme: 'light',
		...devices['Desktop Chrome']
	},
	webServer: {
		command: 'pnpm preview --port 4173 --strictPort',
		port: 4173,
		reuseExistingServer: true,
		timeout: 60_000
	}
});
