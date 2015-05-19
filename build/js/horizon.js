var fs=require("fs"),ws=require("./lib/windows-shortcuts/lib/windows-shortcuts.js"),remote=require("remote"),Menu=remote.require("menu"),PanelData=function(e){this.name=e,this.links=[]};PanelData.prototype.addLink=function(e){return this.links.push({name:e.name,uri:e.uri}),!0},PanelData.prototype.removeAt=function(e){return e>=this.links.length?!1:0>e?!1:(this.links.splice(e,1),!0)},PanelData.prototype.addFileByEvent=function(e,t){e.preventDefault();var n=e.dataTransfer.files[0],i=this.addLink.bind(this);parseConfig(n.path,function(e,n){e||i(n),t(!e)})},PanelData.prototype.makeContext=function(e,t){var n=this.removeAt.bind(this,e),i=function(e){"delete"===e&&n(),t()},r=Menu.buildFromTemplate([{label:"Delete",click:i.bind(this,"delete")}]);r.popup(remote.getCurrentWindow())},String.prototype.capFirst=function(){return this.charAt(0).toUpperCase()+this.slice(1)};var parseConfig=function(e,t){var n=!1,i=e.slice(e.lastIndexOf("\\")+1),r=fs.lstatSync(e);if(r.isDirectory())t(n,{name:i,uri:e});else{var a=i.slice(i.lastIndexOf(".")+1);i=i.slice(0,i.lastIndexOf(".")),"lnk"===a?ws.query(e,function(e,n){t(e,{name:i,uri:n.target})}):t(n,{name:i,uri:e})}};document.getElementById("main").addEventListener("mousedown",function(e){e.preventDefault()},!1),window.ondragover=function(e){return e.dataTransfer.dropEffect="none",e.preventDefault(),!1},window.ondrop=function(e){return e.preventDefault(),!1};