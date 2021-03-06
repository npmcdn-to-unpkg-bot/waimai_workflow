'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Step = _react2['default'].createClass({
  displayName: 'Step',

  propTypes: {
    className: _react2['default'].PropTypes.string,
    prefixCls: _react2['default'].PropTypes.string,
    style: _react2['default'].PropTypes.object,
    tailWidth: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
    status: _react2['default'].PropTypes.string,
    iconPrefix: _react2['default'].PropTypes.string,
    icon: _react2['default'].PropTypes.string,
    maxDescriptionWidth: _react2['default'].PropTypes.number,
    stepLast: _react2['default'].PropTypes.bool,
    stepNumber: _react2['default'].PropTypes.string,
    description: _react2['default'].PropTypes.any,
    title: _react2['default'].PropTypes.any
  },
  render: function render() {
    var _classNames, _classNames2;

    var _props = this.props;
    var className = _props.className;
    var prefixCls = _props.prefixCls;
    var style = _props.style;
    var tailWidth = _props.tailWidth;
    var _props$status = _props.status;
    var status = _props$status === undefined ? 'wait' : _props$status;
    var iconPrefix = _props.iconPrefix;
    var icon = _props.icon;
    var maxDescriptionWidth = _props.maxDescriptionWidth;
    var stepLast = _props.stepLast;
    var stepNumber = _props.stepNumber;
    var description = _props.description;
    var title = _props.title;

    var restProps = _objectWithoutProperties(_props, ['className', 'prefixCls', 'style', 'tailWidth', 'status', 'iconPrefix', 'icon', 'maxDescriptionWidth', 'stepLast', 'stepNumber', 'description', 'title']);

    var iconClassName = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefixCls + '-icon', true), _defineProperty(_classNames, iconPrefix + 'icon', true), _defineProperty(_classNames, iconPrefix + 'icon-' + (icon || 'check'), true), _classNames));
    var iconNode = icon || status === 'finish' ? _react2['default'].createElement('span', { className: iconClassName }) : _react2['default'].createElement(
      'span',
      { className: prefixCls + '-icon' },
      stepNumber
    );
    var classString = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, className, !!className), _defineProperty(_classNames2, prefixCls + '-item', true), _defineProperty(_classNames2, prefixCls + '-item-last', stepLast), _defineProperty(_classNames2, prefixCls + '-status-' + status, true), _defineProperty(_classNames2, prefixCls + '-custom', icon), _classNames2));
    return _react2['default'].createElement(
      'div',
      _extends({}, restProps, { className: classString, style: { width: tailWidth } }),
      stepLast ? '' : _react2['default'].createElement(
        'div',
        { className: prefixCls + '-tail' },
        _react2['default'].createElement('i', null)
      ),
      _react2['default'].createElement(
        'div',
        { className: prefixCls + '-head' },
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-head-inner' },
          iconNode
        )
      ),
      _react2['default'].createElement(
        'div',
        { className: prefixCls + '-main', style: { maxWidth: maxDescriptionWidth } },
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-title' },
          title
        ),
        description ? _react2['default'].createElement(
          'div',
          { className: prefixCls + '-description' },
          description
        ) : ''
      )
    );
  }
});

module.exports = Step;