import path from 'path';

export default ({ production }) => {
  return {
    path: path.join(__dirname, '../public', 'js'),
    publicPath: '/js/',
    filename: '[name].bundle.js',
    pathinfo: !production
  };
}
