import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'

import { routes } from 'vue-router/auto-routes'
import { createBootstrap } from 'bootstrap-vue-next'
import MasonryWall from '@yeger/vue-masonry-wall'
import VueEasyLightbox from 'vue-easy-lightbox'
import { createManager } from '@vue-youtube/core'
import Vueform from '@vueform/vueform'
import vueformConfig from './../vueform.config'

import App from './App.vue'
import type { UserModule } from './types'

import '@unocss/reset/tailwind.css'
import './styles/main.scss'
import 'uno.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '@vueform/vueform/dist/vueform.css'

export const createApp = ViteSSG(
  App,
  {
    routes: setupLayouts(routes),
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    ctx.app.use(createBootstrap())
    ctx.app.use(MasonryWall)
    ctx.app.use(VueEasyLightbox)
    ctx.app.use(createManager())
    ctx.app.use(Vueform, vueformConfig)
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    // ctx.app.use(Previewer)
  },
)
