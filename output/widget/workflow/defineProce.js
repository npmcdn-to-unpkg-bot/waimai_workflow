define('ops:widget/workflow/defineProce.jsx', function(require, exports, module) {

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
  
  var _staticJsUtilsUtilsJs = require('ops:static/js/utils/utils.js');
  
  var _staticJsUtilsUtilsJs2 = _interopRequireDefault(_staticJsUtilsUtilsJs);
  
  var _antd = require('ops:components/antd/lib/index.js');
  
  var Option = _antd.Select.Option;
  var style = {
  	cenlin: {
  		textAlign: 'center',
  		lineHeight: '28px'
  	}
  
  };
  var inforColumns = [{
  	title: 'ID',
  	dataIndex: 'id',
  	key: 'id'
  }, {
  	title: 'Type',
  	dataIndex: 'type',
  	key: 'type'
  }, {
  	title: 'Name',
  	dataIndex: 'name',
  	key: 'name'
  }, {
  	title: 'Group Type',
  	dataIndex: 'groupType',
  	key: 'groupType'
  }, {
  	title: 'Users',
  	dataIndex: 'users',
  	key: 'users'
  }, {
  	title: 'Operation',
  	key: 'operation',
  	render: function render(text, record) {
  		return _react2['default'].createElement(
  			'span',
  			null,
  			_react2['default'].createElement(
  				'a',
  				{ href: 'javascript:;', style: { paddingRight: '10px' } },
  				_react2['default'].createElement(_antd.Icon, { type: 'edit' })
  			),
  			_react2['default'].createElement('span', { className: 'ant-divider' }),
  			_react2['default'].createElement(
  				'a',
  				{ href: 'javascript:;', style: { paddingLeft: '10px' } },
  				_react2['default'].createElement(_antd.Icon, { type: 'delete' })
  			)
  		);
  	}
  }];
  
  var relaColumns = [{
  	title: 'ID',
  	dataIndex: 'id',
  	key: 'id'
  }, {
  	title: '当前StateID',
  	dataIndex: 'curstateid',
  	key: 'curstateid'
  }, {
  	title: '下一跳StateID',
  	dataIndex: 'nextstateid',
  	key: 'nextstateid'
  }, {
  	title: '操作',
  	dataIndex: 'action',
  	key: 'action'
  }, {
  	title: '活动',
  	dataIndex: 'activities',
  	key: 'activities'
  }, {
  	title: 'Operation',
  	key: 'operation',
  	render: function render(text, record) {
  		return _react2['default'].createElement(
  			'span',
  			null,
  			_react2['default'].createElement(
  				'a',
  				{ href: 'javascript:;', style: { paddingRight: '10px' } },
  				_react2['default'].createElement(_antd.Icon, { type: 'edit' })
  			),
  			_react2['default'].createElement('span', { className: 'ant-divider' }),
  			_react2['default'].createElement(
  				'a',
  				{ href: 'javascript:;', style: { paddingLeft: '10px' } },
  				_react2['default'].createElement(_antd.Icon, { type: 'delete' })
  			)
  		);
  	}
  }];
  
  var StateInfor = _react2['default'].createClass({
  	displayName: 'StateInfor',
  
  	getInitialState: function getInitialState() {
  		return {
  			domInfor: {
  				key: '',
  				id: '',
  				type: '',
  				name: '',
  				groupType: '',
  				users: ''
  			},
  			newInfor: {
  				id: '',
  				type: '',
  				name: '',
  				group: {
  					type: '',
  					auditors: []
  				}
  
  			}
  
  		};
  	},
  	handleChange: function handleChange(name, event) {
  		if (name == "type") {
  			this.state.newInfor.type = event;
  			this.state.domInfor.type = event;
  		} else if (name == "groupType") {
  			this.state.newInfor.group.type = event;
  			this.state.domInfor.groupType = event;
  		}
  	},
  	addUser: function addUser() {
  		if (this.refs.user.refs.input.value) {
  			var me = this;
  			this.state.newInfor.group.auditors.push(this.refs.user.refs.input.value);
  			this.state.newInfor.group.auditors.map(function (res) {
  				me.state.domInfor.users = res + ',';
  			});
  			this.state.domInfor.users = this.state.domInfor.users.substr(0, this.state.domInfor.users.length - 1);
  			this.refs.user.refs.input.value = "";
  			this.forceUpdate();
  		} else {
  			_antd.message.error('用户名不能为空');
  		}
  	},
  
  	render: function render() {
  		return _react2['default'].createElement(
  			'div',
  			{ className: 'ps5-1' },
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6', style: { textAlign: 'center', lineHeight: '28px' } },
  					'类型：'
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '18' },
  					_react2['default'].createElement(
  						_antd.Select,
  						{ placeholder: '请选择', style: { width: '80%' }, onChange: this.handleChange.bind(this, 'groupType') },
  						this.props.inforType.map(function (res, index) {
  							return _react2['default'].createElement(
  								Option,
  								{ key: index, value: res.type },
  								res.type
  							);
  						})
  					)
  				)
  			),
  			_react2['default'].createElement('div', { style: { height: '10px' } }),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6', style: { textAlign: 'center', lineHeight: '28px' } },
  					'名称：'
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '18', style: { width: '60%' } },
  					_react2['default'].createElement(_antd.Input, { ref: 'name' })
  				)
  			),
  			_react2['default'].createElement('div', { style: { height: '10px' } }),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6', style: { textAlign: 'center', lineHeight: '28px' } },
  					'审批组类型：'
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '18', style: { width: '75%' } },
  					_react2['default'].createElement(
  						_antd.Select,
  						{ placeholder: '请选择', style: { width: '80%' }, onChange: this.handleChange.bind(this, 'groupType') },
  						this.props.inforGroupType.map(function (res, index) {
  							return _react2['default'].createElement(
  								Option,
  								{ key: index, value: res.type },
  								res.type
  							);
  						})
  					)
  				)
  			),
  			_react2['default'].createElement('div', { style: { height: '10px' } }),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6', style: { textAlign: 'center', lineHeight: '28px' } },
  					'审批人：'
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '14', style: { width: '50%' } },
  					_react2['default'].createElement(_antd.Input, { ref: 'user' })
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '4' },
  					_react2['default'].createElement(
  						_antd.Button,
  						{ onClick: this.addUser, style: { marginLeft: '15px' } },
  						'增加'
  					)
  				)
  			),
  			_react2['default'].createElement('div', { style: { height: '10px' } }),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6', style: { textAlign: 'center', lineHeight: '28px' } },
  					'审批人组：'
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '18', style: { width: '60%' } },
  					this.state.newInfor.group.auditors.map(function (res, index) {
  						return _react2['default'].createElement(
  							_antd.Button,
  							{ key: index },
  							res
  						);
  					})
  				)
  			)
  		);
  	}
  
  });
  
  var StateRela = _react2['default'].createClass({
  	displayName: 'StateRela',
  
  	render: function render() {
  		return _react2['default'].createElement(
  			'div',
  			{ className: 'ps5-1' },
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6', style: { textAlign: 'center', lineHeight: '28px' } },
  					'类型：'
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '18' },
  					_react2['default'].createElement(_antd.Select, { placeholder: '请选择', style: { width: '80%' } })
  				)
  			),
  			_react2['default'].createElement('div', { style: { height: '10px' } }),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6', style: { textAlign: 'center', lineHeight: '28px' } },
  					'名称：'
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '18', style: { width: '60%' } },
  					_react2['default'].createElement(_antd.Input, null)
  				)
  			),
  			_react2['default'].createElement('div', { style: { height: '10px' } }),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6', style: { textAlign: 'center', lineHeight: '28px' } },
  					'用户组类型：'
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '18', style: { width: '75%' } },
  					_react2['default'].createElement(
  						_antd.Select,
  						{ placeholder: '请选择', style: { width: '80%' } },
  						_react2['default'].createElement(
  							Option,
  							{ value: 'china' },
  							'中国'
  						),
  						_react2['default'].createElement(
  							Option,
  							{ value: 'use' },
  							'美国'
  						),
  						_react2['default'].createElement(
  							Option,
  							{ value: 'japan' },
  							'日本'
  						),
  						_react2['default'].createElement(
  							Option,
  							{ value: 'korean' },
  							'韩国'
  						),
  						_react2['default'].createElement(
  							Option,
  							{ value: 'Thailand' },
  							'泰国'
  						)
  					)
  				)
  			),
  			_react2['default'].createElement('div', { style: { height: '10px' } }),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6', style: { textAlign: 'center', lineHeight: '28px' } },
  					'用户：'
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '14', style: { width: '50%' } },
  					_react2['default'].createElement(_antd.Input, null)
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '4' },
  					_react2['default'].createElement(
  						_antd.Button,
  						{ style: { marginLeft: '15px' } },
  						'提交'
  					)
  				)
  			),
  			_react2['default'].createElement('div', { style: { height: '10px' } }),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6' },
  					' '
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '18', style: { width: '60%' } },
  					_react2['default'].createElement(_antd.Input, { type: 'textarea' })
  				)
  			)
  		);
  	}
  });
  
  var DefineProce = _react2['default'].createClass({
  	displayName: 'DefineProce',
  
  	getInitialState: function getInitialState() {
  		return {
  			inforKey: Date.now(),
  			relaKey: Date.now(),
  			visibleInfor: false,
  			inforType: [],
  			inforGroupType: [],
  			visibleRela: false,
  			states: [],
  			transactions: [],
  			inforData: [{
  				key: '1',
  				id: '1',
  				type: 'start',
  				name: '开始',
  				groupType: 'or',
  				users: 'tom'
  			}],
  			relaData: [{
  				key: '1',
  				id: '1',
  				curstateid: '1',
  				nextstateid: '1',
  				action: 'approve',
  				activities: 'email'
  
  			}]
  		};
  	},
  	showInfor: function showInfor() {
  		var me = this;
  		// Promise.all([
  		// 	reqwest({
  		// 		type:'JSON',
  		// 		url:'/v1/statetype/',
  		// 		method:'get',
  		// 		headers:{
  		// 			'HESTIA-USERNAME': 'dong'
  		// 		}
  		// 	}).then(function(res){
  		// 		if(res.status==200){
  		// 			var result = JSON.parse(res.response);
  		// 			if(result.errno==0){
  		// 				return result;
  		// 			}
  		// 		}
  		// 	}),
  		// 	reqwest({
  		// 		type:'JSON',
  		// 		url:'/v1/grouptype/',
  		// 		method:'get',
  		// 		headers:{
  		// 			'HESTIA-USERNAME': 'dong'
  		// 		}
  		// 	}).then(function(res){
  		// 		if(res.status==200){
  		// 			var result = JSON.parse(res.response);
  		// 			if(result.errno==0){
  		// 				return result;
  		// 			}
  		// 		}
  		// 	})
  
  		// ]).then(function(result){
  		// 	me.setState({
  		// 	  inforType: result[0].data,
  		// 	  inforGroupType: result[1].data,
  		//       visibleInfor: true,
  		//       inforKey: Date.now()
  		//     });
  		// });
  		this.setState({
  			inforType: [{ type: '1' }, { type: '2' }],
  			inforGroupType: [{ type: '1' }, { type: '2' }],
  			inforKey: Date.now(),
  			visibleInfor: true
  		});
  	},
  	handleInforCancel: function handleInforCancel() {
  		this.setState({
  			visibleInfor: false
  		});
  	},
  	showRela: function showRela() {
  		this.setState({
  			visibleRela: true,
  			relationKey: Date.now()
  		});
  	},
  	handleRelaCancel: function handleRelaCancel() {
  		this.setState({
  			visibleRela: false
  		});
  	},
  
  	render: function render() {
  
  		return _react2['default'].createElement(
  			'div',
  			{ className: 'define-proce' },
  			_react2['default'].createElement('div', { style: { height: '10px' } }),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '3', style: style.cenlin },
  					'*流程名称：'
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '8' },
  					_react2['default'].createElement(_antd.Input, { placeholder: '建议命名规则：产品(系统)名称 + 流程关键字 + 操作描述' })
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '13', style: { lineHeight: '40px' } },
  					'(限20字，且名字不能重复)'
  				)
  			),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '3', style: style.cenlin },
  					_react2['default'].createElement(
  						'span',
  						null,
  						'*'
  					),
  					'申请内容：'
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '8' },
  					_react2['default'].createElement(_antd.Input, { type: 'textarea', style: { heght: '600px' } })
  				)
  			),
  			_react2['default'].createElement('div', { style: { height: '10px' } }),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '3', style: style.cenlin },
  					'URL：'
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '8' },
  					_react2['default'].createElement(_antd.Input, null)
  				)
  			),
  			_react2['default'].createElement('div', { style: { height: '10px' } }),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '2', style: { textAlign: 'left', lineHeight: '28px' } },
  					'State节点：'
  				)
  			),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '24' },
  					_react2['default'].createElement(_antd.Table, { columns: inforColumns, dataSource: this.state.inforData, pagination: false })
  				)
  			),
  			_react2['default'].createElement('div', { style: { height: '10px' } }),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '2', offset: '1' },
  					_react2['default'].createElement(
  						_antd.Button,
  						{ onClick: this.showInfor },
  						'新增一行'
  					)
  				),
  				_react2['default'].createElement(
  					_antd.Modal,
  					{ title: 'State信息',
  						visible: this.state.visibleInfor,
  						key: this.state.inforKey,
  						onCancel: this.handleInforCancel,
  						footer: [_react2['default'].createElement(
  							_antd.Button,
  							{ key: 'add' },
  							'保存并新增一行'
  						), _react2['default'].createElement(
  							_antd.Button,
  							{ key: 'save' },
  							'保存并完成'
  						), _react2['default'].createElement(
  							_antd.Button,
  							{ key: 'back', type: 'ghost', onClick: this.handleInforCancel },
  							'取消'
  						)]
  					},
  					_react2['default'].createElement(StateInfor, { inforType: this.state.inforType, inforGroupType: this.state.inforGroupType })
  				)
  			),
  			_react2['default'].createElement('div', { style: { height: '40px' } }),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '2', style: { textAlign: 'left', lineHeight: '28px' } },
  					'State流转关系：'
  				)
  			),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '24' },
  					_react2['default'].createElement(_antd.Table, { columns: relaColumns, dataSource: this.state.relaData, pagination: false })
  				)
  			),
  			_react2['default'].createElement('div', { style: { height: '10px' } }),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '2', offset: '1' },
  					_react2['default'].createElement(
  						_antd.Button,
  						{ onClick: this.showRela },
  						'新增一行'
  					)
  				),
  				_react2['default'].createElement(
  					_antd.Modal,
  					{ title: 'State流转关系',
  						visible: this.state.visibleRela,
  						key: this.state.relaKey,
  						onCancel: this.handleRelaCancel,
  						footer: [_react2['default'].createElement(
  							_antd.Button,
  							{ key: 'add' },
  							'保存并新增一行'
  						), _react2['default'].createElement(
  							_antd.Button,
  							{ key: 'save' },
  							'保存并完成'
  						), _react2['default'].createElement(
  							_antd.Button,
  							{ key: 'back', type: 'ghost', onClick: this.handleRelaCancel },
  							'取消'
  						)]
  					},
  					_react2['default'].createElement(StateRela, null)
  				)
  			)
  		);
  	}
  
  });
  
  exports['default'] = DefineProce;
  module.exports = exports['default'];

});
