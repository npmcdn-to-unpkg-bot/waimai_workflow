define('ops:widget/online/create.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
  	value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('ops:components/react/react.js');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require('ops:components/antd/lib/index.js');
  
  var _reqwest = require('reqwest');
  
  var _reqwest2 = _interopRequireDefault(_reqwest);
  
  var _errnoJs = require('ops:widget/online/errno.js');
  
  var _errnoJs2 = _interopRequireDefault(_errnoJs);
  
  var FormItem = _antd.Form.Item;
  var Step = _antd.Steps.Step;
  var CreateForm = _react2['default'].createClass({
  	displayName: 'CreateForm',
  
  	componentWillReceiveProps: function componentWillReceiveProps() {
  		this.render();
  		this.refs.moduleName.refs.input.value = "";
  		this.refs.moduleVersion.refs.input.value = "";
  	},
  
  	getInitialState: function getInitialState() {
  		return {
  			isReRender: this.props.isReRender
  		};
  	},
  	render: function render() {
  		var formItemLayout = {
  			labelCol: { span: 6 },
  			wrapperCol: { span: 16 }
  		};
  
  		return _react2['default'].createElement(
  			'div',
  			{ className: this.props.isShow ? "show" : "hidden" },
  			_react2['default'].createElement(
  				_antd.Form,
  				{ horizontal: true },
  				_react2['default'].createElement(
  					FormItem,
  					_extends({ label: '模块名称' }, formItemLayout, { required: true }),
  					_react2['default'].createElement(_antd.Input, { ref: 'moduleName' })
  				),
  				_react2['default'].createElement(
  					FormItem,
  					_extends({ label: '模块版本' }, formItemLayout, { required: true }),
  					_react2['default'].createElement(_antd.Input, { ref: 'moduleVersion' })
  				),
  				_react2['default'].createElement(
  					FormItem,
  					{ wrapperCol: { span: 10, offset: 6 }, style: { marginTop: 24 } },
  					_react2['default'].createElement(
  						_antd.Button,
  						{ type: 'primary', onClick: this.addModule, htmlType: 'submit' },
  						'添加'
  					)
  				)
  			)
  		);
  	},
  	addModule: function addModule() {
  		var me = this;
  		var modulename = me.refs.moduleName.refs.input.value.trim();
  		var moduleversion = me.refs.moduleVersion.refs.input.value.trim();
  
  		if (modulename == '' || moduleversion == '') {
  			_antd.message.error('模块名称和版本不能为空', 4);
  			return;
  		}
  		(0, _reqwest2['default'])({
  			type: 'JSON',
  			url: '/v1/order/moduleInfo',
  			headers: {
  				'UUAP-USERNAME': me.props.userName
  			},
  			data: { modulename: modulename }
  		}).then(function (res) {
  			if (res.status == 200) {
  				var result = JSON.parse(res.response);
  				if (result.errno == 0) {
  					me.props.onGetModuleInfo(result.data);
  					me.props.onGetVersion(moduleversion);
  					me.props.onNextStep(1);
  					me.props.onChangeShow(false, true, true);
  				} else {
  					_antd.message.error('该模块不存在  ' + (0, _errnoJs2['default'])(result.errno), 4);
  				}
  			}
  		});
  	}
  });
  
  var CreateForm = _antd.Form.create()(CreateForm);
  
  var CreateTable = _react2['default'].createClass({
  	displayName: 'CreateTable',
  
  	render: function render() {
  		var me = this;
  		var columns = [{
  			title: '模块名称',
  			dataIndex: 'module_name',
  			key: 'module_name'
  		}, {
  			title: '创建人',
  			dataIndex: 'creator_name',
  			key: 'creator_name'
  		}, {
  			title: '模块描述',
  			dataIndex: 'module_des',
  			key: 'module_des'
  		}, {
  			title: 'BNS列表',
  			dataIndex: 'bns_server_name',
  			key: 'bns_server_name'
  		}, {
  			title: '路径',
  			dataIndex: 'deploy_dir',
  			key: 'deploy_dir'
  		}];
  
  		return _react2['default'].createElement(
  			'div',
  			{ className: this.props.isShow ? "show" : "hidden" },
  			_react2['default'].createElement(_antd.Table, { columns: columns, dataSource: this.props.moduleInfo })
  		);
  	}
  
  });
  
  var CreateInput = _react2['default'].createClass({
  	displayName: 'CreateInput',
  
  	componentWillReceiveProps: function componentWillReceiveProps() {
  		this.render();
  		this.refs.concurrency.refs.input.value = '';
  		this.refs.name.refs.input.value = '';
  		this.refs.before.refs.input.value = '';
  		this.refs.after.refs.input.value = '';
  	},
  
  	render: function render() {
  		var _this = this;
  
  		var formItemLayout = {
  			labelCol: { span: 6 },
  			wrapperCol: { span: 16 }
  		};
  
  		return _react2['default'].createElement(
  			'div',
  			{ className: this.props.isShow ? "show" : "hidden" },
  			_react2['default'].createElement(
  				_antd.Form,
  				{ horizontal: true },
  				_react2['default'].createElement(
  					FormItem,
  					_extends({ label: '上线单名称' }, formItemLayout, { required: true }),
  					_react2['default'].createElement(_antd.Input, { ref: 'name' })
  				),
  				_react2['default'].createElement(
  					FormItem,
  					_extends({ label: '并发度控制' }, formItemLayout),
  					_react2['default'].createElement(_antd.Input, { ref: 'concurrency' })
  				),
  				_react2['default'].createElement(
  					FormItem,
  					_extends({ label: '前置命令' }, formItemLayout),
  					_react2['default'].createElement(_antd.Input, { ref: 'before' })
  				),
  				_react2['default'].createElement(
  					FormItem,
  					_extends({ label: '后置命令' }, formItemLayout),
  					_react2['default'].createElement(_antd.Input, { ref: 'after' })
  				),
  				_react2['default'].createElement(
  					FormItem,
  					{ wrapperCol: { span: 24, offset: 6 }, style: { marginTop: 24 } },
  					_react2['default'].createElement(
  						_antd.Button,
  						{ type: 'primary', onClick: this.lastStep, style: { marginRight: 10 } },
  						'上一步'
  					),
  					_react2['default'].createElement(
  						_antd.Button,
  						{ type: 'primary', onClick: function () {
  								_this.create('justcreate');
  							}, style: { marginRight: 10 }, htmlType: 'submit' },
  						'创建'
  					),
  					_react2['default'].createElement(
  						_antd.Button,
  						{ type: 'primary', onClick: function () {
  								_this.create('create');
  							}, htmlType: 'submit' },
  						'创建并上线'
  					)
  				)
  			)
  		);
  	},
  	lastStep: function lastStep() {
  		this.props.onNextStep(0);
  		this.props.onChangeShow(true, false, false);
  	},
  	create: function create(type) {
  
  		var concurrency = this.refs.concurrency.refs.input.value;
  		var name = this.refs.name.refs.input.value.trim();
  		var before = this.refs.before.refs.input.value;
  		var after = this.refs.after.refs.input.value;
  		var me = this;
  
  		if (name == '') {
  			_antd.message.error('上线单名称不能为空', 4);
  		}
  		var data = {
  			OrderName: name,
  			OrderType: location.hash.indexOf('back') >= 0 ? 1 : 0,
  			ModuleName: me.props.moduleInfo[0].module_name.trim(),
  			ModuleVersion: me.props.moduleversion.trim(),
  			OperationType: parseInt(concurrency, 10),
  			HookBefore: before.trim(),
  			HookAfter: after.trim()
  		};
  
  		(0, _reqwest2['default'])({
  			type: 'JSON',
  			url: '/v1/order/commit',
  			method: 'post',
  			headers: {
  				'UUAP-USERNAME': me.props.userName
  			},
  			data: JSON.stringify({ "data": data })
  		}).then(function (res) {
  			if (res.status == 200) {
  				var result = JSON.parse(res.response);
  
  				if (result.errno == 0) {
  					_antd.message.success('创建成功', 3);
  					if (type == 'justcreate') {
  						location.hash = 'online/list';
  					} else {
  						me.props.showDetail(true);
  						location.hash = 'online/detail?orderId=' + result.data.Id;
  					}
  
  					me.props.changeActivityTab();
  					me.props.onNextStep(2);
  				} else {
  					_antd.message.error('创建失败  ' + (0, _errnoJs2['default'])(result.errno), 4);
  				}
  			}
  		});
  	}
  });
  
  var Create = _react2['default'].createClass({
  	displayName: 'Create',
  
  	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
  
  		var me = this;
  
  		me.setState({
  			uuapUserName: nextProps.userName
  		});
  
  		if (this.props.activeKey == '1') {
  			this.setState({
  				isReRender: true
  			});
  		} else {
  			this.setState({
  				isReRender: false
  			});
  		}
  	},
  
  	getInitialState: function getInitialState() {
  		return {
  			showModuleForm: true,
  			showInputForm: false,
  			showTable: false,
  			currentStep: 0,
  			moduleInfo: [],
  			moduleversion: '',
  			isReRender: false
  		};
  	},
  	render: function render() {
  		var steps = [{
  			title: '添加模块'
  		}, {
  			title: '创建上线单'
  		}, {
  			title: '准备上线'
  		}, {
  			title: '上线中'
  		}, {
  			title: '完成'
  		}].map(function (s, i) {
  			return _react2['default'].createElement(Step, { key: i, title: s.title });
  		});
  		return _react2['default'].createElement(
  			'div',
  			{ className: 'create_container' },
  			_react2['default'].createElement(
  				_antd.Row,
  				{ type: 'flex', justify: 'center', className: 'step' },
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '20' },
  					_react2['default'].createElement(
  						_antd.Steps,
  						{ current: this.state.currentStep },
  						steps
  					)
  				)
  			),
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '8' },
  					_react2['default'].createElement(CreateForm, { userName: this.props.userName, isReRender: this.state.isReRender, isShow: this.state.showModuleForm, onChangeShow: this.onChangeShow, onNextStep: this.onNextStep, onGetModuleInfo: this.onGetModuleInfo, onGetVersion: this.onGetVersion }),
  					_react2['default'].createElement(CreateInput, { userName: this.props.userName, changeActivityTab: this.props.changeActivityTab, isShow: this.state.showInputForm, onChangeShow: this.onChangeShow, moduleInfo: this.state.moduleInfo, onNextStep: this.onNextStep, moduleversion: this.state.moduleversion, showDetail: this.props.showDetail })
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '16' },
  					_react2['default'].createElement(CreateTable, { userName: this.props.userName, isShow: this.state.showTable, onChangeShow: this.onChangeShow, moduleInfo: this.state.moduleInfo })
  				)
  			)
  		);
  	},
  
  	onGetModuleInfo: function onGetModuleInfo(result) {
  		this.setState({
  			moduleInfo: result
  		});
  	},
  
  	onChangeShow: function onChangeShow(isShowForm, isShowTable, isShowInput) {
  		this.setState({
  			showModuleForm: isShowForm,
  			showInputForm: isShowInput,
  			showTable: isShowTable
  		});
  	},
  	onNextStep: function onNextStep(num) {
  		this.setState({
  			currentStep: num
  		});
  	},
  
  	onGetVersion: function onGetVersion(version) {
  		this.setState({
  			moduleversion: version
  		});
  	}
  
  });
  
  exports['default'] = Create;
  module.exports = exports['default'];

});
