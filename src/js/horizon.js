var fs = require("fs");
var ws = require("./lib/windows-shortcuts/lib/windows-shortcuts.js");

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

// async because parseConfig is async
PanelData.prototype.addFileByEvent = function(evt, callback) {
  evt.preventDefault();
  var file = evt.dataTransfer.files[0];
  var _AL = this.addLink.bind(this);
  parseConfig(file.path, function(err,data) {
    if (!err)
      _AL(data);
    callback(!err);
  });
}

// captializes first letter of a String
String.prototype.capFirst = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

// returns panel config data
// must be async for windows-shortcuts
var parseConfig = function(path, callback) {
  var err = false;
  var shortName = path.slice(path.lastIndexOf("\\")+1);

  var stats = fs.lstatSync(path);
  if (!stats.isDirectory()) {
    var extension = shortName.slice(shortName.lastIndexOf(".")+1);
    shortName = shortName.slice(0,shortName.lastIndexOf("."));
    if (extension === "lnk") {
      ws.query(path, function(err,data) {
        callback(err, {name: shortName, uri: data.target});
      });
    } else {
      callback(err, {name: shortName, uri: path});
    }
  } else {
    callback(err, {name: shortName, uri: path});
  }
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
window.ondragover = function(e) {e.dataTransfer.dropEffect = "none"; e.preventDefault(); return false};
window.ondrop = function(e) {e.preventDefault(); return false };
