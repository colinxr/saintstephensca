export interface NavigationItem {
  label: string;
  href: string;
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

export interface SiteSettings {
  churchName: string;
  headerImage?: SanityImage;
  address: string;
  diocesanLink?: string;
  footerCopyright: string;
  socialLinks: SocialLink[];
  navigation: NavigationItem[];
}
