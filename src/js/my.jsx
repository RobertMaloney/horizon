/**
 * ReactJS Design
 * The main container will hold the header and current panel. The default panel
 * is the most recently used runnables. The header has a label for the currently
 * selected panel, and tabs to switch between panels.
 */

var shell = require('shell');
var remote = require("remote");

var Runnable = React.createClass({
  getInitialState: function() {
    return {
      mouseover: false
    };
  },
  handleClick: function() {
    shell.openItem(this.props.data.uri);
  },
  onContext: function(evt) {
    this.props.contextCallback(this.props.id);
  },
  render: function() {
    var _class = "runnable";
    var imageuri = this.props.data.imageuri;
    var imageElement;
    if (typeof imageuri !== "undefined")
      imageElement = <img className={"DIM64"} src={this.props.data.imageuri}></img>;
    else
      imageElement = <div></div>;

    return (
      <div onClick={this.handleClick}
        onContextMenu={this.onContext} className={_class}>
        {imageElement}
        <div className={"appName"}>{this.props.data.name}</div>
      </div>
    );
  }
});

var Panel = React.createClass({
  getInitialState: function() {
    return {dragged: false};
  },
  onDrag: function(evt) {
    evt.dataTransfer.dropEffect = "link";
    evt.stopPropagation();
    evt.preventDefault();
    if (evt.type == "dragover")
      this.setState({dragged: true});
    else
      this.setState({dragged: false});
  },
  onDrop: function(evt) {
    var callstate = this.setState.bind(this,{dragged: false});
    this.props.panels[this.props.id].addFileByEvent(evt, function (changed) {
      if (changed) callstate();
    });
  },
  onContext: function(id) {
    this.props.panels[this.props.id].makeContext(id, this.setState.bind(this));
  },
  render: function() {
    var _style = {
      backgroundColor: (this.state.dragged) ? 'lightgrey' : 'transparent'
    }
    var runnables = [];
    if (this.props.id > -1) {
      var plinks = this.props.panels[this.props.id].links;
      for (var i = 0; i < plinks.length; ++i)
        runnables.push(<Runnable id={i} contextCallback={this.onContext.bind(this)} data={plinks[i]}/>);
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

var _horizon = new Horizon();
remote.getCurrentWindow().on('close', function() {
  _horizon.save();
});

React.render(<Container panels={_horizon.panels}/>, document.getElementById("main"));
