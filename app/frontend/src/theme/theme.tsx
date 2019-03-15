import * as colors from './colors';

export interface ThemeInterface {
  main: string;
  colors: {
    lightbluelight: string;
    lightblue: string;
    lightpurple: string;
    purple: string;
    whiteblue: string;
  };
}

const theme = {
  main: 'red',
  colors: {
    ...colors,
  },
};

export default theme;
