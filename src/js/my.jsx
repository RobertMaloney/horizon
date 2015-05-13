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
    shell.openExternal(this.props.uri);
  },
  onMouseOver: function() {
    this.setState({mouseover: true});
  },
  onMouseOut: function() {
    this.setState({mouseover: false});
  },
  render: function() {
    var _class = "runnable";

    return (
      <div onClick={this.handleClick}
        onMouseOut={this.onMouseOut} className={_class}>
        <div className={"appName"}>{this.props.name}</div>
      </div>
    );
  }
});

var Panel = React.createClass({
  getInitialState: function() {
    return {dragged: false};
  },
  onDrag: function(evt) {
    if (evt.type == "dragover")
      this.setState({dragged: true});
    else
      this.setState({dragged: false});
  },
  onDrop: function(evt) {
    this.props.panels[this.props.id].addFileByEvent(evt);
    this.setState({dragged: false});
  },
  render: function() {
    var _style = {
      backgroundColor: (this.state.dragged) ? 'lightgrey' : 'transparent'
    }
    var runnables = [];
    if (this.props.id > -1) {
      var plinks = this.props.panels[this.props.id].links;
      for (var i = 0; i < plinks.length; ++i)
        runnables.push(<Runnable name={plinks[i].name} uri={plinks[i].uri}/>);
    }
    return (
      <div className={"panel"} style={_style} onDragOver={this.onDrag} onDragLeave={this.onDrag} onDrop={this.onDrop}>{runnables}</div>
    );
  }
});

var Nav = React.createClass({
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
          <li className={_selectedButton}>{data[i].name}</li>
        );
      else
        tabs.push(
          <li className={_buttonClass} onClick={this.props.onSelectPanel.bind(this,i)}>{data[i].name}</li>
        );

    return (
      <ul>{tabs}</ul>
    );
  }
});

var Header = React.createClass({
  render: function() {
    var _class = "panelLabel";
    var _name = (this.props.id < 0) ? 'Horizon' : this.props.panels[this.props.id].name.capFirst();

    return (
      <div>
        <h1 className={_class}>{_name}</h1>
        <Nav panels={this.props.panels} id={this.props.id} onSelectPanel={this.props.onSelectPanel}/>
      </div>
    );
  }
})

var Container = React.createClass({
  getInitialState: function() {
    return {
      id: -1,
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
      <div className={_class}>
        <Header panels={this.state.panels} id={this.state.id} onSelectPanel={this.onSelectPanel}/>
        <Panel panels={this.state.panels} id={this.state.id}/>
      </div>
    )
  }
});

var _panels = [new PanelData('apps'), new PanelData('games')];
_panels[0].addLink({name: 'cygwin64', uri: apps[0]});
_panels[0].addLink({name: 'pictureeeeeeeeeeeeeeeeeeeeeeee', uri: 'C:/Users/Rob/Desktop/Profile.png'});
_panels[1].addLink({name: 'atom', uri: apps[1]});

React.render(<Container panels={_panels}/>, document.getElementById("main"));
