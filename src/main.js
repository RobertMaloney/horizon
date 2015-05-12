var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var Menu = require('menu');
var Tray = require('tray');
var NativeImage = require('native-image');

// Report crashes to our server.
require('crash-reporter').start();

var mainWindow = null;
var mainTray = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  var myScreen = require('screen');
  var size = myScreen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: size.width,
    height: size.height/2,
    frame: false,
    "skip-taskbar": true
  });

  mainWindow.loadUrl('file://' + __dirname + '/main.html');
  mainWindow.show();
  mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  var icon = NativeImage.createFromPath(__dirname.slice(2) + '/css/tray.png');
  mainTray = new Tray(icon);
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Quit', type: 'normal', click: function() {mainWindow.close();} }
  ]);
  mainTray.setToolTip('This is my application.');
  mainTray.setContextMenu(contextMenu);
});
