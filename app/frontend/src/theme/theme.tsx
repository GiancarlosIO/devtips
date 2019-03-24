import * as colors from './colors';

type keys = keyof typeof colors;

export interface ThemeInterface {
  main: string;
  colors: { [k in keys]: string };
}

const theme = {
  main: 'red',
  colors: {
    ...colors,
  },
};

export default theme;
