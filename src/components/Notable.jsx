var $ = require('jquery');
var React = require('react');
var Annotation = require('./Annotation.jsx')

//component for notable objects
  //selectable custom tag and unique IDs
var Notable = React.createClass({

  // getInitialState: function() {
  // },

  componentDidMount: function() {
    $(React.findDOMNode(this.refs.conor)).css({
      top: this.position().top,
      left: this.position().left + 10
    });
  },

  position: function(){
    var offset = $(React.findDOMNode(this.refs.jason)).offset()
    var width = $(React.findDOMNode(this.refs.jason)).width();
    // var height = $('customClickedDiv').height();

    return {
      top: offset.top,
      left: offset.left + width
    }
  },

  annotationPopUp: function(e){
    if (!React.findDOMNode(this.refs.conor).contains(e.target)) {
      $(React.findDOMNode(this.refs.conor)).fadeToggle();
    }
    //render annotation component
      //render annotation component to the body using jsx
        //you need to pass along the positioning as a prop so that you have access to it in the annotation comp
  },

  render: function(){
    return (
      <span className="jason" ref="jason" onClick={this.annotationPopUp}>
        Hello world
        <Annotation ref="conor" parentText={this.props.text}>
        </Annotation>
      </span>

    );
  }

});

module.exports = Notable;
        // {this.props.innerHTML}
