// dependencies
var assetRev = require("broccoli-asset-rev");
var chalk = require("chalk");
var cleanCSS = require("broccoli-clean-css");
var concatCSS = require("broccoli-concat");
var env = require("broccoli-env").getEnv();
var filterReact = require("broccoli-react");
var jsHintTree = require("broccoli-jshint");
var less = require("broccoli-less");
var mergeTrees = require("broccoli-merge-trees");
var pickFiles = require("broccoli-static-compiler");
var replace = require("broccoli-replace");
var uglifyJavaScript = require("broccoli-uglify-js");
var webpackify = require("broccoli-webpack");
var _ = require("underscore");

var dirs = {
  data: "data",
  dataDist: "data",
  src: "src",
  styles: "styles",
  stylesDist: "css",
  img: "img",
  imgDist: "img"
};

var fileNames = {
  mainJs: "main", // without extension
  mainStyles: "main" // without extension
};

var tasks = {

  jsHint: function (jsTree) {
    // run jshint on compiled js
    var hintTree = jsHintTree(jsTree , {
      logError: function (message) {
        switch (env) {
          case "production":
            this._errors.push(message + "\n");
            // fail build in production
            throw new Error("jshint failed, see messages above");
          default:
            // use pretty colors in test and development mode
            this._errors.push(chalk.red(message) + "\n");
            break;
        }
      }
    });

    // hack to strip test files from jshint tree
    hintTree = pickFiles(hintTree, {
      srcDir: "/",
      files: []
    });

    return mergeTrees(
      [hintTree, jsTree],
      { overwrite: true }
    );
  },

  webpack: function (masterTree) {
    // transform merge module dependencies into one file
    masterTree = webpackify(masterTree, {
      entry: "./" + fileNames.mainJs + ".js",
      output: {
        filename: "application.js"
      }
    });

    return mergeTrees(
      [masterTree, masterTree],
      { overwrite: true }
    );
  },

  minifyJs: function (masterTree) {
    return uglifyJavaScript(masterTree, {
      mangle: true,
      compress: true
    });
  },

  css: function (masterTree) {
    // create tree for less
    var cssTree = pickFiles(dirs.styles, {
      srcDir: "/",
      files: ["**/*.less", "**/*.css"],
      destDir: dirs.stylesDist
    });

    // compile less to css
    cssTree = less(cssTree, {});

    // concatenate css
    cssTree = concatCSS(cssTree, {
      inputFiles: [
        "**/*.css",
        "!" + dirs.stylesDist + "/" + fileNames.mainStyles + ".css",
        dirs.stylesDist + "/" + fileNames.mainStyles + ".css"
      ],
      outputFile: "/" + dirs.stylesDist + "/application.css",
    });

    return mergeTrees(
      [masterTree, cssTree],
      { overwrite: true }
    );
  },

  minifyCSS: function(masterTree) {
    return cleanCSS(masterTree);
  },

  index: function (masterTree) {
    // create tree for index
    var indexTree = pickFiles(dirs.src, {
      srcDir: "/",
      destDir: "",
      files: ["*.html"],
    });

    return mergeTrees(
      [masterTree, indexTree],
      { overwrite: true }
    );
  },

  img: function (masterTree) {
    // create tree for image files
    var imgTree = pickFiles(dirs.img, {
      srcDir: "/",
      destDir: dirs.imgDist,
    });

    return mergeTrees(
      [masterTree, imgTree],
      { overwrite: true }
    );
  },

  data: function (masterTree) {
    // create tree for data files
    var dataTree = pickFiles(dirs.data, {
      srcDir: "/",
      destDir: dirs.dataDist,
    });

    return mergeTrees(
      [masterTree, dataTree],
      { overwrite: true }
    );
  },

  md5: function (masterTree) {
    // add md5 checksums to filenames
    return assetRev(masterTree, {
      extensions: ["js", "css", "png", "jpg", "gif", "ico"],
      replaceExtensions: ["html", "js", "css"]
    });
  }
};

function createJsTree() {
  // create tree for .js and .jsx
  var jsTree = pickFiles(dirs.src, {
    srcDir: "/",
    destDir: "",
    files: [
      "**/*.jsx",
      "**/*.js"
    ]
  });

  // compile react files
  jsTree = filterReact(jsTree, {extensions: ["jsx"]});

  // replace @@ENV in js code with current BROCCOLI_ENV environment variable
  // {default:"development"|"production"|"test"}
  return replace(jsTree, {
    files: ["**/*.js"],
    patterns: [
      {
        match: "ENV", // replaces @@ENV
        replacement: env
      }
    ]
  });
}

var buildTree = _.compose(tasks.jsHint, createJsTree);

// export BROCCOLI_ENV={default:"development"|"production"|"test"}
if (env === "development" || env === "production" ) {
  // add steps used in both development and production
  buildTree = _.compose(
    tasks.img,
    tasks.index,
    tasks.data,
    tasks.css,
    tasks.webpack,
    buildTree
  );
}

if (env === "production") {
  // add steps that are exclusively used in production
  buildTree = _.compose(
    tasks.md5,
    tasks.minifyCSS,
    tasks.minifyJs,
    buildTree
  );
}


module.exports = buildTree();
