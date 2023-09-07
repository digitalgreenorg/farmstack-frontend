const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglify-js-plugin"); // Import UglifyJsPlugin

module.exports = {
  mode: "production",
  optimization: {
    usedExports: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new UglifyJsPlugin(), // Add UglifyJsPlugin to the plugins array
  ],
  // Other webpack configuration options...
};
