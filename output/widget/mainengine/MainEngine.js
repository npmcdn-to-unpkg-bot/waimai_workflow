define('ops:widget/mainengine/MainEngine.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('ops:components/react/react.js');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRouter = require('ops:components/react-router/lib/index.js');
  
  var _antd = require('ops:components/antd/lib/index.js');
  
  '';
  
  var style = {
      secondMenu: {
          marginLeft: '50px',
          marginTop: '20px'
      },
      search: {
          float: 'left',
          marginLeft: '10px'
      },
      secondMenu: {
          position: 'absolute',
          width: '100%',
          top: '0px',
          left: '0',
          borderBottom: '1px solid #ccc',
          paddingTop: '20px',
          paddingBottom: '20px',
          paddingLeft: '50px',
          backgroundColor: '#ffffff',
          zIndex: 1
      }
  };
  
  var MainEngine = _react2['default'].createClass({
      displayName: 'MainEngine',
  
      mainEngine: function mainEngine(e) {
          this.setState({
              message: '当前操作为主机录入'
          });
      },
      render: function render() {
          return _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement(
                  'div',
                  { className: 'secondMenu', id: 'secondMenu', style: style.secondMenu },
                  _react2['default'].createElement(
                      'div',
                      { className: 'search', style: style.search },
                      _react2['default'].createElement(
                          _antd.Button,
                          { type: 'primary' },
                          _react2['default'].createElement(
                              _reactRouter.Link,
                              { style: { color: '#ffffff' },
                                  to: '/mainengine/search' },
                              '查询'
                          )
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'search', style: style.search },
                      _react2['default'].createElement(
                          _antd.Button,
                          { type: 'primary', onClick: this.mainEngine },
                          _react2['default'].createElement(
                              _reactRouter.Link,
                              { style: { color: '#ffffff' },
                                  to: { pathname: '/mainengine/batchmanage', query: { the: '当前操作为主机录入', oprate: '0' } } },
                              '主机录入'
                          )
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'search', style: style.search },
                      _react2['default'].createElement(
                          _antd.Button,
                          { type: 'primary' },
                          _react2['default'].createElement(
                              _reactRouter.Link,
                              { style: { color: '#ffffff' },
                                  to: { pathname: '/mainengine/batchmanage', query: { the: '当前操作为修改主机', oprate: '1' } } },
                              '修改主机名'
                          )
                      )
                  )
              ),
              _react2['default'].createElement('br', null),
              _react2['default'].createElement(
                  'div',
                  null,
                  this.props.children
              )
          );
      }
  });
  
  exports['default'] = MainEngine;
  module.exports = exports['default'];

});
