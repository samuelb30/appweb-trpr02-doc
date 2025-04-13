import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Documentation de notre jeu web",
  description: "Un jeu qui joue",
  base: "/appweb-trpr02-doc/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Revue de code", link: "/revue-code-sam" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Revue de code de Samuel", link: "/revue-code-sam" },
          { text: "Revue de code de Dominic", link: "/revue-code-dom" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
})
