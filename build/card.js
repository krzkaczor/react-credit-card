// Generated by CoffeeScript 1.8.0
(function() {
  var Payment, React, exp, images, validate;

  React = require('react');

  Payment = require('payment');

  images = require('./card-images.js');

  validate = Payment.fns;

  module.exports = React.createClass({
    displayName: 'Card',
    getDefaultProps: function() {
      return {
        number: null,
        cvc: null,
        name: '',
        expiry: '',
        focused: null,
        expiryBefore: 'month/year',
        expiryAfter: 'valid thru',
        shinyAfterBack: '',
        type: null
      };
    },
    render: function() {
      return React.createElement("div", {
        "className": "" + exp.prefix + "__container"
      }, React.createElement("div", {
        "className": ("" + exp.prefix + " ") + this.typeClassName() + (this.props.focused === "cvc" ? " " + exp.prefix + "--flipped" : "")
      }, React.createElement("div", {
        "className": "" + exp.prefix + "__front"
      }, React.createElement("div", {
        "className": "" + exp.prefix + "__lower"
      }, React.createElement("div", {
        "className": "" + exp.prefix + "__shiny"
      }), React.createElement("img", {
        "className": ("" + exp.prefix + "__logo ") + this.typeClassName(),
        "src": images[this.props.type ? this.props.type : this.state.type.name]
      }), React.createElement("div", {
        "className": this.displayClassName("number")
      }, this.getValue("number")), React.createElement("div", {
        "className": this.displayClassName("name")
      }, this.getValue("name")), React.createElement("div", {
        "className": this.displayClassName("expiry"),
        "data-before": this.props.expiryBefore,
        "data-after": this.props.expiryAfter
      }, this.getValue("expiry")))), React.createElement("div", {
        "className": "" + exp.prefix + "__back"
      }, "\x3Cimg src=", this.getValue("qrCode"), "\x3E")));
    },
    displayClassName: function(base) {
      var className;
      className = ("" + exp.prefix + "__") + base + (" " + exp.prefix + "__display");
      if (this.props.focused === base) {
        className += " " + exp.prefix + "--focused";
      }
      return className;
    },
    typeClassName: function() {
      return ("" + exp.prefix + "--") + (this.props.type ? this.props.type : this.state.type.name);
    },
    getValue: function(name) {
      return this[name]();
    },
    componentWillMount: function() {
      return this.updateType(this.props);
    },
    componentWillReceiveProps: function(nextProps) {
      return this.updateType(nextProps);
    },
    getInitialState: function() {
      return {
        type: {
          name: "unknown",
          length: 16
        }
      };
    },
    updateType: function(props) {
      var type;
      if (!props.number) {
        return this.setState({
          type: {
            name: "unknown",
            length: 16
          }
        });
      }
      if (type = validate.cardType(props.number)) {
        if (type === "amex") {
          return this.setState({
            type: {
              name: type,
              length: 15
            }
          });
        } else {
          return this.setState({
            type: {
              name: type,
              length: 16
            }
          });
        }
      }
      return this.setState({
        type: {
          name: "unknown",
          length: 16
        }
      });
    },
    number: function() {
      var amountOfSpaces, i, maxLength, space_index, space_index1, space_index2, string, _i;
      if (!this.props.number) {
        string = "";
      } else {
        string = this.props.number.toString();
      }
      maxLength = this.state.type.length;
      if (string.length > maxLength) {
        string = string.slice(0, maxLength);
      }
      while (string.length < maxLength) {
        string += "•";
      }
      if (this.state.type.name === "amex") {
        space_index1 = 4;
        space_index2 = 10;
        string = string.substring(0, space_index1) + " " + string.substring(space_index1, space_index2) + " " + string.substring(space_index2);
      } else {
        amountOfSpaces = Math.ceil(maxLength / 4);
        for (i = _i = 1; 1 <= amountOfSpaces ? _i < amountOfSpaces : _i > amountOfSpaces; i = 1 <= amountOfSpaces ? ++_i : --_i) {
          space_index = i * 4 + (i - 1);
          string = string.slice(0, space_index) + " " + string.slice(space_index);
        }
      }
      return string;
    },
    name: function() {
      if (this.props.name === "") {
        return "FULL NAME";
      } else {
        return this.props.name;
      }
    },
    expiry: function() {
      var expiry, expiryMaxLength;
      if (this.props.expiry === "") {
        return "••/••";
      } else {
        expiry = this.props.expiry.toString();
        expiryMaxLength = 6;
        if (expiry.match(/\//)) {
          expiry = expiry.replace("/", "");
        }
        if (!expiry.match(/^[0-9]*$/)) {
          return "••/••";
        }
        while (expiry.length < 4) {
          expiry += "•";
        }
        expiry = expiry.slice(0, 2) + "/" + expiry.slice(2, expiryMaxLength);
        return expiry;
      }
    },
    cvc: function() {
      if (this.props.cvc === null) {
        return "•••";
      } else {
        if (this.props.cvc.toString().length <= 4) {
          return this.props.cvc;
        } else {
          return this.props.cvc.toString().slice(0, 4);
        }
      }
    }
  });

  exp = module.exports;

  exp.prefix = "react-credit-card";

}).call(this);
