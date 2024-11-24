import { createClient } from "honox/client";

createClient({
  hydrate: async (elem, root) => {
    const { hydrateRoot } = await import("react-dom/client");
    // @ts-ignore
    hydrateRoot(root, elem);
  },
  // @ts-ignore
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  createElement: async (type: any, props: any) => {
    const { createElement } = await import("react");
    return createElement(type, props);
  },
});
