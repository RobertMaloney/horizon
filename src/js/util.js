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

// captializes first letter of a String
String.prototype.capFirst = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
