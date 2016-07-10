define('ops:widget/workflow/workflow.jsx', function(require, exports, module) {

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
  
  '';
  
  var _procedureStartJsx = require('ops:widget/workflow/procedureStart.jsx');
  
  var _procedureStartJsx2 = _interopRequireDefault(_procedureStartJsx);
  
  var _ownProceJsx = require('ops:widget/workflow/ownProce.jsx');
  
  var _ownProceJsx2 = _interopRequireDefault(_ownProceJsx);
  
  var _defineProce = require('ops:widget/workflow/defineProce.jsx');
  
  var _defineProce2 = _interopRequireDefault(_defineProce);
  
  var _pendingProce = require('ops:widget/workflow/pendingProce.jsx');
  
  var _pendingProce2 = _interopRequireDefault(_pendingProce);
  
  var TabPane = _antd.Tabs.TabPane;
  
  var WorkFlow = _react2['default'].createClass({
  	displayName: 'WorkFlow',
  
  	componentDidMount: function componentDidMount() {
  		this.changeActivityTab();
  	},
  
  	getInitialState: function getInitialState() {
  		return {
  			activeKey: '1'
  		};
  	},
  
  	changeActivityTab: function changeActivityTab() {
  		var hash = location.hash;
  		if (hash.indexOf('proceStart') >= 0) {
  			this.setState({
  				activeKey: '0'
  			});
  		} else if (hash.indexOf('ownProce') >= 0) {
  			this.setState({
  				activeKey: '1'
  			});
  		} else if (hash.indexOf('pendingProce') >= 0) {
  			this.setState({
  				activeKey: '2'
  			});
  		} else if (hash.indexOf('defineProce') >= 0) {
  			this.setState({
  				activeKey: '3'
  			});
  		}
  	},
  
  	render: function render() {
  		return _react2['default'].createElement(
  			'div',
  			{ className: 'container' },
  			_react2['default'].createElement(
  				_antd.Tabs,
  				{ type: 'card', onTabClick: this.tabClick, defaultActiveKey: '0', activeKey: this.state.activeKey },
  				_react2['default'].createElement(
  					TabPane,
  					{ tab: '流程发起', key: '0' },
  					_react2['default'].createElement(_procedureStartJsx2['default'], null)
  				),
  				_react2['default'].createElement(
  					TabPane,
  					{ tab: '我的流程', key: '1' },
  					_react2['default'].createElement(_ownProceJsx2['default'], null)
  				),
  				_react2['default'].createElement(
  					TabPane,
  					{ tab: '待处理流程', key: '2' },
  					_react2['default'].createElement(_pendingProce2['default'], null)
  				),
  				_react2['default'].createElement(
  					TabPane,
  					{ tab: '自定义流程管理', key: '3' },
  					_react2['default'].createElement(_defineProce2['default'], null)
  				)
  			)
  		);
  	},
  
  	tabClick: function tabClick(key) {
  		// console.log(key);
  
  		if (key == '0') {
  			location.hash = "workflow/proceStart";
  		} else if (key == '1') {
  			location.hash = "workflow/ownProce";
  		} else if (key == '2') {
  			location.hash = "workflow/pendingProce";
  		} else if (key == '3') {
  			location.hash = "workflow/defineProce";
  		} else {
  			location.hash = 'workflow/ownProce';
  		}
  
  		this.changeActivityTab();
  	}
  });
  
  exports['default'] = WorkFlow;
  module.exports = exports['default'];

});
