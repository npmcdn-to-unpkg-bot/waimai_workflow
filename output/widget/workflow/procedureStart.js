define('ops:widget/workflow/procedureStart.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
  	value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('ops:components/react/react.js');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = require('ops:components/classnames/index.js');
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _reactDom = require('ops:components/react-dom/react-dom.js');
  
  var _reactRouter = require('ops:components/react-router/lib/index.js');
  
  var _reqwest = require('reqwest');
  
  var _reqwest2 = _interopRequireDefault(_reqwest);
  
  var _antd = require('ops:components/antd/lib/index.js');
  
  var DefineProce = _react2['default'].createClass({
  	displayName: 'DefineProce',
  
  	render: function render() {
  		return _react2['default'].createElement(
  			'div',
  			null,
  			'流程发起'
  		);
  	}
  });
  
  exports['default'] = DefineProce;
  module.exports = exports['default'];

});
