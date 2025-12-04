import App from "./App.vue";

import { ViteSSG } from "vite-ssg";

export const createApp = ViteSSG(
  App,
  { routes: [{ path: "/", component: App }] },
  ({ app, router, routes, initialState }) => {
    // install plugins etc.
  }
);
