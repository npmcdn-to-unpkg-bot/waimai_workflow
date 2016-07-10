define('ops:widget/workflow/ownProce.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
  	value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('ops:components/react/react.js');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = require('ops:components/react-dom/react-dom.js');
  
  var _reactRouter = require('ops:components/react-router/lib/index.js');
  
  var _reqwest = require('reqwest');
  
  var _reqwest2 = _interopRequireDefault(_reqwest);
  
  var _antd = require('ops:components/antd/lib/index.js');
  
  var TabPane = _antd.Tabs.TabPane;
  
  var OwnProce = _react2['default'].createClass({
  	displayName: 'OwnProce',
  
  	render: function render() {
  		return _react2['default'].createElement(
  			'div',
  			null,
  			'我流程'
  		);
  	}
  });
  
  exports['default'] = OwnProce;
  module.exports = exports['default'];

});
