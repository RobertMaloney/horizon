var fs = require("fs");
var PanelData = require("./js/paneldata");
var configPath = 'build/config.json';

var Horizon = function() {
  this.panels = [];
  this.load(configPath);
}

Horizon.prototype.load = function(uri) {
  var file = fs.readFileSync(uri, {encoding: 'utf8'});
  file = JSON.parse(file);
  var that = this;
  file.panels.forEach(function(val) {
    var p = new PanelData(val.name);
    val.links.forEach(function(link) {
      p.addLink(link);
    });
    that.panels.push(p);
  });
}

Horizon.prototype.save = function() {
  var file = {};
  file.version = "0.0.1";
  file.panels = this.panels;
  file = JSON.stringify(file, null, 2);
  fs.writeFileSync(configPath, file);
}
