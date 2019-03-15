module.exports = api => {
  const isProduction = api.env('production');
  const styledPlugin = [
    'styled-components',
    {
      ssr: true,
      displayName: true,
      minify: true,
      pure: true,
    },
  ];

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'entry',
          targets: isProduction
            ? ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
            : [
                'last 2 chrome versions',
                'last 2 firefox versions',
                'last 2 edge versions',
              ],
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      styledPlugin,
      'transform-inline-environment-variables',
      'react-hot-loader/babel',
      '@babel/plugin-proposal-export-default-from',
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true,
        },
      ],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime',
    ],
    env: {
      production: {
        plugins: [
          styledPlugin,
          '@babel/plugin-transform-react-constant-elements',
          'transform-react-remove-prop-types',
          '@babel/plugin-transform-react-inline-elements',
          ['transform-remove-console', { exclude: ['error', 'warn'] }],
          'babel-plugin-transform-remove-debugger',
        ],
      },
    },
  };
};
