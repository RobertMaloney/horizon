document.getElementById("main").addEventListener("mousedown",function(e){e.preventDefault()},!1),window.ondragover=function(e){return e.dataTransfer.dropEffect="none",e.preventDefault(),!1},window.ondrop=function(e){return e.preventDefault(),!1},String.prototype.capFirst=function(){return this.charAt(0).toUpperCase()+this.slice(1)};