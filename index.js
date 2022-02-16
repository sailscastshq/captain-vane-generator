const path = require("path");
/**
 * Generates new factory file
 */
module.exports = {
  before: function (scope, done) {
    if (!scope.args[0] && !scope.name) {
      return done(
        new Error(
          "Please provide the name for this factory. Your factory name should correspond to the lowercase name  of the model you are generating the factory for. e.g user, product etc"
        )
      );
    }

    scope.templateName = "factory.template";
    scope.factoryName = scope.args[0] || scope.name;

    if (!scope.factoryName.match(/^[a-z][a-zA-Z0-9\.]*$/)) {
      return done(
        new Error(
          `The name ${scope.factoryName}  is invalid. Factory names must start with a lower-cased letter and contain only 'letters`
        )
      );
    }
    scope.relPath = scope.factoryName.replace(/\.+/g, "/");
    scope.relPath += ".js";

    // Grab the filename for potential use in our template.
    scope.filename = path.basename(scope.relPath);
    return done();
  },
  after: function (scope, done) {
    console.log();
    console.log("Successfully generated factory:");
    console.log(" •-", "config/factories/" + scope.relPath);
    console.log();
    return done();
  },
  targets: {
    "./config/factories/:relPath": { template: "factory.template" },
  },
  templatesDirectory: path.resolve(__dirname, "./templates"),
};
