import { rem } from 'polished';

export const mainTheme = {
  fonts: {
    primary: 'Open sans, sans-serif',
    tabFontWeight: 600
  },
  palette: {
    primary: ['#120C80', '#2066A2'],
    grayscale: ['#000000', '#2C2D2D', '#FFFFFF']
  },
  sizes: {
    tabRadius: '4px',
    tabShadow: '2px 1px 7px rgba(0, 0, 0, 0.1)',
    tabTitleDesktopFontSize: rem('18px'),
    tabTitleDeviceFontSize: rem('18px'),
    panelDesktopFontSize: rem('16px'),
    panelDeviceFontSize: rem('14px')
  }
};
