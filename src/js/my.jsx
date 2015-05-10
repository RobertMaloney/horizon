var cygwin = "C:\\cygwin64\\bin\\mintty.exe";

var shell = require('shell');

var Runnable = React.createClass({
  handleClick: function() {
    shell.openExternal(cygwin);
  },
  render: function() {
    var style = {
      position: 'absolute',
      width: 40,
      height: 40,
      backgroundColor: 'black'
    };

    return (
      <div onClick={this.handleClick} style={style}></div>
    );
  }
});

React.render(<Runnable />, document.getElementById('main'));
