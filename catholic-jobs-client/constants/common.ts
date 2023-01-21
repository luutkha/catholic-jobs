export const Color = {
  DEFAULT_LIGHT_COLOR: "#FFFFFF",
  DEFAULT_DARK_COLOR: "black",
  DEFAULT_PRIMARY_COLOR: "#6924fc",
  DEFAULT_SECOND_COLOR: "#f0e9ff",
  DEFAULT_BLUE_COLOR: "#BBDAFD",
};

export type HeaderItem = {
  href: string;
  text: string;
}

export const listItems: HeaderItem[] = [
  {
      href: '/',
      text: 'Home'

  },
  {
      href: '/jobs',
      text: 'Find Jobs'
  },
  {
      href: '/hr',
      text: 'HR Side'
  },
]