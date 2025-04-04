import { } from "hono";
import type { Frontmatter } from "./types/frontmatter";

type Head = {
  title?: string;
  frontmatter?: Frontmatter;
};

declare module "hono" {
  interface Env {
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    Variables: {};
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    Bindings: {};
  }
  interface Props {
    title?: string;
    frontmatter?: Frontmatter;
  }
  interface ContextRenderer {
    // biome-ignore lint/style/useShorthandFunctionType: <explanation>
    (
      content: string | Promise<string>,
      head?: Head,
    ): Response | Promise<Response>;
  }
}
