define('ops:widget/online/online.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
  	value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('ops:components/react/react.js');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = require('ops:components/classnames/index.js');
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _listJsx = require('ops:widget/online/list.jsx');
  
  var _listJsx2 = _interopRequireDefault(_listJsx);
  
  var _detailJsx = require('ops:widget/online/detail.jsx');
  
  var _detailJsx2 = _interopRequireDefault(_detailJsx);
  
  var _createJsx = require('ops:widget/online/create.jsx');
  
  var _createJsx2 = _interopRequireDefault(_createJsx);
  
  var _reactRouter = require('ops:components/react-router/lib/index.js');
  
  var _reqwest = require('reqwest');
  
  var _reqwest2 = _interopRequireDefault(_reqwest);
  
  var _antd = require('ops:components/antd/lib/index.js');
  
  '';
  
  var TabPane = _antd.Tabs.TabPane;
  
  var OnLine = _react2['default'].createClass({
  	displayName: 'OnLine',
  
  	componentDidMount: function componentDidMount() {
  		this.changeActivityTab();
  		this.responseHeader();
  	},
  
  	getInitialState: function getInitialState() {
  		return {
  			activeKey: '0',
  			isShowDetail: false,
  			userName: ''
  		};
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
  
  	changeActivityTab: function changeActivityTab() {
  		var hash = location.hash;
  		if (hash.indexOf('create') >= 0) {
  			this.setState({
  				activeKey: '1'
  			});
  		} else if (hash.indexOf('list') >= 0) {
  			this.setState({
  				activeKey: '0'
  			});
  		} else if (hash.indexOf('back') >= 0) {
  			this.setState({
  				activeKey: '2'
  			});
  		} else if (hash.indexOf('detail') >= 0) {
  			this.setState({
  				activeKey: '3'
  			});
  		}
  	},
  	render: function render() {
  		var me = this;
  		return _react2['default'].createElement(
  			'div',
  			{ className: 'container' },
  			this.state.isShowDetail ? _react2['default'].createElement(
  				_antd.Tabs,
  				{ type: 'card', onTabClick: this.tabClick, defaultActiveKey: '1', activeKey: this.state.activeKey },
  				_react2['default'].createElement(
  					TabPane,
  					{ tab: '列表查询', key: '0' },
  					_react2['default'].createElement(_listJsx2['default'], { userName: this.state.userName, changeActivityTab: this.changeActivityTab, activeKey: this.state.activeKey, showDetail: this.showDetail })
  				),
  				_react2['default'].createElement(
  					TabPane,
  					{ tab: '创建上线单', key: '1' },
  					_react2['default'].createElement(_createJsx2['default'], { userName: this.state.userName, changeActivityTab: this.changeActivityTab, activeKey: this.state.activeKey, showDetail: this.showDetail })
  				),
  				_react2['default'].createElement(
  					TabPane,
  					{ tab: '创建回滚单', key: '2' },
  					_react2['default'].createElement(_createJsx2['default'], { userName: this.state.userName, changeActivityTab: this.changeActivityTab, activeKey: this.state.activeKey, showDetail: this.showDetail })
  				),
  				_react2['default'].createElement(
  					TabPane,
  					{ tab: '上线/回滚单详情', key: '3', activeKey: this.state.activeKey },
  					_react2['default'].createElement(_detailJsx2['default'], { userName: this.state.userName, changeActivityTab: this.changeActivityTab, showDetail: this.showDetail })
  				)
  			) : _react2['default'].createElement(
  				_antd.Tabs,
  				{ type: 'card', onTabClick: this.tabClick, defaultActiveKey: '1', activeKey: this.state.activeKey },
  				_react2['default'].createElement(
  					TabPane,
  					{ tab: '列表查询', key: '0' },
  					_react2['default'].createElement(_listJsx2['default'], { userName: this.state.userName, changeActivityTab: this.changeActivityTab, activeKey: this.state.activeKey, showDetail: this.showDetail })
  				),
  				_react2['default'].createElement(
  					TabPane,
  					{ tab: '创建上线单', key: '1' },
  					_react2['default'].createElement(_createJsx2['default'], { userName: this.state.userName, changeActivityTab: this.changeActivityTab, activeKey: this.state.activeKey, showDetail: this.showDetail })
  				),
  				_react2['default'].createElement(
  					TabPane,
  					{ tab: '创建回滚单', key: '2' },
  					_react2['default'].createElement(_createJsx2['default'], { userName: this.state.userName, changeActivityTab: this.changeActivityTab, activeKey: this.state.activeKey, showDetail: this.showDetail })
  				)
  			)
  		);
  	},
  
  	showDetail: function showDetail(val) {
  		this.setState({
  			isShowDetail: val
  		});
  	},
  
  	tabClick: function tabClick(key) {
  
  		if (key == '0') {
  			location.hash = "online/list";
  		} else if (key == '1') {
  			location.hash = "online/create";
  		} else if (key == '2') {
  			location.hash = "online/back";
  		} else if (key == '3') {
  			location.hash = "online/detail";
  		} else {
  			location.hash = 'online/detail';
  		}
  
  		this.changeActivityTab();
  	}
  });
  
  exports['default'] = OnLine;
  module.exports = exports['default'];

});
