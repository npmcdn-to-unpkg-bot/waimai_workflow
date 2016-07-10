define('ops:widget/online/modal.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
  	value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('ops:components/react/react.js');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require('ops:components/antd/lib/index.js');
  
  var DetailModal = _react2['default'].createClass({
  	displayName: 'DetailModal',
  
  	componentWillReceiveProps: function componentWillReceiveProps() {
  
  		this.render();
  	},
  
  	render: function render() {
  		var isShow = this.props.isShow;
  		var columns = [{
  			title: '机器',
  			dataIndex: 'host',
  			key: 'host'
  		}, {
  			title: '状态',
  			dataIndex: 'status',
  			key: 'status',
  			render: function render(text, record) {
  				var href = '/v1/order/logInfo?taskId=' + record.task_id + '&host=' + record.host;
  				switch (text) {
  					case 'SUCCESS':
  						return _react2['default'].createElement(
  							'a',
  							{ href: href, target: '_blank' },
  							'成功'
  						);
  						break;
  					case 'RUNNING':
  						return _react2['default'].createElement(
  							'a',
  							{ href: href, target: '_blank' },
  							'执行中'
  						);
  						break;
  					case 'FAIL':
  						return _react2['default'].createElement(
  							'a',
  							{ href: href, target: '_blank' },
  							'失败'
  						);
  						break;
  					case 'UNKNOW':
  						return _react2['default'].createElement(
  							'a',
  							{ href: href, target: '_blank' },
  							'未知'
  						);
  					case 'NONEXIST':
  						return _react2['default'].createElement(
  							'a',
  							{ href: href, target: '_blank' },
  							'发布中'
  						);
  						break;
  				}
  			}
  		}];
  		return _react2['default'].createElement(
  			'div',
  			null,
  			_react2['default'].createElement(
  				_antd.Modal,
  				{ title: '详情', visible: isShow,
  					onOk: this.hideModal, onCancel: this.hideModal,
  					okText: '返回' },
  				_react2['default'].createElement(_antd.Table, { dataSource: this.props.modalInfo, columns: columns })
  			)
  		);
  	},
  
  	showModal: function showModal() {
  		this.props.changeState(true);
  	},
  
  	hideModal: function hideModal() {
  		this.props.changeState(false);
  	}
  
  });
  
  exports['default'] = DetailModal;
  module.exports = exports['default'];

});
