var exec = require('child_process').exec;

exports.extractIcon = function(path, name, callback) {
  var iconPath = ' "..\\..\\icons\\'+name+'.png"';
  path = '"' + path + '"';
  var executable = '"' + __dirname + '\\HorizonIconExtractor.exe" ';

	exec(
    executable + path + iconPath,
    {cwd: __dirname},
    function(error, stdout, stderr) {
      if (error !== null) {
        console.log('IconExtractor ERROR: ' + error);
      }
      callback(error, '.\\icons\\' + name + '.png');
	});
};
