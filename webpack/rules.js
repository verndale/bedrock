import { resolve } from 'path';

export default () => {
  return [
    {
      test: /\.js$/,
      include: [resolve(__dirname, '../src/components')],
      use: {
        loader: 'babel-loader'
      }
    }
  ];
}
