'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateTHead = require('./DateTHead');

var _DateTHead2 = _interopRequireDefault(_DateTHead);

var _DateTBody = require('./DateTBody');

var _DateTBody2 = _interopRequireDefault(_DateTBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTable = function (_React$Component) {
  _inherits(DateTable, _React$Component);

  function DateTable() {
    _classCallCheck(this, DateTable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DateTable).apply(this, arguments));
  }

  _createClass(DateTable, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var prefixCls = props.prefixCls;
      return _react2.default.createElement(
        'table',
        { className: prefixCls + '-table', cellSpacing: '0', role: 'grid' },
        _react2.default.createElement(_DateTHead2.default, props),
        _react2.default.createElement(_DateTBody2.default, props)
      );
    }
  }]);

  return DateTable;
}(_react2.default.Component);

exports.default = DateTable;
module.exports = exports['default'];