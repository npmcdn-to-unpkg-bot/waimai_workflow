define('ops:widget/entry/home/header.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('ops:components/react/react.js');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require('ops:components/antd/lib/index.js');
  
  var _reactRouter = require('ops:components/react-router/lib/index.js');
  
  '';
  
  var _reqwest = require('reqwest');
  
  var _reqwest2 = _interopRequireDefault(_reqwest);
  
  var SubMenu = _antd.Menu.SubMenu;
  
  var Header = _react2['default'].createClass({
      displayName: 'Header',
  
      getInitialState: function getInitialState() {
          return {
              userName: ''
          };
      },
  
      componentDidMount: function componentDidMount() {
          this.responseHeader();
      },
  
      responseHeader: function responseHeader() {
          var me = this;
          (0, _reqwest2['default'])({
              type: 'HEAD',
              url: '/index.html'
  
          }).then(function (xhr) {
              var name = xhr.getResponseHeader('UUAP-USERNAME'); //UUAP-USERNAME
              me.setState({
                  userName: name
              });
          });
      },
  
      render: function render() {
          var height = '50%';
          var right = 'right';
          var bgColor = '#51789f';
  
          return _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement(
                  'div',
                  { className: 'header' },
                  _react2['default'].createElement(
                      'div',
                      { className: 'logo' },
                      _react2['default'].createElement(
                          'a',
                          { href: '/index.html' },
                          _react2['default'].createElement('img', { src: '/widget/entry/home/img/logo.png' })
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'menu' },
                      _react2['default'].createElement(
                          _antd.Menu,
                          { mode: 'horizontal', style: { background: bgColor } },
                          _react2['default'].createElement(
                              _antd.Menu.Item,
                              { key: 'mail', style: { float: right } },
                              _react2['default'].createElement(
                                  _reactRouter.Link,
                                  { to: '/mainengine/batchmanage' },
                                  'DashBoard'
                              )
                          ),
                          _react2['default'].createElement(
                              _antd.Menu.Item,
                              { key: 'app', style: { float: right } },
                              _react2['default'].createElement(
                                  _reactRouter.Link,
                                  { to: '/online/list' },
                                  '上线系统'
                              )
                          ),
                          _react2['default'].createElement(
                              _antd.Menu.Item,
                              { key: 'workflow', style: { float: right } },
                              ' ',
                              _react2['default'].createElement(
                                  _reactRouter.Link,
                                  { to: '/workflow/proceStart' },
                                  'Workflow'
                              )
                          )
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'user-info' },
                      _react2['default'].createElement(
                          _antd.Menu,
                          { mode: 'horizontal', style: { background: bgColor, color: '#fff' } },
                          _react2['default'].createElement(
                              SubMenu,
                              { style: { float: right }, title: _react2['default'].createElement(
                                      'span',
                                      null,
                                      _react2['default'].createElement(_antd.Icon, { type: 'setting' }),
                                      this.state.userName
                                  ), key: 'k' },
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '1' },
                                  '个人信息'
                              ),
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '4' },
                                  _react2['default'].createElement(
                                      'a',
                                      { href: '/logout' },
                                      '退出'
                                  )
                              )
                          )
                      )
                  )
              ),
              _react2['default'].createElement(
                  'div',
                  { id: 'lala' },
                  this.props.children
              )
          );
      }
  });
  
  exports['default'] = Header;
  module.exports = exports['default'];

});
