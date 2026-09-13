import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "build",
        sourcemap: false,
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./test/setup.ts"],
        include: ["test/**/*.test.tsx", "test/**/*.test.ts"],
        coverage: {
            provider: "v8",
            include: ["src/**/*.{ts,tsx}"],
            exclude: ["src/vite-env.d.ts"],
            thresholds: { lines: 75, functions: 75, branches: 75, statements: 75 },
            reporter: ["text-summary", "text"],
        },
    },
});
