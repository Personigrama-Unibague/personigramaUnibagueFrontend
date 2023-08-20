module.exports = {
  plugins: {
    "postcss-preset-env": {
      autoprefixer: {
        browsers: "last 2 versions, > 1%, Safari >= 7", // Configuración específica para Safari
        flexbox: "no-2009",
      },
      stage: 3,
    },
  },
};
