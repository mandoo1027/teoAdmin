// https://nuxt.com/docs/api/configuration/nuxt-config

const path = require("path");

export default defineNuxtConfig({
  ssr: false,

  app: {
    baseURL: "/",
  },

  nitro: {
    output: {
      publicDir: path.join(__dirname, "../frontendBuild"),
    },
  },

  devtools: { enabled: true },

  modules: [
    "nuxt-swiper",
    [
      "@pinia/nuxt",

      {
        autoImports: [
          ["defineStore", "definePiniaStore"], // import { defineStore as definePin
        ],
      },
    ],
  ],

  imports: {
    dirs: [
      // Scan top-level modules
      "composables",
    ],
  },

  experimental: {
    payloadExtraction: false,
  },

  //.env.loc , dev , prd 각각 설정되어있는 값이 자동으로 들어감....(axios.ts >> config.public.apiBase 참고)
  runtimeConfig: {
    public: {
      apiBase: "",
      server: "",
    },
  },

  // plugins: ['~/plugins/init'],
  css: [
    "~/assets/scss/main.scss",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    server: {
      proxy: {
        '/api': {
          target: process.env.API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  },
  components: {
    global: true,
    dirs: ["~/components", { path: "~/pages", pattern: "**/!([[]*[]]).vue" }],
  },

  compatibilityDate: "2024-08-28",
});