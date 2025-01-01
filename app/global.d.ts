import { } from 'hono'
import type { Frontmatter } from './types/frontmatter'

type Head = {
  title?: string;
  frontmatter?: Frontmatter;
}

declare module 'hono' {
  interface Env {
    Variables: {}
    Bindings: {}
  }
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head): Response | Promise<Response>
  }
}
