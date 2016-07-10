'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCheckedValue(children) {
  var value = null;
  var matched = false;
  _react2.default.Children.forEach(children, function (radio) {
    if (radio.props && radio.props.checked) {
      value = radio.props.value;
      matched = true;
    }
  });
  return matched ? { value: value } : undefined;
}

exports.default = _react2.default.createClass({
  displayName: 'group',
  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'ant-radio-group',
      disabled: false,
      onChange: function onChange() {}
    };
  },
  getInitialState: function getInitialState() {
    var props = this.props;
    var value = undefined;
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    } else {
      var checkedValue = getCheckedValue(props.children);
      value = checkedValue && checkedValue.value;
    }
    return {
      value: value
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    } else {
      var checkedValue = getCheckedValue(nextProps.children);
      if (checkedValue) {
        this.setState({
          value: checkedValue.value
        });
      }
    }
  },
  onRadioChange: function onRadioChange(ev) {
    if (!('value' in this.props)) {
      this.setState({
        value: ev.target.value
      });
    }
    this.props.onChange(ev);
  },
  render: function render() {
    var _this = this;

    var props = this.props;
    var children = _react2.default.Children.map(props.children, function (radio) {
      if (radio.props) {
        var keyProps = {};
        if (!('key' in radio) && typeof radio.props.value === 'string') {
          keyProps.key = radio.props.value;
        }
        return _react2.default.cloneElement(radio, _extends({}, keyProps, radio.props, {
          onChange: _this.onRadioChange,
          checked: _this.state.value === radio.props.value,
          disabled: radio.props.disabled || _this.props.disabled
        }));
      }
      return radio;
    });
    return _react2.default.createElement(
      'div',
      { className: props.prefixCls + ' ' + props.prefixCls + '-' + props.size },
      children
    );
  }
});
module.exports = exports['default'];