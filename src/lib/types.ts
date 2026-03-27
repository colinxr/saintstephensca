export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  churchName: string;
  headerImage?: string;
  address: string;
  diocesanLink?: string;
  footerCopyright: string;
  socialLinks: SocialLink[];
  navigation: NavigationItem[];
}
