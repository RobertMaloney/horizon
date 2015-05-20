var fs = require("fs");
var remote = require("remote");
var Menu = remote.require("menu");
var ws = require("../lib/windows-shortcuts/lib/windows-shortcuts.js");
var ie = require("../lib/iconextractor/iconextractor.js");

var PanelData = function(name) {
  this.name = name;
  this.links = [];
}

PanelData.prototype.addLink = function(config) {
  this.links.push(config);
  return true;
}

PanelData.prototype.removeAt = function(id) {
  if (id >= this.links.length) return false;
  if (id < 0) return false;

  if (typeof this.links[id].imageuri !== "undefined") {
    fs.unlink('build/' + this.links[id].imageuri, function(err) {
      if (err) console.log("Delete failed.");
    });
  }

  this.links.splice(id, 1);
  return true;
}

// async because parseConfig is async
PanelData.prototype.addFileByEvent = function(evt, callback) {
  evt.preventDefault();
  var file = evt.dataTransfer.files[0];
  var _AL = this.addLink.bind(this);
  parseConfig(file.path, function(err,data) {
    if (!err) {
      ie.extractIcon(data.uri, data.name, function(error, location) {
        if (!error)
          data.imageuri = location;
        _AL(data);
        callback(!err);
      });
    }
  });
}

PanelData.prototype.makeContext = function(id, reset) {
  var _delete = this.removeAt.bind(this,id);
  var _action = function (arg) {
    if (arg === "delete") {
      _delete();
    }
    reset();
  }
  var menu = Menu.buildFromTemplate([
    {
      label: 'Delete',
      click: _action.bind(this,"delete")
    }
  ]);
  menu.popup(remote.getCurrentWindow());
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
};

module.exports = PanelData;
