module.exports = {
  pluginOptions: {
    apollo: {
      lintGQL: true,
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
};
