const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "settings",
        name: "Settings",
        component: () => import("pages/PageSettings.vue"),
      },
      {
        path: "",
        name: "Slideshow",
        component: () => import("pages/PageSlideshow.vue"),
      },
      {
        path: "help",
        name: "Help",
        component: () => import("pages/PageHelp.vue"),
      },
    ],
  },
  {
    path: "/dev",
    name: "Dev Tips",
    component: () => import("pages/PageDevTips.vue"),
  },
  {
    path: "/console",
    name: "Console",
    component: () => import("pages/PageConsole.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes
