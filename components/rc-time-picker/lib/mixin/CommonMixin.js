'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _localeEn_US = require('../locale/en_US');

var _localeEn_US2 = _interopRequireDefault(_localeEn_US);

exports['default'] = {
  propTypes: {
    prefixCls: _react.PropTypes.string,
    locale: _react.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-time-picker',
      locale: _localeEn_US2['default']
    };
  }
};
module.exports = exports['default'];