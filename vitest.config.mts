import { defineConfig, configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: "happy-dom",
        setupFiles: ["./vitest.setup.ts"],
        globals: true,
        exclude: [...configDefaults.exclude, "tests/e2e/**"],
        css: false,
        server: {
            deps: {
                inline: [
                    /@csstools\/.*/,
                    /@tailwindcss\/.*/,
                    /@asamuzakjp\/.*/,
                    "tailwindcss",
                ],
            },
        },
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            exclude: [
                "node_modules/**",
                ".next/**",
                "coverage/**",
                "vitest.config.mts",
                "vitest.setup.ts",
                "eslint.config.mjs",
                "next.config.ts",
                "postcss.config.mjs",
                "tailwind.config.ts",
                "src/app/layout.tsx",
                "src/app/providers.tsx",
                "src/middleware.ts", // Optional: if we test it directly we can include it or exclude it depending on node vs edge env support. We'll try to include it.
            ],
        },
    },
});
