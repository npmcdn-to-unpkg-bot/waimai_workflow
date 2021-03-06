'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcTrigger = require('rc-trigger');

var _rcTrigger2 = _interopRequireDefault(_rcTrigger);

var _modulePanel = require('./module/Panel');

var _modulePanel2 = _interopRequireDefault(_modulePanel);

var _utilPlacements = require('./util/placements');

var _utilPlacements2 = _interopRequireDefault(_utilPlacements);

var _mixinCommonMixin = require('./mixin/CommonMixin');

var _mixinCommonMixin2 = _interopRequireDefault(_mixinCommonMixin);

var _utilIndex = require('./util/index');

function noop() {}

function refFn(field, component) {
  this[field] = component;
}

var Picker = _react2['default'].createClass({
  displayName: 'Picker',

  propTypes: {
    prefixCls: _react.PropTypes.string,
    locale: _react.PropTypes.object,
    value: _react.PropTypes.object,
    disabled: _react.PropTypes.bool,
    allowEmpty: _react.PropTypes.bool,
    defaultValue: _react.PropTypes.object,
    open: _react.PropTypes.bool,
    defaultOpen: _react.PropTypes.bool,
    align: _react.PropTypes.object,
    placement: _react.PropTypes.any,
    transitionName: _react.PropTypes.string,
    getPopupContainer: _react.PropTypes.func,
    placeholder: _react.PropTypes.string,
    formatter: _react.PropTypes.any,
    showHour: _react.PropTypes.bool,
    style: _react.PropTypes.object,
    className: _react.PropTypes.string,
    showSecond: _react.PropTypes.bool,
    disabledHours: _react.PropTypes.func,
    disabledMinutes: _react.PropTypes.func,
    disabledSeconds: _react.PropTypes.func,
    hideDisabledOptions: _react.PropTypes.bool,
    onChange: _react.PropTypes.func,
    onOpen: _react.PropTypes.func,
    onClose: _react.PropTypes.func
  },

  mixins: [_mixinCommonMixin2['default']],

  getDefaultProps: function getDefaultProps() {
    return {
      defaultOpen: false,
      style: {},
      className: '',
      align: {},
      allowEmpty: true,
      showHour: true,
      showSecond: true,
      disabledHours: noop,
      disabledMinutes: noop,
      disabledSeconds: noop,
      hideDisabledOptions: false,
      placement: 'bottomLeft',
      onChange: noop,
      onOpen: noop,
      onClose: noop
    };
  },

  getInitialState: function getInitialState() {
    this.savePanelRef = refFn.bind(this, 'panelInstance');
    var _props = this.props;
    var defaultOpen = _props.defaultOpen;
    var defaultValue = _props.defaultValue;
    var _props$open = _props.open;
    var open = _props$open === undefined ? defaultOpen : _props$open;
    var _props$value = _props.value;
    var value = _props$value === undefined ? defaultValue : _props$value;

    return {
      open: open,
      value: value
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var value = nextProps.value;
    var open = nextProps.open;

    if ('value' in nextProps) {
      this.setState({
        value: value
      });
    }
    if (open !== undefined) {
      this.setState({ open: open });
    }
  },

  onPanelChange: function onPanelChange(value) {
    this.setValue(value);
  },

  onPanelClear: function onPanelClear() {
    this.setValue(null);
    this.setOpen(false);
  },

  onVisibleChange: function onVisibleChange(open) {
    this.setOpen(open);
  },

  onEsc: function onEsc() {
    this.setOpen(false);
    this.refs.picker.focus();
  },

  onKeyDown: function onKeyDown(e) {
    if (e.keyCode === 40) {
      this.setOpen(true);
    }
  },

  setValue: function setValue(value) {
    if (!('value' in this.props)) {
      this.setState({
        value: value
      });
    }
    this.props.onChange(value);
  },

  getFormatter: function getFormatter() {
    var formatter = this.props.formatter;
    var locale = this.props.locale;
    if (formatter) {
      if (formatter === this.lastFormatter) {
        return this.normalFormatter;
      }
      this.normalFormatter = (0, _utilIndex.getFormatter)(formatter, locale);
      this.lastFormatter = formatter;
      return this.normalFormatter;
    }
    if (!this.props.showSecond) {
      if (!this.notShowSecondFormatter) {
        this.notShowSecondFormatter = (0, _utilIndex.getFormatter)('HH:mm', locale);
      }
      return this.notShowSecondFormatter;
    }
    if (!this.props.showHour) {
      if (!this.notShowHourFormatter) {
        this.notShowHourFormatter = (0, _utilIndex.getFormatter)('mm:ss', locale);
      }
      return this.notShowHourFormatter;
    }
    if (!this.normalFormatter) {
      this.normalFormatter = (0, _utilIndex.getFormatter)('HH:mm:ss', locale);
    }
    return this.normalFormatter;
  },

  getPanelElement: function getPanelElement() {
    var _props2 = this.props;
    var prefixCls = _props2.prefixCls;
    var defaultValue = _props2.defaultValue;
    var locale = _props2.locale;
    var placeholder = _props2.placeholder;
    var disabledHours = _props2.disabledHours;
    var disabledMinutes = _props2.disabledMinutes;
    var disabledSeconds = _props2.disabledSeconds;
    var hideDisabledOptions = _props2.hideDisabledOptions;
    var allowEmpty = _props2.allowEmpty;
    var showHour = _props2.showHour;
    var showSecond = _props2.showSecond;

    return _react2['default'].createElement(_modulePanel2['default'], {
      prefixCls: prefixCls + '-panel',
      ref: this.savePanelRef,
      value: this.state.value,
      onChange: this.onPanelChange,
      gregorianCalendarLocale: locale.calendar,
      onClear: this.onPanelClear,
      defaultValue: defaultValue,
      showHour: showHour,
      onEsc: this.onEsc,
      showSecond: showSecond,
      locale: locale,
      allowEmpty: allowEmpty,
      formatter: this.getFormatter(),
      placeholder: placeholder,
      disabledHours: disabledHours,
      disabledMinutes: disabledMinutes,
      disabledSeconds: disabledSeconds,
      hideDisabledOptions: hideDisabledOptions
    });
  },

  setOpen: function setOpen(open, callback) {
    var _props3 = this.props;
    var onOpen = _props3.onOpen;
    var onClose = _props3.onClose;

    if (this.state.open !== open) {
      this.setState({
        open: open
      }, callback);
      var _event = {
        open: open
      };
      if (open) {
        onOpen(_event);
      } else {
        onClose(_event);
      }
    }
  },

  render: function render() {
    var _props4 = this.props;
    var prefixCls = _props4.prefixCls;
    var placeholder = _props4.placeholder;
    var placement = _props4.placement;
    var align = _props4.align;
    var disabled = _props4.disabled;
    var transitionName = _props4.transitionName;
    var style = _props4.style;
    var className = _props4.className;
    var showHour = _props4.showHour;
    var showSecond = _props4.showSecond;
    var getPopupContainer = _props4.getPopupContainer;
    var _state = this.state;
    var open = _state.open;
    var value = _state.value;

    var popupClassName = undefined;
    if (!showHour || !showSecond) {
      popupClassName = prefixCls + '-panel-narrow';
    }
    return _react2['default'].createElement(
      _rcTrigger2['default'],
      {
        prefixCls: prefixCls + '-panel',
        popupClassName: popupClassName,
        popup: this.getPanelElement(),
        popupAlign: align,
        builtinPlacements: _utilPlacements2['default'],
        popupPlacement: placement,
        action: disabled ? [] : ['click'],
        destroyPopupOnHide: true,
        getPopupContainer: getPopupContainer,
        popupTransitionName: transitionName,
        popupVisible: open,
        onPopupVisibleChange: this.onVisibleChange
      },
      _react2['default'].createElement(
        'span',
        { className: prefixCls + ' ' + className, style: style },
        _react2['default'].createElement('input', { className: prefixCls + '-input',
          ref: 'picker', type: 'text', placeholder: placeholder,
          readOnly: true,
          onKeyDown: this.onKeyDown,
          disabled: disabled, value: value && this.getFormatter().format(value) }),
        _react2['default'].createElement('span', { className: prefixCls + '-icon' })
      )
    );
  }
});

exports['default'] = Picker;
module.exports = exports['default'];