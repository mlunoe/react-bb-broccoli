// dependencies
var assetRev = require("broccoli-asset-rev");
var concatCss = require("broccoli-concat");
var cleanCSS = require("broccoli-clean-css");
var env = require("broccoli-env").getEnv();
var filterReact = require("broccoli-react");
var jshintTree = require("broccoli-jshint");
var less = require("broccoli-less");
var mergeTrees = require("broccoli-merge-trees");
var pickFiles = require("broccoli-static-compiler");
var uglifyJavaScript = require("broccoli-uglify-js");
var webpackify = require("broccoli-webpack");

var srcDir = "src";
var mainJsFile = "main"; // without extension
var stylesDir = "styles";
var stylesDistDir = "css";
var mainStylesFile = "main"; // without extension
var imgDir = "img";
var imgDistDir = "img";
var dataDir = "data";
var dataDistDir = "data";

// export BROCCOLI_ENV="production"|"development"

// create tree for .js and .jsx
var appJs = pickFiles(srcDir, {
  srcDir: "/",
  destDir: "",
  files: ["**/*.jsx", "**/*.js"]
});

appJs = filterReact(appJs, {extensions: ["jsx"]});

var hintTree;

// run jshint on compiled js
if (env === "production") {
  hintTree = jshintTree(appJs , {
    logError: function (message) {
      this._errors.push(message + "\n");
      // only fail build in production
      throw new Error("jshint failed, see messages above");
    }
  });
} else {
  hintTree = jshintTree(appJs);
}

// hack to strip test files from jshint tree
hintTree = pickFiles(hintTree, {
  srcDir: "/",
  files: []
});

// transform merge module dependencies into one file
appJs = webpackify(appJs, {
  entry: "./" + mainJsFile + ".js",
  output: {
    filename: "application.js"
  }
});

// create tree for less
var appLess = pickFiles(stylesDir, {
  srcDir: "/",
  files: ["**/*.less", "**/*.css"],
  destDir: stylesDistDir
});

// compile less to css
var appCss = less(appLess, {});

// concatenate css
appCss = concatCss(appCss, {
  inputFiles: [
    "**/*.css",
    "!" + stylesDistDir + "/" + mainStylesFile + ".css",
    stylesDistDir + "/main.css"
  ],
  outputFile: "/" + stylesDistDir + "/application.css",
});

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

// create tree for data files
var appData = pickFiles(dataDir, {
  srcDir: "/",
  destDir: dataDistDir,
});


var publicFiles = new mergeTrees([index, appImg, appData], { overwrite: true });

var assetTree = mergeTrees(
  [appJs, appCss, publicFiles, hintTree],
  { overwrite: true }
);

if (env === "production") {
  // minify js
  assetTree = uglifyJavaScript(assetTree, {
    mangle: true,
    compress: true
  });

  // minify css
  assetTree = cleanCSS(assetTree);

  // add md5 checksums to filenames
  assetTree = assetRev(assetTree, {
    extensions: ["js", "css", "png", "jpg", "gif", "ico"],
    replaceExtensions: ["html", "js", "css"]
  });
}

module.exports = assetTree;
