const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  // useFileSystemPublicRoutes: false,
  webpack: config => {
    config.plugins = config.plugins || [];

    return config
  }
});
