export interface NavigationItem {
  label: string;
  link?: string;
  children?: NavigationItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface Navigation {
  _id: string;
  title: string;
  items: NavigationItem[];
}

export interface Alert {
  title?: string;
  content: unknown[];
  style?: 'default' | 'christmas' | 'urgent';
}

export interface SiteSettings {
  churchName: string;
  headerImage?: SanityImage;
  address: string;
  diocesanLink?: string;
  footerCopyright: string;
  socialLinks: SocialLink[];
  mainNavigation?: Navigation;
  globalAlert?: Alert;
}
