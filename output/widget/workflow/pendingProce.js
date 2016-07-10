define('ops:widget/workflow/pendingProce.jsx', function(require, exports, module) {

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
  
  var ProceStart = _react2['default'].createClass({
  	displayName: 'ProceStart',
  
  	getInitialState: function getInitialState() {
  		return {
  			ModalInfor: 'State信息',
  			ModalRelation: 'State流转关系',
  			inforLoading: false,
  			relaLoading: false,
  			visibleInfor: false,
  			visibleRelation: false,
  			n: 0,
  			infors: [],
  			newInfor: {
  				id: "",
  				type: "",
  				name: "",
  				group: {
  					type: "",
  					auditors: ""
  				}
  			},
  			domInfor: {},
  			inforTypes: [{
  				id: 1,
  				name: '哈哈'
  			}, {
  				id: 2,
  				name: '黑哦'
  			}, {
  				id: 3,
  				name: '吼吼'
  			}],
  			relaTypes: [{
  				id: 1,
  				name: '哈哈'
  			}, {
  				id: 2,
  				name: '黑哦'
  			}, {
  				id: 3,
  				name: '吼吼'
  			}],
  			stateInfor: [{
  				key: '1',
  				id: '1',
  				type: 32,
  				name: '开始',
  				groupType: 'OR',
  				user: 'Tom'
  			}],
  			stateRelation: [{
  				key: '1',
  				id: '1',
  				now_id: '1',
  				next_id: '2',
  				operate: 'Approve',
  				activity: 'Email'
  			}]
  
  		};
  	},
  	showInfor: function showInfor() {
  		this.setState({
  			visibleInfor: true,
  			inforKey: Date.now()
  		});
  
  		//    reqwest({
  		// 	type:'JSON',
  		// 	url:'/hestia/order/commit',
  		// 	method:'post',
  		// 	headers:{
  		// 		'HESTIA-USERNAME':me.props.userName
  		// 	},
  		// 	data :JSON.stringify({"data":data})
  		// }).then(function(res){
  		// 	if(res.status==200){
  		// 		var result = JSON.parse(res.response);
  		// 		if(result.errno==0){
  		// 			message.success('回滚单创建完成');
  		// 			//me.request();
  		// 			me.props.showDetail(true)
  		// 			location.hash='online/detail?orderId='+result.data.Id;
  		// 			me.props.changeActivityTab();
  		// 		}else{
  		// 			message.error('回滚单创建失败  '+getErrorMsg(result.errno));
  		// 		}
  		// 	}
  		// });
  	},
  	showRelation: function showRelation() {
  		this.setState({
  			visibleRelation: true,
  			relationKey: Date.now()
  		});
  	},
  	handleInforOk: function handleInforOk() {
  		this.setState({
  			visibleInfor: false
  		});
  	},
  	handleRelaOk: function handleRelaOk() {
  		this.setState({
  			visibleRelation: false
  		});
  	},
  	handleInforCancel: function handleInforCancel() {
  		console.log('点击了取消');
  		this.setState({
  			visibleInfor: false
  		});
  	},
  	handleRelaCancel: function handleRelaCancel() {
  		this.setState({
  			visibleRelation: false
  		});
  	},
  	inforAdding: function inforAdding() {
  		this.setState({
  			inforLoading: true
  		});
  	},
  	relaAdding: function relaAdding() {
  		this.setState({
  			relaLoading: true
  		});
  	},
  	handleChange: function handleChange(name, event) {
  		if (name == "type") {
  			this.state.newInfor.type = event;
  			this.state.domInfor.type = event;
  		} else if (name == "name") {
  			this.state.newInfor.name = event.target.value;
  			this.state.domInfor.name = event.target.value;
  		} else if (name == "groupType") {
  			this.state.newInfor.group.type = event;
  			this.state.domInfor.type = event;
  		} else if (name == "user") {
  			this.state.newInfor.group.auditors = event.target.value;
  			this.state.domInfor.user = event.target.value;
  		}
  		event.target.value = "";
  		console.log(this.state.domInfor);
  	},
  	saveInfor: function saveInfor() {
  		this.state.infors.push(this.state.newInfor);
  		this.state.stateInfor.push(this.state.domInfor);
  		var arr = this.state.stateInfor;
  		console.log(this.state.infors);
  		this.setState({
  			domInfor: arr
  		});
  	},
  
  	render: function render() {
  
  		var state1 = [{
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
  			dataIndex: 'user',
  			key: 'user'
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
  
  		var state2 = [{
  			title: 'ID',
  			dataIndex: 'id',
  			key: 'id'
  		}, {
  			title: '当前StateID',
  			dataIndex: 'now_id',
  			key: 'noe_id'
  		}, {
  			title: '下一跳StateID',
  			dataIndex: 'next_id',
  			key: 'nexy_id'
  		}, {
  			title: '操作',
  			dataIndex: 'operate',
  			key: 'operate'
  		}, {
  			title: '活动',
  			dataIndex: 'activity',
  			key: 'activity'
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
  
  		return _react2['default'].createElement(
  			'div',
  			{ className: 'proce-start' },
  			_react2['default'].createElement(
  				'div',
  				{ className: 'ps-1' },
  				_react2['default'].createElement(
  					'span',
  					null,
  					'新 建 自 定 义 流 程 模 板'
  				)
  			),
  			_react2['default'].createElement('br', null),
  			_react2['default'].createElement(
  				'div',
  				{ className: 'ps-2' },
  				_react2['default'].createElement(
  					'span',
  					{ style: { color: '#f00', fontSize: '20px' } },
  					'*'
  				),
  				'流程名称：',
  				_react2['default'].createElement('input', { type: 'text', placeholder: '建议命名规则：产品(系统)名称 + 流程关键字 + 操作描述' }),
  				'(限20字，且名称不能重复)'
  			),
  			_react2['default'].createElement('br', null),
  			_react2['default'].createElement(
  				'div',
  				{ className: 'ps-3' },
  				_react2['default'].createElement(
  					'dl',
  					null,
  					_react2['default'].createElement(
  						'dt',
  						null,
  						_react2['default'].createElement(
  							'span',
  							{ style: { color: '#f00', fontSize: '20px' } },
  							'*'
  						),
  						'申请内容：'
  					),
  					_react2['default'].createElement(
  						'dd',
  						{ id: 'ps3-t' },
  						_react2['default'].createElement('textarea', null)
  					)
  				)
  			),
  			_react2['default'].createElement('br', null),
  			_react2['default'].createElement(
  				'div',
  				{ className: 'ps-4' },
  				'URL：',
  				_react2['default'].createElement('input', { type: 'text' })
  			),
  			_react2['default'].createElement('br', null),
  			_react2['default'].createElement('br', null),
  			_react2['default'].createElement(
  				'div',
  				{ className: 'ps-5' },
  				_react2['default'].createElement(
  					'span',
  					null,
  					'State节点：'
  				),
  				_react2['default'].createElement(_antd.Table, { columns: state1, dataSource: this.state.stateInfor, pagination: false }),
  				_react2['default'].createElement(
  					_antd.Button,
  					{ type: 'primary', onClick: this.showInfor },
  					'新增一行'
  				),
  				_react2['default'].createElement(
  					_antd.Modal,
  					{ title: 'State信息',
  						visible: this.state.visibleInfor,
  						key: this.state.inforKey,
  						onCancel: this.handleInforCancel,
  						footer: [_react2['default'].createElement(
  							_antd.Button,
  							{ key: 'add', loading: this.state.inforLoading, htmlType: 'submit', onClick: this.saveInfor },
  							'保存并新增一行'
  						), _react2['default'].createElement(
  							_antd.Button,
  							{ key: 'save', onClick: this.handleInforOk },
  							'保存并完成'
  						), _react2['default'].createElement(
  							_antd.Button,
  							{ key: 'back', type: 'ghost', onClick: this.handleInforCancel },
  							'取消'
  						)]
  					},
  					_react2['default'].createElement(
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
  									{ placeholder: '请选择', style: { width: '80%' }, onChange: this.handleChange.bind(this, 'type') },
  									this.state.inforTypes.map(function (result) {
  										return _react2['default'].createElement(
  											Option,
  											{ key: result.id, value: result.name },
  											result.name
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
  								_react2['default'].createElement(_antd.Input, { onChange: this.handleChange.bind(this, 'name') })
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
  								'审批人：'
  							),
  							_react2['default'].createElement(
  								_antd.Col,
  								{ span: '14', style: { width: '50%' } },
  								_react2['default'].createElement(_antd.Input, { onChange: this.handleChange.bind(this, 'user') })
  							),
  							_react2['default'].createElement(
  								_antd.Col,
  								{ span: '4' },
  								_react2['default'].createElement(
  									_antd.Button,
  									{ style: { marginLeft: '15px' } },
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
  								_react2['default'].createElement(_antd.Input, { type: 'textarea' })
  							)
  						)
  					)
  				)
  			),
  			_react2['default'].createElement('br', null),
  			_react2['default'].createElement('br', null),
  			_react2['default'].createElement(
  				'div',
  				{ className: 'ps-6' },
  				_react2['default'].createElement(
  					'span',
  					null,
  					'State关系：'
  				),
  				_react2['default'].createElement(_antd.Table, { columns: state2, dataSource: this.state.stateRelation, pagination: false }),
  				_react2['default'].createElement(
  					_antd.Button,
  					{ type: 'primary', onClick: this.showRelation },
  					'新增一行'
  				),
  				_react2['default'].createElement(
  					_antd.Modal,
  					{ title: 'State关系',
  						visible: this.state.visibleRelation,
  						key: this.state.relationKey,
  						onCancel: this.handleRelaCancel,
  						footer: [_react2['default'].createElement(
  							_antd.Button,
  							{ key: 'add', loading: this.state.relaLoading, onClick: this.relaAdding },
  							'保存并新增一行'
  						), _react2['default'].createElement(
  							_antd.Button,
  							{ key: 'save', onClick: this.handleRelaOk },
  							'保存并完成'
  						), _react2['default'].createElement(
  							_antd.Button,
  							{ key: 'back', type: 'ghost', onClick: this.handleRelaCancel },
  							'取消'
  						)]
  					},
  					_react2['default'].createElement(
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
  									{ placeholder: '请选择', style: { width: '80%' } },
  									this.state.relaTypes.map(function (result) {
  										return _react2['default'].createElement(
  											Option,
  											{ key: result.id },
  											result.name
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
  					)
  				)
  			),
  			_react2['default'].createElement('br', null),
  			_react2['default'].createElement('br', null),
  			_react2['default'].createElement('br', null),
  			_react2['default'].createElement(
  				'div',
  				{ className: 'ps-7' },
  				_react2['default'].createElement(
  					_antd.Button,
  					null,
  					'提交'
  				),
  				_react2['default'].createElement(
  					_antd.Button,
  					null,
  					'取消'
  				)
  			)
  		);
  	}
  });
  
  exports['default'] = ProceStart;
  module.exports = exports['default'];

});
