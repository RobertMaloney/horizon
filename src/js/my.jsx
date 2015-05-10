var apps = ["C:\\cygwin64\\bin\\mintty.exe",
            "C:\\Users\\Rob\\AppData\\Local\\atom\\app-0.198.0\\atom.exe"];

var shell = require('shell');

var Runnable = React.createClass({
  handleClick: function() {
    shell.openExternal(apps[this.props.urlid]);
  },
  render: function() {
    var style = {
      position: 'absolute',
      top: 10,
      left: 10 + 45*this.props.urlid,
      width: 40,
      height: 40,
      backgroundColor: 'black'
    };

    return (
      <div onClick={this.handleClick} style={style}></div>
    );
  }
});

var Panel = React.createClass({
  render: function () {
    var runnables = [];
    runnables.push(Runnable({urlid:0}));
    runnables.push(Runnable({urlid:1}));
    return (
      <div>{runnables}</div>
    )
  }
});

React.render(<Panel />, document.getElementById('main'));
