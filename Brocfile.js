// dependencies
var pickFiles = require("broccoli-static-compiler");
var mergeTrees = require("broccoli-merge-trees");
var filterReact = require("broccoli-react");
var webpackify = require("broccoli-webpack");
var uglifyJavaScript = require("broccoli-uglify-js");
var less = require("broccoli-less");
var jshintTree = require("broccoli-jshint");
var env = require("broccoli-env").getEnv();

var srcDir = "src";
var stylesDir = "styles";
var stylesDistDir = "css";
var imgDir = "img";
var imgDistDir = "img";
var apiDir = "api";
var apiDistDir = "api";

// BROCCOLI_ENV = "production"|"development"

// create tree for .js and .jsx
var appJs = pickFiles(srcDir, {
  srcDir: "/",
  destDir: "",
  files: ["**/*.jsx", "**/*.js"]
});

appJs = filterReact(appJs, {extensions: ["jsx"]});

// run jshint on compiled js
var hintTree = jshintTree(appJs);

// hack to strip test files from jshint tree
hintTree = pickFiles(hintTree, {
  srcDir: "/",
  files: []
});

// transform merge module dependencies into one file
appJs = webpackify(appJs, {
  entry: "./main.js",
  output: {
    filename: "application.js"
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

module.exports = mergeTrees(
  [appJs, appCss, publicFiles, hintTree],
  { overwrite: true }
);
