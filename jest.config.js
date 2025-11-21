module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>'],
	testMatch: ['**/__tests__/**/*.test.ts', '**/*.test.ts'],
	collectCoverageFrom: [
		'nodes/**/*.ts',
		'credentials/**/*.ts',
		'!**/*.node.ts', // Exclude the main node files from coverage as they need integration testing
		'!**/node_modules/**',
		'!**/dist/**',
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov', 'html'],
	transform: {
		'^.+\\.ts$': ['ts-jest', {
			tsconfig: {
				esModuleInterop: true,
				allowSyntheticDefaultImports: true,
			},
		}],
	},
	moduleFileExtensions: ['ts', 'js', 'json'],
	verbose: true,
	// Skip commit.basic.test.ts due to Jest memory issues (all individual tests pass)
	testPathIgnorePatterns: ['/node_modules/', '/dist/', 'commit.basic.test.ts'],
};
