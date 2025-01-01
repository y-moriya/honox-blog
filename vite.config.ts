import path from "node:path";
import ssg from '@hono/vite-ssg'
import honox from 'honox/vite'
import { defineConfig } from 'vite'
import client from "honox/vite/client";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import mdx from '@mdx-js/rollup';
import remarkGfm from "remark-gfm";
import adapter from '@hono/vite-dev-server/cloudflare'
import build from '@hono/vite-build/cloudflare-pages'

export default defineConfig(({ mode }) => {
  const common = {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./app"),
      },
    }
  };

  if (mode === 'client') {
    return {
      ...common,
      plugins: [client({ jsxImportSource: "hono/jsx" })],
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
    ...common,
    ssr: {
      external: [
        'react',
        'react-dom',
        '@mdx-js/react',
        '@radix-ui/react-navigation-menu',
        'satori',
        "@resvg/resvg-js",
      ],
    },
    plugins: [
      honox({ devServer: { adapter } }),
      build(),
      ssg({
        entry
      }),
      mdx({
        jsxImportSource: "hono/jsx",
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
      })],
    build: {
      emptyOutDir: false,
    },
  }
})
