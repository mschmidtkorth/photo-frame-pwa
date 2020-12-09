const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/PageHome.vue') },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('pages/PageSettings.vue')
      },
      {
        path: 'slideshow',
        name: 'Slideshow',
        component: () => import('pages/PageSlideshow.vue')
      }
    ]
  },
  // {
  //   path: '/slideshow',
  //   component: () => import('layouts/SlideshowLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/PageSlideshow.vue') }]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
