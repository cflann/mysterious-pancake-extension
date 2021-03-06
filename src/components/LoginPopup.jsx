var $ = require('jquery');
var React = require('react');
var Firebase = require('firebase');
var pageParser = require('../pageParser.jsx')

var LoginPopup = React.createClass({

  getInitialState: function() {
    return {
      newUser: false,
      attempted: false,
      success: false
    }
  },

  submitLogin: function(e, _email, _password) {
    this.setState({
      attempted: true
    });
    var email = e === null ? _email : $(React.findDOMNode(this.refs.l_email)).val();
    var password = e === null ? _password : $(React.findDOMNode(this.refs.l_password)).val();
    console.log(email);

    var ref = new Firebase("https://popping-torch-5999.firebaseio.com");
    ref.authWithPassword({
      email    : email,
      password : password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
          //If the user logged in then call pageParser
          pageParser();
        this.setState({
          newUser: false,
          success: true
        });
      }
    }.bind(this));

    $(React.findDOMNode(this.refs.l_email)).val('');
    $(React.findDOMNode(this.refs.l_password)).val('');
  },

  submitSignup: function() {
    var email = $(React.findDOMNode(this.refs.s_email)).val();
    var password = $(React.findDOMNode(this.refs.s_password)).val();
    console.log("email:", email);

    var ref = new Firebase("https://popping-torch-5999.firebaseio.com");
    ref.createUser({
      email    : email,
      password : password
    }, function(error, authData) {
      if (error) {
        console.log("Signup Failed!", error);
      } else {
        console.log("Signed up successfully with payload:", authData);
        this.submitLogin(null, email, password);
      }
    }.bind(this));

    $(React.findDOMNode(this.refs.s_email)).val('');
    $(React.findDOMNode(this.refs.s_password)).val('');
  },

  toggleNewUserState: function() {
    this.setState({
      newUser: !this.state.newUser
    });
  },

  render: function() {
    var newUser = this.state.newUser;
    var attempted = this.state.attempted;
    var success = this.state.success;
    var classStringSuccess = "mgnl-success";
    var classStringFailure = "mgnl-failure";
    classStringSuccess += attempted ? ((success) ? " mgnl-visible" : " mgnl-hidden") : " mgnl-hidden";
    classStringFailure += attempted ? ((!success) ? " mgnl-visible" : " mgnl-hidden") : " mgnl-hidden";
    var classStringLogin = (!newUser && !success) ? "mgnl-reset mgnl-login mgnl-visible" : "mgnl-reset mgnl-login mgnl-hidden";
    var classStringSignup = (newUser && !success) ? "mgnl-reset mgnl-signup mgnl-visible" : "mgnl-reset mgnl-signup mgnl-hidden";


    return (
      <div className="mgnl-reset mgnl-user-popup">
        <div className={classStringSuccess}>You are now logged in!</div>
        <div className={classStringFailure}>Failed...</div>
        <div className={classStringLogin}>
          Login
          <input className="mgnl-reset stephanie-input" id="mgnl-email" ref="l_email"></input>
          <input className="mgnl-reset stephanie-input" id="mgnl-password" type="password" ref="l_password"></input>
          <button className="mgnl-reset stephanie-button" onClick={this.submitLogin}>Login</button>
          <span className="mgnl-reset" onClick={this.toggleNewUserState}>New user?</span>
        </div>
        <div className={classStringSignup}>
          Signup
          <input className="mgnl-reset stephanie-input" id="mgnl-email" ref="s_email"></input>
          <input className="mgnl-reset stephanie-input" id="mgnl-password" type="password" ref="s_password"></input>
          <button className="mgnl-reset stephanie-button" onClick={this.submitSignup}>Signup</button>
          <span className="mgnl-reset" onClick={this.toggleNewUserState}>Already signed up?</span>
        </div>
      </div>
    );
  }

});

module.exports = LoginPopup;