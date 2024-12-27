import path from "node:path";
import pages from '@hono/vite-build/cloudflare-pages'
import honox from 'honox/vite'
import { defineConfig } from 'vite'
import client from "honox/vite/client";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import mdx from '@mdx-js/rollup';

export default defineConfig(({ mode }) => {
  const common = {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./app"),
      },
    },
  };

  if (mode === 'client') {
    return {
      ...common,
      plugins: [client({ jsxImportSource: "react" })],
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
  return {
    ...common,
    ssr: {
      external: ['react', 'react-dom'],
    },
    plugins: [honox(), pages(), mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter]
    })],
  }
})
