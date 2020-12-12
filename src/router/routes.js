const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('pages/PageSettings.vue')
      },
      {
        path: '',
        name: 'Slideshow',
        component: () => import('pages/PageSlideshow.vue')
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
