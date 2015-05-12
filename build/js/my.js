/**
 * ReactJS Design
 * The main container will hold the header and current panel. The default panel
 * is the most recently used runnables. The header has a label for the currently
 * selected panel, and tabs to switch between panels.
 */

var apps = ["C:\\cygwin64\\bin\\mintty.exe",
            "C:\\Users\\Rob\\AppData\\Local\\atom\\app-0.198.0\\atom.exe"];

var shell = require('shell');

var Runnable = React.createClass({displayName: "Runnable",
  getInitialState: function() {
    return {
      mouseover: false
    };
  },
  handleClick: function() {
    shell.openExternal(this.props.uri);
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
      backgroundColor: (this.state.mouseover) ? 'grey' : 'black'
    };
    var _class = "runnable";

    return (
      React.createElement("div", {onClick: this.handleClick, onMouseOver: this.onMouseOver, 
        onMouseOut: this.onMouseOut, onContextMenu: this.deleteMe, 
        style: style, className: _class})
    );
  }
});

var Panel = React.createClass({displayName: "Panel",
  render: function() {
    var runnables = [];
    var plinks = this.props.panels[this.props.id].links;
    for (var i = 0; i < plinks.length; ++i)
      runnables.push(React.createElement(Runnable, {uri: plinks[i].uri}));

    return (
      React.createElement("div", null, runnables)
    );
  }
});

var Nav = React.createClass({displayName: "Nav",
  getInitialState: function() {
    return {
      panels: this.props.panels
    }
  },
  render: function() {
    var data = this.state.panels;
    var tabs = [];
    var _buttonClass = "menuButton";
    var _selectedButton = "menuButton selected";

    for (var i = 0; i < data.length; ++i)
      if (i == this.props.id)
        tabs.push(
          React.createElement("li", {className: _selectedButton}, data[i].name)
        );
      else
        tabs.push(
          React.createElement("li", {className: _buttonClass, onClick: this.props.onSelectPanel.bind(this,i)}, data[i].name)
        );

    return (
      React.createElement("ul", null, tabs)
    );
  }
});

var Header = React.createClass({displayName: "Header",
  render: function() {
    var _class = "panelLabel";
    return (
      React.createElement("div", null, 
        React.createElement("h1", {className: _class}, "Horizon"), 
        React.createElement(Nav, {panels: this.props.panels, id: this.props.id, onSelectPanel: this.props.onSelectPanel})
      )
    );
  }
})

var Container = React.createClass({displayName: "Container",
  getInitialState: function() {
    return {
      id: 0,
      panels: this.props.panels
    };
  },
  onSelectPanel: function(new_id) {
    this.setState({
      id: new_id,
      panels: this.state.panels
    });
  },
  render: function() {
    var _class = "container";

    return (
      React.createElement("div", {className: _class}, 
        React.createElement(Header, {panels: this.state.panels, id: this.state.id, onSelectPanel: this.onSelectPanel}), 
        React.createElement(Panel, {panels: this.state.panels, id: this.state.id})
      )
    )
  }
});

var _panels = [new PanelData('apps'), new PanelData('games')];
_panels[0].addLink({name: 'cygwin64', uri: apps[0]});
_panels[1].addLink({name: 'atom', uri: apps[1]});

React.render(React.createElement(Container, {panels: _panels}), document.getElementById("main"));
