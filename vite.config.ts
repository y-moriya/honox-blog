import path from "node:path";
import ssg from "@hono/vite-ssg";
import honox from "honox/vite";
import { defineConfig, lazyPlugins } from "vite-plus";
import client from "honox/vite/client";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";

export default defineConfig(({ mode }) => {
  const common = {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./app"),
      },
    },
  };

  const toolchain = {
    fmt: {
      ignorePatterns: [
        "dist/**",
        ".wrangler/**",
        "app/global.css",
        "app/routes/posts/**",
        "public/**",
        "*.md",
        "*.json",
      ],
    },
    lint: {
      ignorePatterns: ["dist/**", ".wrangler/**"],
      jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
      rules: { "vite-plus/prefer-vite-plus-imports": "error" as const },
      options: { typeAware: true, typeCheck: true },
    },
  };

  if (mode === "client") {
    return {
      ...toolchain,
      ...common,
      plugins: lazyPlugins(() => [client({ jsxImportSource: "hono/jsx" })]),
      build: {
        rollupOptions: {
          input: ["./app/client.ts", "./app/global.css"],
          output: {
            entryFileNames: "static/client.js",
            chunkFileNames: "static/assets/[name]-[hash].js",
            assetFileNames: "static/assets/[name].[ext]",
          },
        },
      },
    };
  }

  const entry = "./app/server.ts";

  return {
    ...toolchain,
    ...common,
    ssr: {
      external: ["@mdx-js/react", "satori", "@resvg/resvg-js"],
    },
    plugins: lazyPlugins(() => [
      honox(),
      ssg({
        entry,
      }),
      mdx({
        jsxImportSource: "hono/jsx",
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
      }),
    ]),
    build: {
      emptyOutDir: false,
    },
  };
});
