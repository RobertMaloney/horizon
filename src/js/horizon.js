var fs = require("fs");

var PanelData = function(name) {
  this.name = name;
  this.links = [];
}

PanelData.prototype.addLink = function(config) {
  this.links.push({name: config.name, uri: config.uri});
  return true;
}

PanelData.prototype.removeAt = function(id) {
  if (id >= this.links.length) return false;
  if (id < 0) return false;

  this.links.splice(id, 1);
  return true;
}

PanelData.prototype.addFileByEvent = function(evt) {
  evt.preventDefault();
  var file = evt.dataTransfer.files[0];
  this.addLink(parseConfig(file.path));
  return true;
}

// captializes first letter of a String
String.prototype.capFirst = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

// returns panel config data
var parseConfig = function(path) {
  var shortName = path.slice(path.lastIndexOf("\\")+1);
  var stats = fs.lstatSync(path);
  if (!stats.isDirectory()) {
    shortName = shortName.slice(0,shortName.lastIndexOf("."));
  }
  return {name: shortName, uri: path};
}

// Prevent double click selection
document
  .getElementById('main')
  .addEventListener('mousedown', function(e)
  {
    e.preventDefault();
  },
  false);

// disable default drag'n'drop
window.ondragover = function(e) {e.preventDefault(); return false };
window.ondrop = function(e) {e.preventDefault(); return false };
