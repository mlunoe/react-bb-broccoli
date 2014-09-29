// dependencies
var pickFiles = require("broccoli-static-compiler");
var mergeTrees = require("broccoli-merge-trees");
var webpackify = require("broccoli-webpack");
var uglifyJavaScript = require("broccoli-uglify-js");
var less = require("broccoli-less");
var env = require("broccoli-env").getEnv();

var srcDir = "src";
var stylesDir = "styles";
var stylesDistDir = "css";
var imgDir = "img";
var imgDistDir = "img";
var apiDir = "api";
var apiDistDir = "api";

// create tree for react
var src = pickFiles(srcDir, {
  srcDir: "/",
  destDir: ""
});

// transform jsx and load in module dependencies
var appJs = webpackify(src, {
  entry: "./main.jsx",
  output: {
    filename: "application.js"
  },
  module: {
    loaders: [
      // use jsx-loader and auto insert the React.DOM pragma
      { test: /\.jsx$/, loader: "jsx-loader?insertPragma=React.DOM" }
    ]
  }
});

// compilecreate tree for less
var appLess = pickFiles(stylesDir, {
  srcDir: "/",
  files: ["**/*.less"],
  destDir: stylesDistDir
});

// compile less to css
var appCss = less(appLess, {});

// create tree for index
var index = pickFiles(srcDir, {
  srcDir: "/",
  destDir: "",
  files: ["*.html"],
});

// create tree for image files
var appImg = pickFiles(imgDir, {
  srcDir: "/",
  destDir: imgDistDir,
});

// create tree for api files
var appApi = pickFiles(apiDir, {
  srcDir: "/",
  destDir: apiDistDir,
});

var publicFiles = new mergeTrees([index, appImg, appApi], { overwrite: true });

if (env === "production") {

  appJs = uglifyJavaScript(appJs, {
    mangle: true,
    compress: true
  });
}


// TODO: asset pipeline: js version of sprockets

module.exports = mergeTrees([appJs, appCss, publicFiles], { overwrite: true });
