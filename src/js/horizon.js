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

String.prototype.capFirst = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
