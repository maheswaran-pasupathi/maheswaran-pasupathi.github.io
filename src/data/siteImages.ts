// Central place for the decorative imagery on the homepage. To add an image:
//   1. put the file in  public/images/
//   2. set the path below (e.g. "/images/hero.jpg")
//   3. add a line to CREDITS.md with the source and licence
// Anything left as null keeps the current plain look for that slot - the site
// works fine with every entry null.

export interface SiteImage {
  src: string;
  alt: string;
  credit?: string;
  creditUrl?: string;
}

export const heroImage: SiteImage | null = {
  src: '/images/jet-turbine-fan.jpg',
  alt: 'Looking straight into the fan blades of a jet engine turbine',
  credit: 'Photo: Joerg Mangelsen / Pexels',
  creditUrl: 'https://www.pexels.com/photo/close-up-of-propeller-whirl-16160818/',
};

export const explorationImages: Record<string, SiteImage | null> = {
  Engine: null,
  Battery: null,
  Vehicle: null,
  'AI + Physical Systems': null,
};
