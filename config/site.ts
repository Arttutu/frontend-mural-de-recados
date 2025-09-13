export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Mural de recados',
  description: 'Deixe seus recados aqui para todos verem!',
  navItems: [
    {
      labelId:"home",
      label: 'Home',
      href: '/',
    },
    {
      labelId:"about",
      label: 'Sobre mim',
      href: '/sobre',
    },
  ],
  navMenuItems: [
    {
      labelId:"home",
      label: 'Home',
      href: '/',
    },
    {
      labelId:"about",
      label: 'Sobre mim',
      href: '/sobre',
    },
  ],
};
