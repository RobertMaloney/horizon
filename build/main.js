var app=require("app"),BrowserWindow=require("browser-window");require("crash-reporter").start();var mainWindow=null;app.on("window-all-closed",function(){"darwin"!=process.platform&&app.quit()}),app.on("ready",function(){var i=require("screen"),r=i.getPrimaryDisplay().workAreaSize;mainWindow=new BrowserWindow({width:r.width,height:r.height/2,frame:!1}),mainWindow.loadUrl("file://"+__dirname+"/main.html"),mainWindow.show(),mainWindow.on("closed",function(){mainWindow=null})});