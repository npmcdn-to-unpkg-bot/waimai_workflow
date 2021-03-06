'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinCommonMixin = require('../mixin/CommonMixin');

var _mixinCommonMixin2 = _interopRequireDefault(_mixinCommonMixin);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Combobox = require('./Combobox');

var _Combobox2 = _interopRequireDefault(_Combobox);

function noop() {}

function generateOptions(length, disabledOptions, hideDisabledOptions) {
  var arr = [];
  for (var value = 0; value < length; value++) {
    if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
      arr.push(value);
    }
  }
  return arr;
}

var Panel = _react2['default'].createClass({
  displayName: 'Panel',

  propTypes: {
    prefixCls: _react.PropTypes.string,
    value: _react.PropTypes.object,
    locale: _react.PropTypes.object,
    placeholder: _react.PropTypes.string,
    gregorianCalendarLocale: _react.PropTypes.object,
    formatter: _react.PropTypes.object,
    disabledHours: _react.PropTypes.func,
    disabledMinutes: _react.PropTypes.func,
    disabledSeconds: _react.PropTypes.func,
    hideDisabledOptions: _react.PropTypes.bool,
    onChange: _react.PropTypes.func,
    onEsc: _react.PropTypes.func,
    allowEmpty: _react.PropTypes.bool,
    showHour: _react.PropTypes.bool,
    showSecond: _react.PropTypes.bool,
    onClear: _react.PropTypes.func
  },

  mixins: [_mixinCommonMixin2['default']],

  getDefaultProps: function getDefaultProps() {
    return {
      onChange: noop,
      onClear: noop
    };
  },

  getInitialState: function getInitialState() {
    return {
      value: this.props.value,
      selectionRange: []
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var value = nextProps.value;
    if (value) {
      this.setState({
        value: value
      });
    }
  },

  onChange: function onChange(newValue) {
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  },

  onClear: function onClear() {
    this.props.onClear();
  },

  onCurrentSelectPanelChange: function onCurrentSelectPanelChange(currentSelectPanel) {
    this.setState({ currentSelectPanel: currentSelectPanel });
  },

  render: function render() {
    var _props = this.props;
    var locale = _props.locale;
    var prefixCls = _props.prefixCls;
    var placeholder = _props.placeholder;
    var disabledHours = _props.disabledHours;
    var disabledMinutes = _props.disabledMinutes;
    var disabledSeconds = _props.disabledSeconds;
    var hideDisabledOptions = _props.hideDisabledOptions;
    var allowEmpty = _props.allowEmpty;
    var showHour = _props.showHour;
    var showSecond = _props.showSecond;
    var formatter = _props.formatter;
    var gregorianCalendarLocale = _props.gregorianCalendarLocale;

    var value = this.state.value;
    var disabledHourOptions = disabledHours();
    var disabledMinuteOptions = disabledMinutes(value ? value.getHourOfDay() : null);
    var disabledSecondOptions = disabledSeconds(value ? value.getHourOfDay() : null, value ? value.getMinutes() : null);
    var hourOptions = generateOptions(24, disabledHourOptions, hideDisabledOptions);
    var minuteOptions = generateOptions(60, disabledMinuteOptions, hideDisabledOptions);
    var secondOptions = generateOptions(60, disabledSecondOptions, hideDisabledOptions);

    return _react2['default'].createElement(
      'div',
      { className: prefixCls + '-inner' },
      _react2['default'].createElement(_Header2['default'], {
        prefixCls: prefixCls,
        gregorianCalendarLocale: gregorianCalendarLocale,
        locale: locale,
        value: value,
        currentSelectPanel: this.state.currentSelectPanel,
        onEsc: this.props.onEsc,
        formatter: formatter,
        placeholder: placeholder,
        hourOptions: hourOptions,
        minuteOptions: minuteOptions,
        secondOptions: secondOptions,
        disabledHours: disabledHours,
        disabledMinutes: disabledMinutes,
        disabledSeconds: disabledSeconds,
        onChange: this.onChange,
        onClear: this.onClear,
        allowEmpty: allowEmpty
      }),
      _react2['default'].createElement(_Combobox2['default'], {
        prefixCls: prefixCls,
        value: value,
        gregorianCalendarLocale: gregorianCalendarLocale,
        formatter: formatter,
        onChange: this.onChange,
        showHour: showHour,
        showSecond: showSecond,
        hourOptions: hourOptions,
        minuteOptions: minuteOptions,
        secondOptions: secondOptions,
        disabledHours: disabledHours,
        disabledMinutes: disabledMinutes,
        disabledSeconds: disabledSeconds,
        onCurrentSelectPanelChange: this.onCurrentSelectPanelChange
      })
    );
  }
});

exports['default'] = Panel;
module.exports = exports['default'];