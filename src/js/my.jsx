/**
 * ReactJS Design
 * The main container will hold the header and current panel. The default panel
 * is the most recently used runnables. The header has a label for the currently
 * selected panel, and tabs to switch between panels.
 */

var apps = ["C:\\cygwin64\\bin\\mintty.exe",
            "C:\\Users\\Rob\\AppData\\Local\\atom\\app-0.198.0\\atom.exe"];

var shell = require('shell');

var Runnable = React.createClass({
  getInitialState: function() {
    return {
      mouseover: false
    };
  },
  handleClick: function() {
    shell.openExternal(apps[this.props.urlid]);
  },
  onMouseOver: function() {
    this.setState({mouseover: true});
  },
  onMouseOut: function() {
    this.setState({mouseover: false});
  },
  deleteMe: function() {
    this.props.onDelete();
  },
  render: function() {
    var style = {
      top: 10,
      left: 10 + 45*this.props.urlid,
      backgroundColor: (this.state.mouseover) ? 'grey' : 'black'
    };
    var _class = "runnable";

    return (
      <div onClick={this.handleClick} onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut} onContextMenu={this.deleteMe}
        style={style} className={_class}></div>
    );
  }
});

var Panel = React.createClass({
  onDelete: function(id) {
    ids--;
    this.setState({});
  },
  render: function() {
    var runnables = [];
    var ids = 2;
    for (var i = 0; i < ids; ++i)
      runnables.push(Runnable({urlid:i, onDelete: this.onDelete}));

    return (
      <div>{runnables}</div>
    );
  }
});

var Nav = React.createClass({
  getInitialState: function() {
    return {
      tabId: 0
    }
  },
  render: function() {
    var tabTitles = ["apps", "games"];
    var tabs = [];
    var _buttonClass = "menuButton";
    for (var i = 0; i < tabTitles.length; ++i)
      tabs.push(
        <li className={_buttonClass}>{tabTitles[i]}</li>
      );

    return (
      <ul>{tabs}</ul>
    );
  }
});

var Header = React.createClass({
  render: function() {
    var _class = "panelLabel";
    return (
      <div>
        <h1 className={_class}>Horizon</h1>
        <Nav />
      </div>
    );
  }
})

var Container = React.createClass({
  render: function() {
    var _class = "container";

    return (
      <div className={_class}>
        <Header />
        <Panel />
      </div>
    )
  }
});

React.render(<Container />, document.getElementById("main"));
